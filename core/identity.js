// Identität für PORTABLE

const PortableIdentity = (function () {
  const STORAGE_KEY = "PORTABLE_IDENTITY";

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function saveToStorage(identity) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
    } catch {
      // ignore
    }
  }

  function createIdentity() {
    const existing = loadFromStorage();
    if (existing && existing.clientId) {
      return existing;
    }

    const identity = {
      clientId: `client-${Math.random().toString(16).slice(2)}-${Date.now()}`,
      userId: null,
      token: null,
      refreshToken: null,
    };

    saveToStorage(identity);
    return identity;
  }

  function updateIdentity(identity, patch) {
    const updated = { ...identity, ...patch };
    saveToStorage(updated);
    return updated;
  }

  return {
    createIdentity,
    updateIdentity,
  };
})();
