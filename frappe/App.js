// imports - third-party modules
import express from 'express'

// imports - module imports
import CONFIG  from './Config'
import Router  from './Router'
import frappe  from './index'

class App
{
    constructor ( )
    {
        this.express = express()
        this.router  = new Router()
    }

    run (host = null, port = null, debug = null)
    {
        if ( debug )
            frappe.log.setLevel(Logger.DEBUG)

        this.host = host || CONFIG.HOST
        this.port = port || CONFIG.PORT

        this.express.listen(this.port, this.host, () => {
            frappe.log.info(`Running server at http://${this.host}:${this.port}.`)
        })
    }

    get(uri, callback) 
    {
        this.express.get(uri, callback)
    }
}

export default App