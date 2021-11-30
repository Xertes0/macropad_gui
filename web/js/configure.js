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

    ipcRenderer.ipcRenderer.send('childClose')
}

function butClose(){
    ipcRenderer.ipcRenderer.send('childClose')
}

function action_to_index(action) {
	switch(action) {
		case "text":     return 0;
		case "sequence": return 1;
		case "run":      return 2;
	}
}

ipcRenderer.ipcRenderer.on('conf', (event, id, arg) => {
    console.log("conf")
	console.log(arg);
    document.getElementById('butId').innerHTML = id;
	console.log(id);

    document.getElementById('cAction').selectedIndex = action_to_index(arg.click.action)
    document.getElementById('sAction').selectedIndex = action_to_index(arg.secondary.action)

    document.getElementById('cData').value = arg.click.data
    document.getElementById('sData').value = arg.secondary.data
})
