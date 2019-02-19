'use strict';

const sqlite3 = require('sqlite3').verbose();


class CorpDb{    
    constructor (corpId){
        const path = require('path');
        let corpPath = "/data/" + corpId.toString() + ".db";
        const dbPath = path.join(__dirname, corpPath);
        console.log("path=" + dbPath);
        this.db = new sqlite3.Database(dbPath);
        this.db.serialize(()=>{
            const sql = `CREATE TABLE IF NOT EXISTS bankDay
                (id integer primary key,NoteDate date,BillNo text,Desc text,MoneyIn,MoneyOut,BankIn,BankOut)`;
            this.db.run(sql);
        });
    }

    saveBank(data,cb){
        if(data.id){
            //console.log("update corps...");
            const sql = 'update bankDay set NoteDate=?,BillNo=?,Desc=?,MoneyIn=?,MoneyOut=?,BankIn=?,BankOut=? where id=?';
            this.db.run(sql,data.NoteDate,data.BillNo,data.Desc,data.MoneyIn,data.MoneyOut,data.BankIn,data.BankOut,data.id,cb);
        }else{
            this.db.serialize(()=>{
                //console.log("insert into....");
                const sql = 'INSERT INTO bankDay(NoteDate,BillNo,Desc,MoneyIn,MoneyOut,BankIn,BankOut) VALUES(?,?,?,?,?,?,?)';
                this.db.run(sql,data.NoteDate,data.BillNo,data.Desc,data.MoneyIn,data.MoneyOut,data.BankIn,data.BankOut,(err)=>{
                    if(err){
                        cb(err);
                    }else{
                        const sqlId = 'select last_insert_rowid() newid';
                        this.db.all(sqlId,cb);
                    }
                });
            });
        }
    }

    insertEntity(tableName,data,cb){
        var arr = Object.keys(data);
        const sql = 'insert into' + tableName + '(' + ','.join(arr) + ') values(' +  
    }

    selectAll(tableName,cb){
        this.db.all("select id,NoteDate,BillNo,Desc,MoneyIn,MoneyOut,BankIn,BankOut from " +tableName + " order by NoteDate",cb);
    }

    closeDb(){
        this.db.close();
    }
}

module.exports = CorpDb;