# Self-hosted font sources

These are the existing Google Fonts families used by the application. Font files were fetched from Google's official `google/fonts` repository, checked against their Git blob SHA, and converted losslessly from variable TrueType to WOFF2 using FontTools. Font families, variable axes, normal/italic styles and existing CSS variables are retained.

Each family's complete SIL Open Font License is included. `sources.json` records the upstream URLs, original filenames and hashes. Inter italic is not bundled because the application requests only its normal face.

Local loading removes the production build's dependency on Google CSS font URLs and keeps the Persian font available without an external stylesheet request.
