
module.exports = app => {
const Area = require("../controllers/area.controller.js");

app.post("/addArea", Area.create);

app.post("/getArea", Area.getArea);

app.post('/updateArea', Area.updateArea);

app.post('/deleteArea', Area.delete);

};