//helper functions to handle adding/removing/getting users
const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room required." };
  if (existingUsers) return { error: "Username taken" };

  const user = { id, name, room };
  users.push(user);
  return { user };
};

module.exports = { addUser };
