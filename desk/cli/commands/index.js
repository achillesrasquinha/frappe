import new_desk from './new'
import install  from './install'
import run      from './run'
import build    from './build'

const commands  = 
[
    {
              alias: 'new',
        description: 'create a new desk',
             action: new_desk
    }
]

export default commands