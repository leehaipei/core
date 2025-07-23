export default function customLogEmailTag(packageJson): any {

  return {
    name: "custom-log-email-tag",
    transformIndexHtml() {
      return {
        tags: [
          {
            tag: "script",
            attrs: {
              src: `https://static.leehaipei.com/js/log.js?tag=${packageJson.name}`,
              // type: 'module',
              // 'data-version': '1.0' // 自定义属性
            },
            injectTo: 'body' // 注入到 <body> 底部
          },
        ],
      };
    },
  };
}
