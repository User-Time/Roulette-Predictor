const electron = require('electron')
const {ipcRenderer} = require('electron');

document.addEventListener("DOMContentLoaded", function () {
    ipcRenderer.on('bullet_number', (event, data) => {
        document.getElementById("bullet_number").innerText = data;
        for (let i = parseInt(data); i < 8; i++) {
            document.getElementsByClassName("bullet")[i].classList.add('ban_bullet');
        }
        document.getElementById("true").innerText = data >> 1;
        document.getElementById("false").innerText = data - (data >> 1);
    });

    document.getElementById('close').addEventListener('click', () => {
        ipcRenderer.send('close-window');
    });
    document.getElementById('minimize').addEventListener('click', () => {
        ipcRenderer.send('minimize-window');
    });
    if (document.getElementById("start")) {
        document.getElementById("start").addEventListener("click", () => {
            let input = document.getElementById('quantity');
            ipcRenderer.send("start", input.value);
        });
    }
});
