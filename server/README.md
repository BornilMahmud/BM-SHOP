# BM SHOP · Server (Phase 2 — Payments)

This folder will hold the Node + Express backend that fronts payment gateways
and privileged Supabase writes. It is intentionally a stub in Phase 1 and
will be implemented alongside the payment flow.

## Planned endpoints

### Nagad
- `POST /api/nagad/init` — create a payment session and return the redirect URL.
- `GET  /api/nagad/callback` — handle the PG callback, validate the signed
  response, persist the transaction row, redirect the user to the success/fail
  page.

### bKash (manual verification)
- `POST /api/bkash/manual` — store a customer-submitted transaction ID for an
  order and mark the order as `awaiting-verification`.
- `POST /api/bkash/verify` — admin endpoint to confirm/reject a submitted
  transaction ID (requires admin role).

### Supabase helpers
- `POST /api/auth/role` — server-validated role assignment using the Supabase
  `service_role` key, keyed off a verified Firebase ID token. This removes the
  need for permissive RLS policies on `user_roles`.

## Environment

See `.env.example` at the repo root for required variables. Never commit
`.env`. The `NAGAD_APP_MERCHANT_PRIVATE_KEY` and
`SUPABASE_SERVICE_ROLE_KEY` must **only** live on the server.

## Nagad SDK porting notes

The official Nagad SDK is PHP. We will port the signing + AES flow to
TypeScript using `crypto` (RSA-PKCS1v1.5 + AES-ECB with the provided PG public
key). Reference:
- https://github.com/ekliptik/nagad-payment-gateway
- Your existing `Xenon\NagadApi` PHP client (request/sensitive-data schema).
