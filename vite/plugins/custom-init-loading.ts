import handleExtractModuleScriptSrc from "../../handler/handleExtractModuleScriptSrc";

export default function customLogEmailTag(): any {
  return {
    name: "custom-log-email-tag",
    transformIndexHtml(html) {
      const indexJsFileSrc = handleExtractModuleScriptSrc(html)
      const spinnerId = `init-spinner-${Math.random().toString(36).slice(2)}`;
      return {
        tags: [
          {
            tag: "div",
            attrs: {
              id: spinnerId,
              class: "init-spinner"
            },
            children: '<i class="init-border-primary init-spinner-border"></i><i class="init-border-secondary init-spinner-border"></i>',
            injectTo: 'body'
          },
          {
            tag: "script",
            attrs: {
              init: "init-script"
            },
            children: `const observer=new PerformanceObserver((list)=>{list.getEntries().forEach((entry)=>{if(entry.name.includes("${indexJsFileSrc}")){document.getElementById("${spinnerId}")?.remove?.();document.querySelector('style[init="init-css"]')?.remove?.();document.querySelector('script[init="init-script"]')?.remove?.()}})});observer.observe({type:"resource",buffered:true});`,
            injectTo: "body",
          },
          {
            tag: "style",
            children: '.init-spinner{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);display:inline-flex;flex-direction:column;align-items:center;z-index:8848;width:32px;height:32px}.init-spinner-border{position:absolute;display:inline-block;width:100%;height:100%;border-bottom-color:#939393;border-left-color:#0000;border-right-color:#0000;border-top-color:#0000;border-width:3px;border-radius:3.40282e38px}.init-border-primary{border-style:solid;animation:init-spinner-spin 0.8s infinite}.init-border-secondary{opacity:0.75;border-style:dotted;animation:init-spinner-spin 0.8s linear infinite}@keyframes init-spinner-spin{0%{transform:rotate(0)}100%{transform:rotate(1turn)}}',
            injectTo: 'head',
            attrs: {
              init: "init-css"
            }
          },
        ],
      };
    },
  };
}
