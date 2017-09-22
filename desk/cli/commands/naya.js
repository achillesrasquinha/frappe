// imports - standard imports
import path     from 'path'

// imports - third-party imports
import request  from 'request'

import git          from './../../git'
import { makedirs } from './../../util'

const naya = (name, other) => {
    const abspath = path.resolve(name)
    try {
        makedirs(abspath, false)

        git.clone('https://github.com/frappe/bench', path.join(abspath, 'bench'))
        
    } catch (err) {
        console.log(`${name} already exists.`)
    }
}

export default naya