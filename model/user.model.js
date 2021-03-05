const sql = require("./db.js");
const md5 = require('md5');
// constructor
const User = function (user)    {
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
};

User.create = (newUser, result) => {
    console.log(newUser)
    sql.query(`Select user_id from user where email = '${newUser.email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("checked user: ", res[0]);
        if (JSON.stringify(res[0]) != undefined) {
            result(null, { user_id: 0 });
            return;
        } else {
            sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("created user: ", {user_id: res.insertId});
                result(null, {user_id: res.insertId});
            });
        }
    });

};

User.login = (email, password, result) => {
    sql.query(`Select * from user where email = '${email}' and password = '${md5(password)}' `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("checked user: ", {user_id: res[0]});
        if (res[0] == null) {
            result(null, {user_id: 0})
        } else {
            result(null, res[0]);
        }

    });
};

User.update = (user_id, email, password, result) => {
  sql.query(`UPDATE user SET email='${email}', password='${password}' WHERE user_id=${user_id}`, (err, res) => {
      if (err) {
          console.log(err)
          result(err, null)
      }

      console.log("User Updated: ", res);
      result(null, { update: 1 });
  })
};

module.exports = User;