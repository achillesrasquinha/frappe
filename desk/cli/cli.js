import commander from 'commander'

import Config    from '../Config'
import commands  from './commands'

const program = commander

commands.forEach((command) => {
    program.command(command.alias)
           .description(command.description)
           .action(command.action)
})

export default program