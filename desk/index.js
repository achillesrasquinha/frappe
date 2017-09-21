import Config from './Config'

import App    from './App'
import Window from './Window'
import Logger from './Logger'

const desk = 
{
    Config: Config,
       App: App,
    Window: Window,
    Logger: Logger
}

desk.log   = new desk.Logger()

export default desk