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
            this.insertEntity('bankDay',data,cb);
            /*
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
            */
        }
    }

    insertEntity(tableName,data,cb){
        let arr = Object.keys(data);
        //删除id字段，如果存在的话
        let idIndex = arr.indexOf('id');
        if(idIndex>=0)
            arr.splice(idIndex,1);

        let paras = new Array(arr.length);        
        let arrVal = new Array(arr.length);
        for(let i=0;i<arr.length;i++){
            arrVal[i]="?";
            paras[i] = data[arr[i]];//参数的值
            //console.log(paras[i]);
        }
        
        const sql = `insert into ${tableName}(${arr.join(',')}) values(${arrVal.join(',')})`;
        console.log(sql);
        this.db.serialize(()=>{
            this.db.run(sql,paras,(err)=>{
                if(err){
                    cb(err);
                }else{
                    const sqlId = 'select last_insert_rowid() newid';
                    this.db.all(sqlId,cb);
                }
            });
        });
    }

    selectAll(tableName,cb){
        this.db.all("select id,NoteDate,BillNo,Desc,MoneyIn,MoneyOut,BankIn,BankOut from " +tableName + " order by NoteDate",cb);
    }

    closeDb(){
        this.db.close();
    }
}

module.exports = CorpDb;