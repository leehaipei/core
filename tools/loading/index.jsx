import spinnerStyle from "./index.module.scss";

const loading = (() => {
  let spinnerId = false;
  let spinnerCount = 0;

  return Object.defineProperties({}, {
    spinnerId: {
      get() { return spinnerId; },
      set(value) {
        console.error('Error: spinnerId is readonly');
      },
      enumerable: true,
      configurable: false
    },
    spinnerCount: {
      get() { return spinnerCount; },
      set(value) {
        console.error('Error: spinnerCount is readonly');
      },
      enumerable: true,
      configurable: false
    },
    open: {
      value: function () {
        spinnerCount++;
        if (spinnerId) return;
        spinnerId = `spinner-${Math.random().toString(36).substring(2)}`;
        const spinnerHTML = `<i class="${spinnerStyle["border-primary"]} ${spinnerStyle["spinner-border"]}"></i><i class="${spinnerStyle["border-secondary"]} ${spinnerStyle["spinner-border"]}"></i>`;
        const spinnerNode = document.createElement("div");
        spinnerNode.classList.add(spinnerStyle.spinner);
        spinnerNode.id = spinnerId;
        spinnerNode.innerHTML = spinnerHTML;
        document.body.appendChild(spinnerNode);
      },
      writable: false,
      configurable: false
    },
    close: {
      value: function () {
        spinnerCount--;
        if (spinnerCount > 0) return;
        const spinner = document.getElementById(spinnerId);
        if (!spinner) return console.error("未找到spinner");
        spinnerId = false;
        spinner.remove();
      },
      writable: false,
      configurable: false
    }
  });
})();

export default loading;