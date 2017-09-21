<div align="center">
    <h1>desk</h1>
    <h4>Build Frappe Desktop Applications</h4>
</div>

```js
import desk from 'desk'
const app = desk.App()
app.run()
```

```console
$ desk new     erpnext.desk          # creating a desk
$ desk install erpnext erpnext.desk  # installing frappe apps onto desk
$ desk run     erpnext.desk          # launching desk
$ desk build   erpnext.desk          # building .exe, .dmg, .etc
```