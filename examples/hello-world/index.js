import frappe from '../../frappe'

const app = new frappe.App()

app.get('/', ( ) => {
    return 'Hello, World!'
})

app.run()