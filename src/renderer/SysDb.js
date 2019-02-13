'use strict';

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'syscfg.db');
console.log("path=" + dbPath);
const db = new sqlite3.Database(dbPath);

db.serialize(()=>{
    const sql = `CREATE TABLE IF NOT EXISTS corps
        (id integer primary key,LimitName,FullName,Contact,Phone,LastPeriod)`;
    db.run(sql);
});

export default class Corps{
    static saveCorp(data,cb){
        if(data.id){
            //console.log("update corps...");
            const sql = 'update corps set LimitName=?,FullName=?,Contact=?,Phone=? where id=?';
            db.run(sql,data.LimitName,data.FullName,data.Contact,data.Phone,data.id,cb);
        }else{
            db.serialize(()=>{
                //console.log("insert into....");
                const sql = 'INSERT INTO corps(LimitName,FullName,Contact,Phone) VALUES(?,?,?,?)';
                db.run(sql,data.LimitName,data.FullName,data.Contact,data.Phone,(err)=>{
                    if(err){
                        cb(err);
                    }else{
                        const sqlId = 'select last_insert_rowid() newid';
                        db.all(sqlId,cb);
                    }
                });
            });
        }
    }
    static getAllCorps(cb){
        db.all("select * from corps",cb);
    }
}

//module.exports = db;
//module.exports= {db,Corps};

/*
module.exports ={
    db,
    Corps
};
*/
