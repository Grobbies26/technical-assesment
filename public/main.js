const {app, BrowserWindow}  =  require('electron')

require('@electron/remote/main').initialize()

function createWindow( ) {
    const window = new BrowserWindow({
        width: 500,
        height: 600,
        webPreferences: {
            enableRemoteModule: true
        }
    })

    window.loadURL('http://localhost:3000')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})
