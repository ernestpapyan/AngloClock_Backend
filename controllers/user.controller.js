const User = require("../model/user.model.js");
const md5 = require('md5');
// Create and Save a new User
exports.register = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(500).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name,
        password: md5(req.body.password),
        email: req.body.email
    });

    // Save User in the database
    User.register(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

//Login user
exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Save User in the database
    User.login(req.body.email, req.body.password, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

exports.addUser = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name,
        password: md5(req.body.password),
        email: req.body.email,
        role : req.body.role,
        default_area : req.body.default_area,
        rate_per_hour : req.body.rate_per_hour,
        times : req.body.times,
        live : req.body.live,
        show_rate : req.body.show_rate,
    });

    console.log("Show Rate=> ", user)

    // Save User in the database
    User.addUser(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

exports.getUser = (req, res) => {
    User.getUser((err, data) => {
            if (err)
                res.send({
                    message: err.message
                })
            else res.send(data)
        }
    )
};

exports.updateUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    User.update(req.body.user_id, req.body.email, md5(req.body.password), (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            });
        else res.send(data);
    });
};

exports.changeUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    User.changeUser(req.body.user_id, req.body.name, req.body.email, req.body.role, req.body.live, req.body.default_area, req.body.rate_per_hour, req.body.show_rate, req.body.times, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            });
        else res.send(data);
    });
};

exports.deleteUser = (req, res) => {
    User.deleteUser(req.body.user_id, (err, data) => {
        if (err)
            res.send({
                message: err.message
            })
        else res.send(data)
    })
};
