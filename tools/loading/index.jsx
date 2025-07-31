import spinnerStyle from "./index.module.scss";

const loading = (() => {
  let spinnerId = false;
  let spinnerCount = 0;

  return Object.freeze({
    get spinnerId() {
      return spinnerId;
    },
    get spinnerCount() {
      return spinnerCount;
    },
    open: function () {
      if (++spinnerCount > 1 && spinnerId) return;
      spinnerId = `spinner-${Math.random().toString(36).slice(2)}`;

      const spinnerNode = document.createElement("div");
      spinnerNode.id = spinnerId;
      spinnerNode.className = spinnerStyle.spinner;
      spinnerNode.innerHTML = `
                <i class="${spinnerStyle["border-primary"]} ${spinnerStyle["spinner-border"]}"></i>
                <i class="${spinnerStyle["border-secondary"]} ${spinnerStyle["spinner-border"]}"></i>
            `;
      document.body.appendChild(spinnerNode);
    },
    close: function () {
      if (--spinnerCount > 0) return;
      const spinner = document.getElementById(spinnerId);
      spinner?.remove();
      spinnerId = false;
    },
  });
})();

export default loading;
