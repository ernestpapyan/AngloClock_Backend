const Area = require("../model/area.model.js");
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create an Area
    const area = new Area({
        name: req.body.name,
        order: req.body.order,
    });

    // Save Area in the database
    Area.create(area, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

exports.getArea = (req, res) => {
    Area.getArea((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
};


exports.updateArea = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Area.update(req.body.area_id, req.body.name, req.body.order, (err, data) => {
        if (err)
            res.status(500).send({
                    message: err.message
                });
        else res.send(data);
    });
};

exports.delete = (req, res) => {
    Area.delete(req.body.area_id, (err, data) => {
        if (err)
            res.send({
                message: err.message
            })
        else res.send({
            deleted: req.body.area_id
        })
    })
}
