const ipcRenderer = require('electron')

function buttPressed(id) {
    ipcRenderer.ipcRenderer.send('butConfigure', id)
}

function toolbarClose(){
    ipcRenderer.ipcRenderer.send('toolbarClose')
}
