class PortableApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    await this.loadCore();
    this.renderUI();
    this.initializePortable();
  }

  async loadCore() {
    const base = "https://cdn.jsdelivr.net/gh/RFOF-NETWORK/Portable";

    const scripts = [
      `${base}/core/state-machine.js`,
      `${base}/core/event-store.js`,
      `${base}/core/identity.js`,
      `${base}/core/parity.js`,
      `${base}/core/coldnet-warmnet.js`,
      `${base}/core/vigilant-fetch.js`,
      `${base}/core/crypto.js`,
      `${base}/core/auth-ui.js`,
      `${base}/core/settings-ui.js`,
      `${base}/portable.js`
    ];

    for (const src of scripts) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
  }

  renderUI() {
    this.shadowRoot.innerHTML = `
      <style>
        body, :host {
          font-family: system-ui, sans-serif;
          color: #e5e5e5;
        }
        button {
          margin: 4px;
          padding: 6px 10px;
          background: #15171f;
          border: 1px solid #444;
          border-radius: 4px;
          color: #e5e5e5;
        }
        pre {
          background: #111218;
          padding: 8px;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        .dialog {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: none;
          align-items: center;
          justify-content: center;
        }
        .dialog.active {
          display: flex;
        }
        .dialog-content {
          background: #15171f;
          padding: 1rem;
          border-radius: 6px;
          width: 90%;
          max-width: 320px;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
        }
        input {
          width: 100%;
          padding: 0.3rem;
          margin-top: 0.2rem;
          border-radius: 4px;
          border: 1px solid #444;
          background: #0b0c10;
          color: #e5e5e5;
        }
      </style>

      <div id="app">
        <header>
          <h1>PORTABLE</h1>
          <p id="status-line">Initialisiere…</p>
        </header>

        <main>
          <section>
            <h2>Zustand</h2>
            <pre id="state-view"></pre>
          </section>

          <section>
            <h2>Aktionen</h2>
            <button id="btn-register">Registrieren</button>
            <button id="btn-login">Login</button>
            <button id="btn-logout">Logout</button>
            <button id="btn-toggle-net">Netz wechseln</button>
            <button id="btn-demo-event">Demo-Event</button>
            <button id="btn-download-events">Events herunterladen</button>
            <button id="btn-settings">Einstellungen</button>
          </section>

          <section>
            <h2>Events (lokal)</h2>
            <pre id="events-view"></pre>
          </section>
        </main>
      </div>

      <div id="auth-dialog" class="dialog">
        <div class="dialog-content">
          <h3 id="auth-dialog-title">Registrieren</h3>
          <label>Benutzername <input id="auth-username"></label>
          <label>Passwort <input type="password" id="auth-password"></label>
          <button id="auth-confirm">OK</button>
          <button id="auth-cancel">Abbrechen</button>
        </div>
      </div>

      <div id="settings-dialog" class="dialog">
        <div class="dialog-content">
          <h3>Einstellungen</h3>
          <label>Neuer Benutzername <input id="settings-username"></label>
          <label>Neues Passwort <input type="password" id="settings-password"></label>
          <label>Passwort wiederholen <input type="password" id="settings-password-repeat"></label>
          <button id="settings-save">Speichern</button>
          <button id="settings-cancel">Abbrechen</button>
        </div>
      </div>
    `;
  }

  initializePortable() {
    // portable.js initialisiert sich selbst, sobald es geladen ist.
    // Die Web-Komponente muss nichts weiter tun.
  }
}

customElements.define("portable-app", PortableApp);
