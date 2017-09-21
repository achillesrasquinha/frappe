import Config from './Config'

import App    from './App'
import Window from './Window'
import Logger from './Logger'
import cli    from './cli'

const desk = 
{
    Config: Config,
       App: App,
    Window: Window,
    Logger: Logger,
       cli: cli
}

desk.log   = new desk.Logger()

desk.cli.parse(process.argv)

export default desk