# /sync – Backend-Endpoint (Spezifikation, kein Code)

- POST /sync
- Body: { clientId, userId, events, lastKnownVersion }
- Response: { status, message?, data? }

Beispielantwort:
{
  "status": "ok",
  "data": {
    "acceptedEvents": [ ... ],
    "newEvents": [ ... ],
    "currentVersion": 42
  }
}
