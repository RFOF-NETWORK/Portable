// core/settings-ui.js
const PortableSettingsUI = (function () {
  function createSettingsUI() {
    const dialog = document.getElementById("settings-dialog");
    const usernameInput = document.getElementById("settings-username");
    const passwordInput = document.getElementById("settings-password");
    const passwordRepeatInput = document.getElementById("settings-password-repeat");
    const btnSave = document.getElementById("settings-save");
    const btnCancel = document.getElementById("settings-cancel");

    let resolveFn = null;
    let rejectFn = null;

    function open(currentUsername) {
      usernameInput.value = currentUsername || "";
      passwordInput.value = "";
      passwordRepeatInput.value = "";
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
    }

    btnSave.addEventListener("click", () => {
      if (!resolveFn) return;
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const passwordRepeat = passwordRepeatInput.value;

      if (password && password !== passwordRepeat) {
        // Minimaler Client-Schutz, kein Alert-Spam
        return;
      }

      resolveFn({
        username,
        password,
      });
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
    createSettingsUI,
  };
})();
