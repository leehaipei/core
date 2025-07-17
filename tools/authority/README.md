### 使用方法

1. 引入方法`import check_authority from '@/authority';`

2. 调用方法，通过promise的then中返回值来确定结果
   

config:
    backUser | boolean | 登录后是否要求接口返回userid | 默认不返回
    hideID | boolean | 登录页是否隐藏登录按钮 | 默认不隐藏
    buttonColor | string | 登录按钮颜色 | 默认 #006FEE 蓝色
    buttonText | string | 登录按钮文字颜色 | 默认 #ffffff 白色
