## 使用方法

1. 引入方法`import check_authority from '@/authority';`

2. 调用方法，通过promise的then中返回值来确定结果



## config配置参数

|    参数     | 参数类型 | 参数描述                     | 默认行为               |
| :---------: | :------: | ---------------------------- | ---------------------- |
|  backUser   | boolean  | 登录后是否要求接口返回userid | 默认不返回             |
|   hideID    | boolean  | 登录页是否隐藏登录按钮       | 默认不隐藏             |
| buttonColor |  string  | 登录按钮颜色                 | 默认 #006FEE 蓝色      |
| buttonText  |  string  | 登录按钮文字颜色             | 默认 #ffffff 白色      |
| inputColor  |  string  | 输入框背景颜色               | 默认 #ffffff 白色 *    |
| inputBorder |  string  | 输入框边框颜色               | 默认 #e5e7eb 浅灰色 ** |
| backgroundColor |  string  | 登录界面的背景颜色             |    默认不设置颜色    |

*：inputColor [输入框背景颜色] 通常应与html、body或登录页背景颜色一致

**：inputBorder [输入框边框颜色] 通常应与html、body或登录页背景颜色协调；登陆框focus-within状态时，边框会被设置为 #27272A 深灰色
