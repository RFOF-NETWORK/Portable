// State-Machine für PORTABLE

const PortableStateMachine = (function () {
  const IDENTITY = {
    UNREGISTERED: "UNREGISTERED",
    REGISTERED: "REGISTERED",
  };

  const AUTH = {
    LOGGED_OUT: "LOGGED_OUT",
    LOGGED_IN: "LOGGED_IN",
  };

  function createMachine(identity) {
    let state = {
      identity: IDENTITY.UNREGISTERED,
      auth: AUTH.LOGGED_OUT,
    };

    function getState() {
      return { ...state };
    }

    function applyEvent(event) {
      switch (event.type) {
        case "IDENTITY_REGISTERED":
          state.identity = IDENTITY.REGISTERED;
          break;
        case "AUTH_LOGGED_IN":
          if (state.identity === IDENTITY.REGISTERED) {
            state.auth = AUTH.LOGGED_IN;
          }
          break;
        case "AUTH_LOGGED_OUT":
          state.auth = AUTH.LOGGED_OUT;
          break;
        default:
          break;
      }
    }

    return {
      getState,
      applyEvent,
      constants: { IDENTITY, AUTH },
    };
  }

  return {
    createMachine,
  };
})();
