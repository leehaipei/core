import type { PluginOption } from 'vite'

import checkCore from './check-core'
import customLog from './custom-log'
import customBuiltTime from './custom-built-time'


export default function processPlugins({ mode, command }): PluginOption[] {

    let plugins = [checkCore()];
    // let plugins = [];

    if (command === 'serve') {
    }

    if (command === 'build') {
        plugins = plugins.concat([customLog(), customBuiltTime()])
    }

    return plugins;
}