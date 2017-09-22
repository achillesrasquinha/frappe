// imports - third-party imports
import fs   from 'fs'

// imports - module imports

const makedirs = (dirs, existsOk = true) => 
{
    try 
    {
        fs.mkdirSync(dirs)
    } catch (err) 
    {
        if ( !existsOk )
            throw err
    }
}

export { makedirs }