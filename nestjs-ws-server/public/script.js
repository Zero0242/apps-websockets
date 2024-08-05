import "https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.1/socket.io.js";

// Conexión con el socket server
const socket = io("http://localhost:3000", {
  transports: ['websocket']
});

/// Para emitir
// socket.emit('mensaje-to-server', { data });

// Para escuchar
socket.on("current-bands", (data) => {
  console.table(data);
  renderBands(data);
});

// * Renderizado
const bandList = document.querySelector("#bands-list");

function renderBands(data) {
  bandList.innerHTML = "";

  for (const { votes, name } of data) {
    const liElement = document.createElement("li");
    liElement.innerText = `${votes} ${name}`;
    bandList.appendChild(liElement)
  }
}
