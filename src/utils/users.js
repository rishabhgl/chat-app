const users = []

const addUser = ({id, username, room}) => {
    
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!username || !room) return { error: 'Username and Room fields are required!'}

    const existingUsers = users.find((user) => user.username === username && user.room === room)

    if (existingUsers) return { error: 'User already exists!'}

    const user = {
        id,
        username,
        room
    }

    users.push(user)

    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    if (!index === -1){
        return users.splice(index, 1)[0]
    }
}


const getUsers = () => {}
const getUsersInRoom = () => {}

module.exports = {
    users,
    getUsers,
    addUser,
    removeUser,
    getUsersInRoom
}