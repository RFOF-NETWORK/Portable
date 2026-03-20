# /auth – Backend-Endpoint (Spezifikation, kein Code)

- POST /auth
- Body: { clientId, action, payload }
- Response: { status, message?, data? }

Beispielantwort bei Login:
{
  "status": "ok",
  "data": {
    "token": "<JWT-ODER-ÄHNLICH>",
    "refreshToken": "<REFRESH>",
    "userId": "<USER-ID>",
    "expiresAt": 1234567890
  }
}
