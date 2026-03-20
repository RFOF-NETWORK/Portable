// Vigilanz-Layer: Auth + Sync + Status

const PortableVigilantFetch = (function () {
  const BACKEND_BASE = "https://example-portable-backend.invalid"; // Platzhalter

  function create({ identity, eventStore, stateMachine, netModel, parity }) {
    async function callBackend(path, options) {
      const net = netModel.getNetState();
      if (net === netModel.constants.COLDNET) {
        return { status: "offline", data: null };
      }

      try {
        const res = await fetch(`${BACKEND_BASE}${path}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: identity.token ? `Bearer ${identity.token}` : "",
          },
          body: JSON.stringify(options || {}),
        });

        const json = await res.json().catch(() => ({}));
        return json;
      } catch {
        return { status: "error", data: null };
      }
    }

    async function authAction(action, payload) {
      const res = await callBackend("/auth", {
        action,
        payload,
        clientId: identity.clientId,
      });

      if (res && res.status === "ok" && res.data && res.data.token) {
        const updated = PortableIdentity.updateIdentity(identity, {
          token: res.data.token,
          refreshToken: res.data.refreshToken || null,
          userId: res.data.userId || identity.userId,
        });
        Object.assign(identity, updated);
      }

      return res;
    }

    async function syncEvents() {
      const events = eventStore.getEvents();
      const parityState = parity.getParityState();

      const res = await callBackend("/sync", {
        clientId: identity.clientId,
        userId: identity.userId,
        events,
        lastKnownVersion: parityState.lastSyncedVersion,
      });

      if (res && res.status === "ok" && res.data) {
        if (typeof res.data.currentVersion === "number") {
          parity.markSynced(res.data.currentVersion);
        }
      }

      return res;
    }

    async function status() {
      return callBackend("/status", {
        clientId: identity.clientId,
        userId: identity.userId,
      });
    }

    return {
      authAction,
      syncEvents,
      status,
    };
  }

  return {
    create,
  };
})();
