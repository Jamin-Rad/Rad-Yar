# Food photo estimates (Jaminova health)

Flow: local camera/gallery selection → resize/re-encode pixels (original EXIF/GPS not included) → per-photo consent → authenticated OpenAI analysis → separate editable draft → explicit confirmation → existing health record autosave.

## Owner-approved activation

The owner explicitly approved sending selected food photos and descriptions to OpenAI, API charges and the provider-retention caveat in this chat on 2026-10-13. Analysis remains fail-closed without the server API key; every selected image also requires explicit in-app consent:

- `FOOD_PHOTO_AI_ENABLED=false` — optional explicit kill switch; with owner approval recorded, the feature otherwise activates when the server key is configured.
- `OPENAI_API_KEY` — existing server-only project API key; never expose through `NEXT_PUBLIC_*` or chat logs.
- Optional `FOOD_PHOTO_MODEL` (default `gpt-4.1-mini`, a documented image-input and structured-output model). Do not imply validated nutritional accuracy; a real evaluation set is still needed.

Set a project spend limit/alert in the OpenAI dashboard. The private endpoint has an additional three-requests-per-minute, per-owner warm-instance throttle. This is NOT a global spend cap or durable distributed limit.

## Privacy boundaries

- No image files, object storage, Files API, URLs, browser persistent storage, conversations or image-bearing database fields are created.
- Only the re-encoded JPEG and optional user description go to the fixed OpenAI Responses API endpoint. Existing health profile, weight, identity and history are not sent.
- `store:false`, inline image data, foreground request, no tools and no conversation; all endpoint responses use `Cache-Control: no-store`.
- Request bodies, photos and provider responses are never logged by this implementation.
- RadYar retains no photo. This does not guarantee zero retention at OpenAI or hosting infrastructure: default provider abuse-monitoring retention can be up to 30 days, with documented exceptions. Users must see this distinction before sending. Absolute zero third-party retention would require approved data-control arrangements, not just a code flag.
- Cancel, new photo and component unmount abort pending analysis; stale responses cannot populate another draft.

## Persistence and compatibility

`record.photo_meals` contains only allowlisted confirmed meal estimates (title, components, grams, nutrients, calorie range, confidence and assumptions). Drafts do not enter the parent autosave form. Legacy record requests omitting the new field preserve existing confirmed meals; an explicit empty list removes them.

Calories include confirmed estimates exactly once in health today/history and the Jaminova dashboard. Existing catalog-based macro estimates stay unchanged; the photo result exposes carbohydrate values without inventing a new carbohydrate target for legacy foods.

## Verification

`node --test scripts/food-photo.test.mjs scripts/andarun-today.test.mjs` tests validation, consent, authentication, origin checks, disabled configuration, size limits, fake-provider schema handling, cancellation, nutrient scaling, privacy allowlists and dashboard totals. Test UI with a synthetic food photo and mocked provider/record endpoints. Do not use private food photos or bill the real API without approval. Confirm Safari camera/gallery and HEIC behavior on an actual iPad; unsupported image decoding has a JPEG/screenshot fallback message.

Official references: [Images and vision](https://developers.openai.com/api/docs/guides/images-vision), [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [Data controls](https://developers.openai.com/api/docs/guides/your-data), [GPT-4.1 mini](https://developers.openai.com/api/docs/models/gpt-4.1-mini).
