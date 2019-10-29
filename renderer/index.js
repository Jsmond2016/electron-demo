const { ipcRenderer } = require("electron")
const { $ } = require("./helper")

$("add-music-button").addEventListener("click", () => {
    ipcRenderer.send('add-music-window', 'hello')
})

const renderListHTML = (tracks) => {
    const tracksList = $('tracksList')
    const trackListHTML = tracks.reduce((html, track) => {
        html += `<li class="row music-track list-group-item d-flex justify-content-between align-items-center"> 
            <div class="col-10">
                <i class="fas fa-music mr-2"></i>
                <b>${track.fileName}</b>
            </div>
            <div class="col-2">
                <i class="fas fa-play mr-2"></i>
                <i class="fas fa-trash-alt"></i>
            </div>
        </li>`
        return html
    }, '')
    const emptyTrackHTMl = `<div class="alert alert-primary">还没有添加任何音乐</div>`
    tracksList.innerHTML = tracks.length ? `<ul class="list-group">${trackListHTML}</ul>` : emptyTrackHTMl
}

ipcRenderer.on('get-tracks', (event, tracks) => {
    console.log('index-getTracks', tracks);
    renderListHTML(tracks)
})