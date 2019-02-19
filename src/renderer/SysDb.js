'use strict';
import CorpDb from "./CorpDb";
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'syscfg.db');
//console.log("path=" + dbPath);
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
    static initCorpDb(corpId){
        return new CorpDb(corpId);
    }
    
    static getAllCorps(cb){
        db.all("select * from corps",cb);
    }

    static ConvertStrToDate(datetimeStr) {
        var mydateint = Date.parse(datetimeStr);//数值格式的时间
        if (!isNaN(mydateint)) {
            var mydate = new Date(mydateint);
            return mydate;
        }
        var mydate = new Date(datetimeStr);//字符串格式时间
        var monthstr = mydate.getMonth() + 1;
        if (!isNaN(monthstr)) {//转化成功
            return mydate;
        }//字符串格式时间转化失败
        var dateParts = datetimeStr.split(" ");
        var dateToday = new Date();
        var year = dateToday.getFullYear();
        var month = dateToday.getMonth();
        var day = dateToday.getDate();
        if (dateParts.length >= 1) {
            var dataPart = dateParts[0].split("-");//yyyy-mm-dd  格式时间             
            if (dataPart.length == 1) {
                dataPart = dateParts[0].split("/");//yyyy/mm/dd格式时间
            }
            if (dataPart.length == 3) {
                year = Math.floor(dataPart[0]);
                month = Math.floor(dataPart[1]) - 1;
                day = Math.floor(dataPart[2]);
            }
        }
        if (dateParts.length == 2) {//hh:mm:ss格式时间
            var timePart = dateParts[1].split(":");//hh:mm:ss格式时间
            if (timePart.length == 3) {
                var hour = Math.floor(timePart[0]);
                var minute = Math.floor(timePart[1]);
                var second = Math.floor(timePart[2]);
                return new Date(year, month, day, hour, minute, second);
            }
        }
        else {
            return new Date(year, month, day);
        }
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
