import chalk from 'chalk'

class Logger
{
    constructor ( )
    {
        
    }

    error (message)
    {
        const colored = chalk.red(message)
        console.log(colored)
    }
}

export default Logger