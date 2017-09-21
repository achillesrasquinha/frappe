import path    from 'path'
import pug     from 'pug'
import { URL } from 'url' 
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

    mount (template)
    {
        const temppath = path.join(Config.path.templates, `${template}.pug`)
        const url      = new URL(`file://${temppath}`)

        this.instance.loadURL(url.toString())
    }
}

export default Window