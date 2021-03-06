const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

global.__basedir = __dirname;
const fs = require('fs');
const multer = require('multer');
const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './upload');
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({
    storage: Storage,
    limits: {fileSize: 10 * 1024 * 1024},
}); //setting the default folder for multer

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use('/upload', express.static(__dirname + '/upload'));

app.post('/upload', upload.single('fileData'), (req, res, next) => {
    res.send({name: req.file.filename})
});

require("./routes/user.routes.js")(app);

require('./routes/area.routes')(app);

require('./routes/job.routes')(app)

require('./routes/worktime.routes')(app)

require('./routes/history.routes')(app)

// app.listen(4000, '0.0.0.0', () => {
//   console.log("Server is running on port 4000.");
// });

app.listen(4000, () => {
    console.log("Server is running on port 4000.");
});