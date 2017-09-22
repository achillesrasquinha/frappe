import naya     from './naya'
import install  from './install'
import run      from './run'
import build    from './build'

const commands  = 
[
    {
              alias: 'new <name> [desks...]',
        description: 'create a new desk',
             action: naya
    }
]

export default commands