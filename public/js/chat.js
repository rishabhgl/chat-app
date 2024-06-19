const socket = io()

const messageBox = document.querySelector("#messageBox")
const messageInput = messageBox.querySelector("input")
const sendButton = messageBox.querySelector("button")
const locationButton = document.querySelector("#send-location")
const messages = document.querySelector("#messages")
const messageTemplate = document.querySelector("#message-template").innerHTML


socket.on('message', (message) => {

    const messageHtml = Mustache.render(messageTemplate, {
        message
    })
    messages.insertAdjacentHTML("beforeend", messageHtml)
})

messageBox.addEventListener('submit', e => {
    e.preventDefault()

    sendButton.setAttribute('disabled', 'disabled')
    socket.emit('sendMessage', messageInput.value, (error) => {
        sendButton.removeAttribute('disabled')
        messageInput.value = ''
        messageInput.focus()
        
        if (error) return console.log(error)

    })
})

locationButton.addEventListener('click', () => {
    if (!navigator.geolocation){
        return alert('Your browser does not support geolocation services.')
    }

    locationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {lat: position.coords.latitude, long: position.coords.longitude}, () => {
            locationButton.removeAttribute('disabled')
            console.log('Location sent!')
        })
    })
})