import { app, protocol } from 'electron'
import pug     from 'pug'
import { URL } from 'url'

import Config  from './Config'
import Window  from './Window'

class App
{
    constructor (config = { })
    {
        this.config = Object.assign({ }, Config, config)
        this.app    = app

        this.app.on('ready', () => 
        {
            // needs better handling
            protocol.interceptBufferProtocol('file', (request, callback) => {
                const url      = new URL(request.url)
                const compiled = pug.compileFile(url.pathname)()

                const buffer   = new Buffer(compiled)
                const mimetype = 'text/html'

                callback({
                        data: buffer,
                    mimeType: mimetype
                })
            })
        })
    }

    run ( )
    {
        this.app.on('ready', () => 
        {
            this.window = new Window(this.config.app.window)
            this.window.mount('pages/index')
        })
    }
}

export default App