const ipcRenderer = require('electron');

function butSave(){
    const id = document.getElementById('butId').innerHTML;
    const cAction = document.getElementById('cAction').value;
    const sAction = document.getElementById('sAction').value;
    const cData = document.getElementById('cData').value;
    const sData = document.getElementById('sData').value;

    ipcRenderer.ipcRenderer.send('confUpdate', id, {
		click: {
			action: cAction,
			data:   cData,
		},
		secondary: {
			action: sAction,
			data:   sData,
		}
	});
}

function butClose(){
    ipcRenderer.ipcRenderer.send('childClose')
}

ipcRenderer.ipcRenderer.on('conf', (event, id, arg) => {
    console.log("conf")
    document.getElementById('butId').innerHTML = id;
	console.log(id);

    //document.getElementById('sAction').selectedIndex = arg[1][0]
    //document.getElementById('hAction').selectedIndex = arg[1][1]

    //document.getElementById('sData').value = arg[2]
    //document.getElementById('hData').value = arg[3]
})
