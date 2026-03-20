# Architektur

PORTABLE besteht aus einem monolithischen Client und einem minimalen serverlosen Backend.

## Komponenten

- index.html
- portable.js
- portable.css
- core/*
- backend/*
- docs/*
- examples/*

## Datenfluss

1. Client lädt lokale Events.
2. State-Machine rekonstruiert Zustand.
3. Vigilanz-Layer prüft Auth, Netz, Parität.
4. ColdNet/WarmNet entscheidet über Sync.
5. Backend liefert Events oder akzeptiert Events.
