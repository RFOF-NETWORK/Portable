// Event-Store und Event-Modell

const PortableEventStore = (function () {
  function createStore(identity) {
    const events = [];
    let version = 0;

    function appendEvent(event) {
      version += 1;
      const withVersion = { ...event, version };
      events.push(withVersion);
      return withVersion;
    }

    function getEvents() {
      return events.slice();
    }

    function getVersion() {
      return version;
    }

    return {
      appendEvent,
      getEvents,
      getVersion,
    };
  }

  function createEvent(identity, type, payload) {
    return {
      eventId: `${identity.clientId}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type,
      payload: payload || {},
      timestamp: Date.now(),
      clientId: identity.clientId,
      userId: identity.userId || null,
    };
  }

  return {
    createStore,
    createEvent,
  };
})();
