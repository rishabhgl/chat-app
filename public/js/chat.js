const socket = io()


socket.on('message', (message) => {
    console.log(message)
})

const messageBox = document.querySelector("#messageBox")
const locationButton = document.querySelector("#send-location")


messageBox.addEventListener('submit', e => {
    e.preventDefault()

    socket.emit('sendMessage', document.querySelector("#prompt").value)
})

locationButton.addEventListener('click', () => {
    if (!navigator.geolocation){
        return alert('Your browser does not support geolocation services.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {lat: position.coords.latitude, long: position.coords.longitude})
    })
})