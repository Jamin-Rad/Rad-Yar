import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('case_archive_local', Path(__file__).with_name('case-archive-local.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class LocalArchiveTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.base = Path(self.temp.name)
        self.source = self.base / 'source'
        (self.source / 'series').mkdir(parents=True)
        self.original = self.source / 'series' / 'image.dcm'
        self.original.write_bytes(b'SYNTHETIC DICOM TEST BYTES - NOT A PATIENT IMAGE')
        self.root = self.base / 'archive'

    def tearDown(self):
        self.temp.cleanup()

    def copy(self, **kwargs):
        return module.archive_study(self.source, self.root, 'case-1', 'study-1', **kwargs)

    def test_copy_preserves_originals_and_is_idempotent(self):
        before = self.original.read_bytes()
        result = self.copy()
        target = Path(result['localPath']) / 'series' / 'image.dcm'
        self.assertEqual(before, target.read_bytes())
        self.assertEqual(before, self.original.read_bytes())
        self.assertTrue(self.copy()['alreadyArchived'])

    def test_changed_input_does_not_overwrite_the_archive(self):
        result = self.copy()
        target = Path(result['localPath']) / 'series' / 'image.dcm'
        previous = target.read_bytes()
        self.original.write_bytes(b'CHANGED SYNTHETIC INPUT')
        with self.assertRaises(ValueError):
            self.copy()
        self.assertEqual(previous, target.read_bytes())

    def test_corrupted_archive_is_detected(self):
        result = self.copy()
        (Path(result['localPath']) / 'series' / 'image.dcm').write_bytes(b'CORRUPTED')
        with self.assertRaises(ValueError):
            self.copy()

    def test_dry_run_creates_no_archive(self):
        self.assertTrue(self.copy(dry_run=True)['dryRun'])
        self.assertFalse(self.root.exists())

    def test_recursive_destination_and_path_traversal_are_rejected(self):
        with self.assertRaises(ValueError):
            module.archive_study(self.source, self.source / 'nested', 'case-1', 'study-1')
        with self.assertRaises(ValueError):
            module.archive_study(self.source, self.root, '../escape', 'study-1')

    def test_symlinks_are_rejected(self):
        (self.source / 'linked.dcm').symlink_to(self.original)
        with self.assertRaises(ValueError):
            self.copy()


if __name__ == '__main__':
    unittest.main()
