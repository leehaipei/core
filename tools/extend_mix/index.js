// 深拷贝
function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

export default function extend_mix(...mixins) {
    console.log(mixins);
    class Mix {
        // 如果不需要拷贝实例属性下面这段代码可以去掉
        // constructor() {
        //   for (let mixin of mixins) {
        //     copyProperties(this, new mixin()); // 拷贝实例属性
        //   }
        // }
    }

    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
}



/*
    使用方法    
    1.引入extend_mix
        import extend_mix from '@/extend_mix';
    2.引入需要混合的class
        import { _axios } from '@/axios';
    3.将_axios和react进行混入
        export default class App extends extend_mix(React.Component, _axios) {}
    4.在组件中使用
        this.get即可
*/