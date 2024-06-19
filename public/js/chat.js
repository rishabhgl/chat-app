const socket = io()

const messageBox = document.querySelector("#message-form")
const messageInput = messageBox.querySelector("input")
const sendButton = messageBox.querySelector("button")
const locationButton = document.querySelector("#send-location")
const messages = document.querySelector("#messages")
const messageTemplate = document.querySelector("#message-template").innerHTML
const locationTemplate = document.querySelector("#location-message-template").innerHTML


socket.on('message', (message) => {

    const messageHtml = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('MMM D, h:mm')
    })
    messages.insertAdjacentHTML("beforeend", messageHtml)
})

socket.on('locationMessage', (location) => {

    const locationHtml = Mustache.render(locationTemplate, {
        url: location.url,
        createdAt: moment(location.createdAt).format('MMM D, h:mm')
    })
    messages.insertAdjacentHTML('beforeend', locationHtml)
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