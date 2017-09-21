import commander from 'commander'

import Config    from '../Config'
import command   from './command'

const program = commander

program.version(Config.app.version)
       .command('new')
       .description('create a new desk')
       .action(command.new)

export default program