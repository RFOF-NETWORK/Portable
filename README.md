# Portable
#42E0

✅ README.md
```
portable/
│
├── README.md
├── LICENSE
├── index.html
├── portable.js
├── portable.css
│
├── core/
│   ├── state-machine.js
│   ├── event-store.js
│   ├── vigilant-fetch.js
│   ├── coldnet-warmnet.js
│   ├── identity.js
│   ├── parity.js
│   ├── crypto.js
│   ├── auth-ui.js
│   └── settings-ui.js
│
├── backend/
│   ├── auth.md
│   ├── sync.md
│   └── status.md
│
├── docs/
│   ├── architecture.md
│   ├── state-machine.md
│   ├── event-model.md
│   ├── parity.md
│   ├── coldnet-warmnet.md
│   ├── vigilance.md
│   └── settings.md
│
└── examples/
    ├── minimal-client.html
    ├── offline-demo.html
    └── multi-domain-demo.md
```

---
```markdown

PORTABLE

PORTABLE ist ein monolithischer, domain-agnostischer, global synchronisierbarer Client, der auf jeder Domain und in jedem Browser denselben Zustand darstellen kann. Der Zustand wird ausschließlich über Events beschrieben und deterministisch aus diesen rekonstruiert. Offline/Online wird über ColdNet/WarmNet modelliert. Authentifizierung, Netzwerkzugriffe und Parität werden über einen Vigilanz-Layer gesteuert.

Merkmale

- Monolithischer Client (index.html + portable.js)
- Domain-übergreifend identisch
- Browser-übergreifend identisch
- Offline/Online (ColdNet/WarmNet)
- Event-Sourcing
- Parität zwischen lokalem und globalem Zustand
- Minimaler serverloser Backend-Teil (auth, sync, status)

Struktur
---

