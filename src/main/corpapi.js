'use strict';
const fs = require('fs');
const xml2js = require('xml2js');

function getFilesInDolder(folder,cb){
    fs.readdir(folder,cb);
}
function getAllCorps(){         

//var xmlParser = new xml2js.Parser({explicitArray: false, ignoreAttrs: true});
    let parser = new xml2js.Parser();
    //var filePath = `${__dirname}\\..\\renderer\\assets\\data\\corp.dat.xml`;
    let dir = `${__dirname}\\..\\renderer\\assets\\data\\`;
    fs.readdir(dir,(err,files)=>{
        console.log(files);
    });
    let filePath ="./corp.xml";

    try{        
        fs.readFile(filePath, function(err, data) {
            if(err)
            {
                console.log("readCorps xml err:" + err);
            }else{
                //console.log(data);
                parser.parseString(data, function (err, result) {
                    console.log("Lenth=" + result.CorpConfig.Corps[0].CorpConfigItem.length);
                    return result.CorpConfig.Corps[0].CorpConfigItem;
                });
            }
        });
    }catch(e)
    {
        console.log(e);
    }
    return null;
}

module.exports ={
    getAllCorps
};