const { app, BrowserWindow, ipcMain } = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true //设置这个可以使用 nodejs 的API
    }
  })

  mainWindow.loadFile("index.html")

  ipcMain.on("message", (event, arg) => {
    console.log(arg)
    // event.sender.send("reply", "I got your message")
    // 也可以使用下面的方式 因为 event.sender === mainWindow
    mainWindow.send("reply", "I got your message")
  })

})

