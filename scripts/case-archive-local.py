#!/usr/bin/env python3
"""Copy original DICOM folders into a local archive. Never anonymize or move originals."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import tempfile

MANIFEST = '.case-archive-manifest.json'


def identifier(value):
    if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_.-]{0,99}', value):
        raise ValueError('Case and study IDs must be safe folder names.')
    return value


def digest(path):
    result = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            result.update(chunk)
    return result.hexdigest()


def archive_study(source, archive_root, case_id, study_id, dry_run=False):
    case_id, study_id = identifier(case_id), identifier(study_id)
    raw_source, raw_root = Path(source).expanduser(), Path(archive_root).expanduser()
    if raw_source.is_symlink() or raw_root.is_symlink():
        raise ValueError('Symbolic links are not accepted as archive roots or source folders.')
    source, root = raw_source.resolve(), raw_root.resolve()
    if not source.is_dir():
        raise ValueError('The source study folder does not exist.')
    if root == source or source in root.parents:
        raise ValueError('The archive must be outside the source folder.')
    destination = root / case_id / study_id
    if destination.is_symlink() or destination.parent.is_symlink():
        raise ValueError('The destination must not be a symbolic link.')
    files = []
    for path in sorted(source.rglob('*')):
        if path.is_symlink():
            raise ValueError('Source folders must not contain symbolic links.')
        if path.is_file():
            relative = path.relative_to(source)
            if relative.as_posix() == MANIFEST:
                raise ValueError('The source already contains an archive manifest; use the original study folder.')
            files.append((path, relative))
    if not files:
        raise ValueError('The source study folder is empty.')
    result = {'caseId': case_id, 'studyId': study_id, 'localPath': str(destination), 'fileCount': len(files), 'bytes': sum(path.stat().st_size for path, _ in files)}
    if dry_run:
        return {**result, 'dryRun': True}

    entries = [{'path': relative.as_posix(), 'bytes': path.stat().st_size, 'sha256': digest(path)} for path, relative in files]
    manifest = {'version': 1, 'caseId': case_id, 'studyId': study_id, 'files': entries}
    if destination.exists():
        existing = destination / MANIFEST
        if not existing.is_file() or json.loads(existing.read_text(encoding='utf-8')) != manifest:
            raise ValueError('This study folder already exists with different contents. Nothing was overwritten.')
        for entry in entries:
            target = destination / Path(entry['path'])
            if target.is_symlink() or not target.is_file() or digest(target) != entry['sha256']:
                raise ValueError('An existing archived file failed verification. Nothing was overwritten.')
        return {**result, 'alreadyArchived': True}

    destination.parent.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix=f'.{study_id}.incoming-', dir=destination.parent))
    try:
        for (path, relative), entry in zip(files, entries):
            target = staging / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, target)
            if target.stat().st_size != entry['bytes'] or digest(target) != entry['sha256']:
                raise ValueError('A copied file did not match its source checksum.')
        (staging / MANIFEST).write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
        if destination.exists():
            raise ValueError('The destination appeared during copying. Nothing was overwritten.')
        # rename does not replace a non-empty existing study directory.
        os.rename(staging, destination)
    finally:
        if staging.exists():
            shutil.rmtree(staging)
    return {**result, 'alreadyArchived': False}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True)
    parser.add_argument('--archive-root', required=True)
    parser.add_argument('--case-id', required=True)
    parser.add_argument('--study-id', required=True)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    try:
        result = archive_study(args.source, args.archive_root, args.case_id, args.study_id, args.dry_run)
    except (ValueError, OSError) as error:
        parser.exit(1, f'{error}\n')
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
