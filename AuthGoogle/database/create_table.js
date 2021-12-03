var db = require("./db_config");

db.connect(function(err) {
    if (err) throw err;
    
    let sql = `CREATE TABLE users
    (
        id int NOT NULL AUTO_INCREMENT,
        uid VARCHAR(255),
        nama VARCHAR(255), 
        provider VARCHAR(255),
        avatar VARCHAR(255),
        PRIMARY KEY (id)
    )`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});