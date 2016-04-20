/// <reference path="../typings/node/node.d.ts" />
var express = require('express');
var router = express.Router();
var http = require('http');
var parser = require('xml2json');
var url = require('url');

function getRoutes(poiName,dest,res) {
    var xmltext = '';
    console.log('dest:---------'+dest);
    var options = url.parse('http://api.map.baidu.com/direction/v1?mode=walking&origin='+encodeURI(poiName)+'&destination='+encodeURI(dest)+'&origin_region=%E4%B8%8A%E6%B5%B7%E5%B8%82&destination_region=%E4%B8%8A%E6%B5%B7%E5%B8%82&output=xml&ak=1LdQlr84NHi4QiNUeCUaiaqE');
    options.method='get';
    console.log(options);
    var xmlreq = http.request(options,(response)=>{
        console.log('STATUS'+response.statusCode);
        response.on('data',(chunk)=>{
            xmltext += chunk;
        });
        response.on('end',()=>{
            res.setHeader('Content-Type','Text/xml');
            // xmltext = xmltext.slice(43);
            xmltext = '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet type="text/xsl" href="cdcatalog1.xsl"?>\n' + xmltext;
            res.send(xmltext);
            console.log(xmltext);
            console.log('Data End');
            
        });
    });
    xmlreq.end();
}

/* GET xmlparser listing. */
router.get('/', function(req, res, next) {
    var preContext = '';
    var preOptions = url.parse('http://api.map.baidu.com/geocoder/v2/?ak=1LdQlr84NHi4QiNUeCUaiaqE&location='+req.query.lat+','+req.query.lng+'&output=json');
    preOptions.method='get';
    var preReq=http.request(preOptions,(response)=>{
        console.log(`STATUS:${res.statusCode}`);
        response.on('data',(chunk)=>{
            preContext += chunk;
        });
        response.on('end',()=>{
            console.log('BODY:');
            console.log(preContext);
            if(JSON.parse(preContext).result.poiRegions.length == 0){
                var orig = req.query.lat+','+req.query.lng;
                console.log(orig);
                getRoutes(orig,req.query.dest,res);
            }
            else
            getRoutes(JSON.parse(preContext).result.poiRegions[0].name,req.query.dest,res);
        });
    });
    preReq.end();
    // res.send('respond with a resource');
});

module.exports = router;