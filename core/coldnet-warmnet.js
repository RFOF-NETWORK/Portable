// ColdNet / WarmNet Modell

const PortableNetModel = (function () {
  const NET = {
    COLDNET: "COLDNET",
    WARMNET: "WARMNET",
  };

  function createNetModel() {
    let netState = navigator.onLine ? NET.WARMNET : NET.COLDNET;

    function getNetState() {
      return netState;
    }

    function setNetState(state) {
      netState = state;
    }

    function toggleNet() {
      netState = netState === NET.COLDNET ? NET.WARMNET : NET.COLDNET;
    }

    window.addEventListener("online", () => {
      netState = NET.WARMNET;
    });

    window.addEventListener("offline", () => {
      netState = NET.COLDNET;
    });

    return {
      getNetState,
      setNetState,
      toggleNet,
      constants: NET,
    };
  }

  return {
    createNetModel,
  };
})();
