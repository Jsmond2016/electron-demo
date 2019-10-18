const { ipcRenderer } = requeire('electron')

window.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("message", "hello, world~~")
    ipcRenderer.on("reply", (event, arg) => {
        document.getElementById("reply").innerHTML = arg
    })
})