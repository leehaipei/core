import handleExtractModuleScriptSrc from "../../handler/handleExtractModuleScriptSrc";

function generateRandomString(length = 3) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

export default function customLogEmailTag(): any {
  return {
    name: "custom-log-email-tag",
    transformIndexHtml(html: string) {
      const indexJsFileSrc = handleExtractModuleScriptSrc(html);
      const randomId = generateRandomString();
      return {
        tags: [
          {
            tag: "div",
            attrs: {
              id: randomId
            },
            children: `<i class="${randomId}1 ${randomId}b"></i><i class="${randomId}2 ${randomId}b"></i>`,
            injectTo: 'body'
          },
          {
            tag: "script",
            attrs: {
              init: randomId
            },
            children: `new PerformanceObserver((l)=>{l.getEntries().forEach((e)=>{if(e.name.includes("${indexJsFileSrc}")){document.getElementById("${randomId}").remove();document.querySelector('style[init="${randomId}"]').remove();document.querySelector('script[init="${randomId}"]').remove()}})}).observe({type:"resource",buffered:true});`,
            injectTo: "body",
          },
          {
            tag: "style",
            children: `#${randomId}{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);display:inline-flex;flex-direction:column;align-items:center;z-index:8848;width:32px;height:32px}#${randomId} .${randomId}b{position:absolute;display:inline-block;width:100%;height:100%;border-bottom-color:#939393;border-left-color:#0000;border-right-color:#0000;border-top-color:#0000;border-width:3px;border-radius:3.40282e38px}#${randomId} .${randomId}1{border-style:solid;animation:${randomId} 0.8s infinite}#${randomId} .${randomId}2{opacity:0.75;border-style:dotted;animation:${randomId} 0.8s linear infinite}@keyframes ${randomId}{0%{transform:rotate(0)}100%{transform:rotate(1turn)}}`,
            injectTo: 'head',
            attrs: {
              init: randomId
            }
          },
        ],
      };
    },
  };
}
