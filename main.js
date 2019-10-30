const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const DataStore = require('./musicDataStore')

const myStore = new DataStore({'name': 'music-data'});

class AppWindow extends BrowserWindow{
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true //设置这个可以使用 nodejs 的API
      }
    }

    //const finalConfig = Object.assign(basicConfig, config) // ES5写法 用后面的覆盖前面的
    const finalConfig = { ...basicConfig, ...config } // ES6语法，效果等同上面
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}





app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html')
  
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('get-tracks', myStore.getTracks())
    console.log('page load finish');
  })

  ipcMain.on('add-music-window', (event, args) => {
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      webPreferences: {
        nodeIntegration: true //设置这个可以使用 nodejs 的API
      },
      parent: mainWindow
    }, './renderer/add.html')
  })

  ipcMain.on('add-tracks', (event, tracks) => {
    const updateTracks =  myStore.addTracks(tracks).getTracks()
    console.log(updateTracks);
    mainWindow.send('get-tracks', updateTracks)
  })

  ipcMain.on('delete-track', (event, id) => {
    const updateTracks = myStore.deleteTrack(id).getTracks()
    mainWindow.send('get-tracks', updateTracks)
  })

  ipcMain.on('open-music-file', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Music-Select', extensions: ['mp3'] }, // 过滤看到的文件类型
      ]
    }, (files) => {
        if (files) {
          event.sender.send('selected-file', files) // 发送给渲染进程-子窗口
        }
    })
  })

})

