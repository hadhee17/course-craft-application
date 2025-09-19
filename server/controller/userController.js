const userModel = require('../model/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find();
    res.status(200).json({
      status: 'Success',
      result: user.length,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
