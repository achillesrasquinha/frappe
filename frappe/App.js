// imports - third-party modules
import express from 'express'

// imports - module imports
import CONFIG  from './Config'
import Logger  from './Logger'

class App
{
    constructor ( )
    {
        this.express = express()
    }

    run (host = null, port = null, debug = null)
    {
        if ( debug )
            Logger.setLevel(Logger.DEBUG)

        this.host = host || CONFIG.HOST
        this.port = port || CONFIG.PORT

        app.listen(port, host, () => {
            Logger.info(`Running server at http://${this.host}:${this.port}.`)
        })
    }


}

export default App