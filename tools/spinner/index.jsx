import spinnerStyle from "./index.module.scss";

const spinner = {
  spinnerId: false,
  spinnerCount: 0,
  open: function () {
    this.spinnerCount++;
    if (this.spinnerId) return;
    this.spinnerId = `spinner-${Math.random().toString(36).substring(2)}`;
    const spinnerHTML = `<i class="${spinnerStyle["border-primary"]} ${spinnerStyle["spinner-border"]}"></i><i class="${spinnerStyle["border-secondary"]} ${spinnerStyle["spinner-border"]}"></i>`;
    const spinnerNode = document.createElement("div");
    spinnerNode.classList.add(spinnerStyle.spinner);
    spinnerNode.id = this.spinnerId;
    spinnerNode.innerHTML = spinnerHTML;
    document.body.appendChild(spinnerNode);
  },
  close: function () {
    this.spinnerCount--;
    if (this.spinnerCount > 0) return;
    const spinner = document.getElementById(this.spinnerId);
    if (!spinner) return console.error("未找到spinner");
    this.spinnerId = false;
    spinner.remove();
  },
};

export default spinner;
