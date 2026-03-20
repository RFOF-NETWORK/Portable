// Paritäts-Checker

const PortableParity = (function () {
  function createParityChecker(eventStore) {
    let lastSyncedVersion = 0;

    function markSynced(version) {
      lastSyncedVersion = version;
    }

    function getParityState() {
      const current = eventStore.getVersion();
      return {
        localVersion: current,
        lastSyncedVersion,
        inParity: current === lastSyncedVersion,
      };
    }

    function updateParity() {
      // hier könnte später Logik ergänzt werden
    }

    return {
      markSynced,
      getParityState,
      updateParity,
    };
  }

  return {
    createParityChecker,
  };
})();
