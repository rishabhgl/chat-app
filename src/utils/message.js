const generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (pos) => {
    return {
        url: "https://www.google.com/maps?q=" + pos.lat + "," + pos.long,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateLocationMessage,
    generateMessage
}