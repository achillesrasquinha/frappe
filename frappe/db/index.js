import DB from './DB'

const db   = { }

db.connect = (uri) => 
{
    return new DB(uri)
} 

export default db