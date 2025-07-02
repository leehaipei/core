import type { PluginOption } from 'vite'

import checkCore from './check-core'
import customLog from './custom-log'
import customBuiltTime from './custom-built-time'
import customCDN from './custom-cdn'


export default function processPlugins({ mode, command }): PluginOption[] {

    let plugins = [checkCore()];
    // let plugins = [];

    if (command === 'serve') {
    }

    if (command === 'build') {
        plugins = plugins.concat([customCDN(), customLog(), customBuiltTime()])
    }

    return plugins;
}