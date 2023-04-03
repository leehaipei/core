Brad一款注重隐私、安全可控的自定义通知推送工具。



## 调用

```js
const axios = require('axios');

axios.post('https://xxxxxxxxxxxxxx', {
        "device_key": "xxxxxxxxxxxxxx",
        "body": "推送的内容",
        "title": "推送的标题",
        "url": "https://xxxxxxxxxxxxxx",
        "icon": "https://xxxxxxxxxxxxxx"
    }).then(res => {
       console.log(res);
    }).catch(error => {
        console.log(error);
    });
```



## 参数

| 参数      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| title     | 推送标题                                                     |
| body      | 推送内容                                                     |
| level     | 推送中断级别。 active：默认值，系统会立即亮屏显示通知 timeSensitive：时效性通知，可在专注状态下显示通知。 passive：仅将通知添加到通知列表，不会亮屏提醒。 |
| badge     | 推送角标，可以是任意数字                                     |
| autoCopy  | iOS14.5以下自动复制推送内容，iOS14.5以上需手动长按推送或下拉推送 |
| copy      | 复制推送时，指定复制的内容，不传此参数将复制整个推送内容。   |
| sound     | 可以为推送设置不同的铃声                                     |
| icon      | 为推送设置自定义图标，设置的图标将替换默认Bark图标。 图标会自动缓存在本机，相同的图标 URL 仅下载一次。 |
| group     | 对消息进行分组，推送将按group分组显示在通知中心中。 也可在历史消息列表中选择查看不同的群组。 |
| isArchive | 传 1 保存推送，传其他的不保存推送，不传按APP内设置来决定是否保存。 |
| url       | 点击推送时，跳转的URL ，支持URL Scheme 和 Universal Link     |