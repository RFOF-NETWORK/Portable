# /status – Backend-Endpoint (Spezifikation, kein Code)

- POST /status
- Body: { clientId?, userId?, token? }
- Response: { status, message?, data? }

Beispielantwort:
{
  "status": "ok",
  "data": {
    "backendVersion": "1.0.0",
    "time": 1234567890,
    "features": []
  }
}
