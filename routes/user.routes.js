
module.exports = app => {
const User = require("../controllers/user.controller.js");

// Signup a new User
app.post("/register", User.register);

// Check user
app.post("/login", User.login);

app.post('/addUser', User.addUser);

app.post('/getUser', User.getUser);

//User Update
app.post('/updateUser', User.updateUser);

app.post('/changeUser', User.changeUser);

app.post('/deleteUser', User.deleteUser);

};