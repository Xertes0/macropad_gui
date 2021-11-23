const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require('fs');

const CONF_PATH = require('os').homedir() + "/.config/macropad.json";

var conf_json;

var mainWin;
var childWin;

function createWindow() {
    mainWin = new BrowserWindow({
        width:  800,
        height: 600,
        resizable: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    mainWin.setMenuBarVisibility(false)

    mainWin.loadFile('web/index.html')
}

function close(){
    if (process.platform !== 'darwin') app.quit()
    //client.write("close00")
}
//
//function connectToCore(){
//	client = net.connect({host: "127.0.0.1", port: CORE_PORT}, () =>{
//        console.log("connected to core")
//    })
//
//    client.on('data', (buf) => {
//        let arr = buf.toString().split('|')
//        console.log(arr)
//        childWin.webContents.once('dom-ready', () => {
//            childWin.webContents.send('conf', arr);
//        })
//    })
//}

app.whenReady().then(() => {
    createWindow()
    //connectToCore()
})

app.on('window-all-closed', function () {
    close()
})

ipcMain.on('toolbarClose', (event, arg) => {
    close()
})

ipcMain.on('childClose', (event, arg) => {
    childWin.close()
})

function get_conf() {
	const data = fs.readFileSync(CONF_PATH);
	return JSON.parse(data);
}

ipcMain.on('butConfigure', (event, arg) => {
    //client.write("getBut"+arg)

    childWin = new BrowserWindow({
        parent: mainWin,
        modal:  true,
        width:  350,
        height: 600,
        resizable: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    childWin.setMenuBarVisibility(false)

    childWin.loadFile('web/configure.html')

	let conf = get_conf();
	conf_json = conf;
	childWin.webContents.once('dom-ready', () => {
		childWin.webContents.send('conf', arg, conf);
	});
})

ipcMain.on('confUpdate', (event, id, arg) => {
    console.log(arg);
	conf_json[id] = arg;
	console.log(conf_json);
	console.log(typeof conf_json);
	fs.writeFile(CONF_PATH, JSON.stringify(conf_json) + '\n', ()=>{});
})
