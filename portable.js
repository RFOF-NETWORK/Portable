// PORTABLE – zentraler Client-Monolith

(function () {
  const stateView = document.getElementById("state-view");
  const eventsView = document.getElementById("events-view");
  const statusLine = document.getElementById("status-line");

  const btnRegister = document.getElementById("btn-register");
  const btnLogin = document.getElementById("btn-login");
  const btnLogout = document.getElementById("btn-logout");
  const btnToggleNet = document.getElementById("btn-toggle-net");
  const btnDemoEvent = document.getElementById("btn-demo-event");
  const btnDownload = document.getElementById("btn-download-events");

  const identity = PortableIdentity.createIdentity();
  const eventStore = PortableEventStore.createStore(identity);
  const stateMachine = PortableStateMachine.createMachine(identity);
  const netModel = PortableNetModel.createNetModel();
  const parity = PortableParity.createParityChecker(eventStore);
  const vigilantFetch = PortableVigilantFetch.create({
    identity,
    eventStore,
    stateMachine,
    netModel,
    parity,
  });
  const authUI = PortableAuthUI.createAuthUI();

  function render() {
    const state = stateMachine.getState();
    const events = eventStore.getEvents();
    const netState = netModel.getNetState();
    const parityState = parity.getParityState();

    stateView.textContent = JSON.stringify(
      {
        identity: state.identity,
        auth: state.auth,
        net: netState,
        parity: parityState,
      },
      null,
      2
    );

    eventsView.textContent = JSON.stringify(events.slice(-20), null, 2);

    statusLine.textContent = `Netz: ${netState} | Identity: ${state.identity} | Auth: ${state.auth}`;
  }

  function applyEvent(event) {
    eventStore.appendEvent(event);
    stateMachine.applyEvent(event);
    parity.updateParity();
    render();
  }

  btnRegister.addEventListener("click", async () => {
    const input = await authUI.open("register");
    const passwordHash = await PortableCrypto.sha512(input.password);

    const event = PortableEventStore.createEvent(identity, "IDENTITY_REGISTERED", {
      username: input.username,
      passwordHash,
      registeredAt: Date.now(),
    });
    applyEvent(event);
  });

  btnLogin.addEventListener("click", async () => {
    const input = await authUI.open("login");
    const passwordHash = await PortableCrypto.sha512(input.password);

    const event = PortableEventStore.createEvent(identity, "AUTH_LOGIN_REQUESTED", {
      username: input.username,
      passwordHash,
    });
    applyEvent(event);

    await vigilantFetch.authAction("login", {
      clientId: identity.clientId,
      username: input.username,
      passwordHash,
    });

    const successEvent = PortableEventStore.createEvent(identity, "AUTH_LOGGED_IN", {
      loggedInAt: Date.now(),
    });
    applyEvent(successEvent);
  });

  btnLogout.addEventListener("click", async () => {
    const event = PortableEventStore.createEvent(identity, "AUTH_LOGOUT_REQUESTED", {});
    applyEvent(event);

    await vigilantFetch.authAction("logout", { clientId: identity.clientId });
    const successEvent = PortableEventStore.createEvent(identity, "AUTH_LOGGED_OUT", {
      loggedOutAt: Date.now(),
    });
    applyEvent(successEvent);
  });

  btnToggleNet.addEventListener("click", () => {
    netModel.toggleNet();
    const netState = netModel.getNetState();
    const event = PortableEventStore.createEvent(identity, "NET_STATE_CHANGED", {
      net: netState,
    });
    applyEvent(event);
  });

  btnDemoEvent.addEventListener("click", async () => {
    const event = PortableEventStore.createEvent(identity, "DEMO_ACTION", {
      time: Date.now(),
    });
    applyEvent(event);

    await vigilantFetch.syncEvents();
  });

  btnDownload.addEventListener("click", () => {
    const events = eventStore.getEvents();
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = `portable-events-${identity.clientId}-${Date.now()}.json`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Initial
  render();
})();
