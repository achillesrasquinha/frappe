const Config            = { }
 
Config.app              = { }
Config.app.name         = "desk"
Config.app.version      = "0.1.0"

Config.app.window       = { }
Config.app.window.title = `${Config.app.name} v${Config.app.version}`

Config.app.window.size  = { width: 1366, height: 768 }

export default Config