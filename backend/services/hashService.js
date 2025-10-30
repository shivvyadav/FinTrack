const bcrypt = require("bcryptjs");

// hash password
exports.hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

//compare password
exports.comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
