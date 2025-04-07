import { User } from "../models/user.model.js";

const saveUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ deletedAt: null });
    res.status(200).json({
      data: users,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, 
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { deletedAt: new Date() });
    if(!user){
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }
    res.json({
      success: true,
      
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}
export { saveUser, getAllUsers, updateUser, deleteUser };
