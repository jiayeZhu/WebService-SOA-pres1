/// <reference path="../typings/node/node.d.ts" />
var express = require('express');
var router = express.Router();
var http = require('http');
var parser = require('xml2json');
var url = require('url');

/* GET xmlparser listing. */
router.get('/', function(req, res, next) {
    var xmltext = '';
    var options = url.parse('http://www.runoob.com/try/xml/cdcatalog.xml');
    options.method='get';
    console.log(options);
    var xmlreq = http.request(options,(response)=>{
        console.log('STATUS'+response.statusCode);
        response.on('data',(chunk)=>{
            xmltext += chunk;
        });
        response.on('end',()=>{
            res.setHeader('Content-Type','Text/xml');
            xmltext = xmltext.slice(43);
            xmltext = '<?xml version="1.0" encoding="ISO-8859-1"?>\n<?xml-stylesheet type="text/xsl" href="cdcatalog.xsl"?>\n' + xmltext;
            res.send(xmltext);
            console.log(xmltext);
            console.log('Data End');
            
        });
    });
    xmlreq.end();
    // res.send('respond with a resource');
});

module.exports = router;