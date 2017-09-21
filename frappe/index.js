import Config   from './Config'
import App      from './App'
import DB       from './DB'
import Template from './Template'
import UI       from './ui'
import Logger   from './Logger'

const frappe  = 
{
      Config: Config,
         App: App,
          DB: DB,
    Template: Template,
          UI: UI,
      Logger: Logger
}

frappe.log    = new frappe.Logger()

frappe.render = (relpath) =>
{
      const template = new frappe.Template(relpath)
      const string   = template.render()

      return string
}

export default frappe