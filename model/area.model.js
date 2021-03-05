const sql = require("./db.js");
// constructor
const Area = function (area) {
    this.name = area.name;
    this.order = area.order
};

Area.create = (newArea, result) => {
    console.log(newArea)
    sql.query(`Select area_id from area where name = '${newArea.name}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("checked area: ", res[0]);
        if (JSON.stringify(res[0]) != undefined) {
            result(null, {area_id: 0});
            return;
        } else {
            sql.query("INSERT INTO area SET ?", newArea, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("created Area: ", {area_id: res.insertId});
                result(null, {area_id: res.insertId});
            });
        }
    });

};

Area.getArea = (result) => {
    sql.query(`Select * from area `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);

    });
};

Area.update = (area_id, name, order, result) => {
    sql.query(`UPDATE area SET name='${name}',  \`order\`=${order} WHERE area_id=${area_id}`, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
        }

        console.log("Area Updated: ", res);
        result(null, {updated: area_id});
    })
};

Area.delete = (area_id, result) => {
    sql.query(`DELETE FROM area WHERE area_id=${area_id}`, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
        }

        console.log("Area Updated: ", res);
        result(null, {deleted: 1});
    })
};

module.exports = Area;