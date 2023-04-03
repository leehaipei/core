### 使用方法

1. 引入方法`import check_authority from '@/authority';`

2. 调用方法，通过promise的then中返回值来确定结果

   ```js
   check_authority().then(res => {
       
       let ROOT = "root"
       if (res.code === 200) {
           ROOT = <App />
       } else {
           ROOT = <NoAuthority info={res.info} />
           console.error(res.message);
       }
   
       ReactDOM.render(ROOT, document.getElementById('root'));
   
   }).catch(error => {
       console.error(error.message);
   })
   ```

   