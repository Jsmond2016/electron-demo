const { app, BrowserWindow, ipcMain } = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true //设置这个可以使用 nodejs 的API
    }
  })

  mainWindow.loadFile("./renderer/index.html")
  
  ipcMain.on('add-music-window', (event, args) => {
    const addWindow = new BrowserWindow({
      width: 500,
      height: 400,
      webPreferences: {
        nodeIntegration: true //设置这个可以使用 nodejs 的API
      },
      parent: mainWindow
    })
    addWindow.loadFile('./renderer/add.html')
  })

})

