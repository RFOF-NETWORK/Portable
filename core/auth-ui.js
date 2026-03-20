// core/auth-ui.js
const PortableAuthUI = (function () {
  function createAuthUI() {
    const dialog = document.getElementById("auth-dialog");
    const titleEl = document.getElementById("auth-dialog-title");
    const usernameInput = document.getElementById("auth-username");
    const passwordInput = document.getElementById("auth-password");
    const btnConfirm = document.getElementById("auth-confirm");
    const btnCancel = document.getElementById("auth-cancel");

    let currentMode = null;
    let resolveFn = null;
    let rejectFn = null;

    function open(mode) {
      currentMode = mode;
      titleEl.textContent = mode === "register" ? "Registrieren" : "Login";
      usernameInput.value = "";
      passwordInput.value = "";
      dialog.classList.remove("hidden");

      return new Promise((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;
      });
    }

    function close() {
      dialog.classList.add("hidden");
      resolveFn = null;
      rejectFn = null;
      currentMode = null;
    }

    btnConfirm.addEventListener("click", () => {
      if (!resolveFn) return;
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      resolveFn({ mode: currentMode, username, password });
      close();
    });

    btnCancel.addEventListener("click", () => {
      if (rejectFn) rejectFn(new Error("cancelled"));
      close();
    });

    return {
      open,
    };
  }

  return {
    createAuthUI,
  };
})();
