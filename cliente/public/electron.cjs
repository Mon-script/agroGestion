const { app, BrowserWindow } = require('electron');

const createWindow= () =>{

    const wind= new BrowserWindow({
        width:800,
        heigth:600
    })
    wind.loadURL('http://localhost:6969')
}

app.whenReady().then(()=>{
    createWindow()
    app.on('activate',()=>{
        if(BroserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed',()=>{
    if (process.platform !== 'darwin') app.quit()
} )