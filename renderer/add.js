const { $ } = require("./helper")
const { ipcRenderer } = require("electron")
const path = require('path')


$("select-music").addEventListener("click", () => {
    ipcRenderer.send('open-music-file')
})

const renderListHTML = (pathes) => {
    const musicList = $('musicList')
    const musicListItem = pathes.reduce((html, music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html
    }, '')
    musicList.innerHTML = `<ul class="list-group">${musicListItem}</ul>`
}

ipcRenderer.on('selected-file', (event, path) => {
    if (Array.isArray(path)) {
        renderListHTML(path)
    }
})