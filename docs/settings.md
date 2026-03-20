# Settings

## Zweck

- Änderung von Benutzername und Passwort durch den Nutzer.
- Änderungen werden als Events im Event-Store abgelegt.

## Events

- USERNAME_CHANGED
  - payload.username
  - payload.changedAt

- PASSWORD_CHANGED
  - payload.passwordHash
  - payload.changedAt

## Verhalten

- Passwort wird clientseitig mit SHA-512 gehasht.
- Beide Änderungen sind optional:
  - Nur Username ändern
  - Nur Passwort ändern
  - Beides gleichzeitig
