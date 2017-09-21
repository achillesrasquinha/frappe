import { BrowserWindow } from 'electron'

import Config            from './Config'

class Window
{
    constructor (config = { })
    {
        this.config   = Object.assign({ }, Config.app.window, config)
        this.instance = new BrowserWindow({
             width: this.config.size.width,
            height: this.config.size.height,
             title: this.config.title
        })
    }
}

export default Window