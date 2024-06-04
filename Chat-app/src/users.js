const users = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
  //Clean the data
  username = username?.trim().toLowerCase();
  room = room?.trim().toLowerCase();

  //Validate date
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  //Check for exisiting user
  const existingUsers = users.find((user) => {
    return user.room == room && user.username == username;
  });

  // Validate username
  if (existingUsers) {
    return {
      error: "Username is in use!",
    };
  }

  // Store user
  const user = { id, username, room };
  users.push(user);
  return {
    user,
  };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id == id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => {
  const user = users.find((user) => user.id == id);
  if (!user) return "User not found";
  return user;
};

const getUsersInRoom = (room) => {
  room = room?.trim().toLowerCase();
  const usersInRoom = users.filter((user) => user.room == room);
  if (!usersInRoom) return [];
  return usersInRoom;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
