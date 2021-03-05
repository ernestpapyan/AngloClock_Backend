
module.exports = app => {
const User = require("../controllers/user.controller.js");

// Signup a new User
app.post("/register", User.create);

// Check user
app.post("/login", User.login);

};