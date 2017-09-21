import { BrowserWindow } from 'electron'

class Window
{
    constructor ( )
    {
        this.instance = new BrowserWindow()
    }
}

export default Window