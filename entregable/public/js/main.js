const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    
    const items = {
            title: document.getElementById('nombre').value,
            price: document.getElementById('precio').value,
            thumbnail: document.getElementById('imagen').value
    }
    socket.emit('new-item', items)
})

socket.on('productos', async (items) => {
    
    const html = await makeHtmlTable(items);
    document.getElementById("productos").innerHTML = html;
});

function makeHtmlTable(items) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ items })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    
    const nuevoMensaje = {
        author: inputUsername.value,
        text: inputMensaje.value,
    }

    socket.emit('new-message', nuevoMensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajes => {
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map((e) => {
        return (`<div><strong>${e.author}</strong>: <em>${e.text}</em></div>`)
    }).join(' ');
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
