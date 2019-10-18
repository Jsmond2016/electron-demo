const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true //设置这个可以使用 nodejs 的API
    }
  })

  mainWindow.loadFile("index.html")

  const secondWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true //设置这个可以使用 nodejs 的API
    },
    parent: mainWindow // 定义属性 父窗口，当父窗口关闭的时候，子窗口也会关闭
  })

  secondWindow.loadFile("second.html")
})

