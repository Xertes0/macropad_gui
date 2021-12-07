const ipcRenderer = require('electron')

function buttPressed(id) {
    ipcRenderer.ipcRenderer.send('butConfigure', id)
}

function toolbarClose(){
    ipcRenderer.ipcRenderer.send('toolbarClose')
}

ipcRenderer.ipcRenderer.on('conf', (event, args) => {
    for(let i=0;i<10;i++) {
        document.getElementById(`but${i}`).title =
            `Klikniecie: ${args[i].click.data}\nPrzytrzymanie: ${args[i].secondary.data}`;
    }
})

function openKeycodeList() {
    ipcRenderer.ipcRenderer.send('openKeycodeList');
}