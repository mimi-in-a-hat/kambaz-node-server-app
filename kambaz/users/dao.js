import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function UsersDao() {
  const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};


  const findUsersByRole = (role) => model.find({ role: role });
  const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
}

  const findAllUsers = () => model.find();
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const findUserByUsername = (username) =>  model.findOne({ username: username });
  const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
  const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
  const deleteUser = async (req, res) => {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
  };

  return { createUser, findAllUsers, 
    findUserById, findUserByUsername, 
    findUserByCredentials, updateUser, 
    deleteUser, findUsersByRole,
    findUsersByPartialName, findUserById};
}
