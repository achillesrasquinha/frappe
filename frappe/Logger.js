import chalk  from 'chalk'
import moment from 'moment'
import _      from 'lodash'

class Logger
{
    constructor ( )
    {
        this.level  = Logger.DEBUG
    }

    log  (message, level)
    {
        if ( level.name == Logger.INFO.name ) {
            const timestamp = moment().format('YYYY-MM-DD HH:mm:ss:SS')
            const type      = _.upperCase(Logger.INFO.name)
            const colored   = chalk.blue(`[${timestamp}] ${type}`)

            console.log(`${colored}: ${message}`)
        }
    }

    info (message)
    {
        this.log(message, Logger.INFO)
    }
}

Logger.DEBUG   = { level: 10, name: 'debug'   }
Logger.INFO    = { level: 20, name: 'info'    }
Logger.WARNING = { level: 30, name: 'warning' }
Logger.ERROR   = { level: 40, name: 'error'   }

export default Logger