import { app } from 'electron'

import Config  from './Config'
import Window  from './Window'

class App
{
    constructor (config = { })
    {
        this.config = Object.assign({ }, Config, config)
        console.log(this.config)
        this.app    = app
    }

    run ( )
    {
        this.app.on('ready', () => {
            this.window = new Window(this.config.app.window)
        })
    }
}

export default App