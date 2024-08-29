import { createRoot } from 'react-dom/client';

export default class RightClick {
    constructor(querySelector, content) {

        this.trigger = false;
        this.querySelector = `r-${querySelector}`;
        const dom = document.querySelector(querySelector);
        this.dom = dom;
        this.content = content;
        this.root = null;
        this.install();
    };

    install() {
        if (!this.dom) {
            console.error(`未找到容器`);
            return
        }

        this.dom.addEventListener('contextmenu', (e) => {

            if (!this.trigger) {
                this.creat();
            } else {
                this.remove();
                this.creat();
            }

            e.preventDefault();
        })

        document.addEventListener('click', (e) => {
            this.remove();
            e.preventDefault();
        })
    };

    creat() {
        function getMousePos(event) {
            var esss = event || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = esss.pageX || esss.clientX + scrollX;
            var y = esss.pageY || esss.clientY + scrollY;
            return { 'top': y + 'px', 'left': x + 'px' };
        }
        const pos = getMousePos();

        let mask = document.createElement("div");
        mask.id = `right_click_mask_${this.querySelector}`;
        mask.style.position = "fixed";
        mask.style.top = pos.top;
        mask.style.left = pos.left;

        document.body.appendChild(mask);

        const container = document.getElementById(`right_click_mask_${this.querySelector}`);
        this.root = createRoot(container);
        this.root.render(this.content);

        this.trigger = true;
    };

    remove() {
        const mask = document.getElementById(`right_click_mask_${this.querySelector}`);
        if (!mask) return

        this.root.unmount();
        mask.remove();
        this.trigger = false;
    };

    uninstall() {
        this.remove();
        this.dom.removeEventListener('contextmenu')
        document.removeEventListener('click')
    };

}
