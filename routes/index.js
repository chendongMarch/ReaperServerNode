var express = require('express');
var router = express.Router();
var tryit = require('../test/tryit');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/hello', function (req, res, next) {
    console.log("rst is "+({}+{}).length)
    console.log(req.query.name + "   " + req.query.pwd);//返回002
    res.end('{json}');
});

router.get('/execPy', function (req, res, next) {
    res.end("{execPy}");
    tryit.execPy();
});

router.get('/execScrapy', function (req, res, next) {
    res.end("{execScrapy}");
    tryit.execScrapy();
});


router.get('/findAlbum', function (req, res, next) {
    tryit.findAlbum(function (rst) {
        res.send(JSON.stringify(rst));
        res.end();
    });
});

router.get('/findDetails', function (req, res, next) {
    var albumlink = req.query.albumlink;
    var offset = req.query.offset;
    tryit.findDetails(albumlink,offset,function (rst) {
        // res.send(JSON.stringify(rst));
        res.send('{'+'"offset":'+ offset + ',' + '"data":'+JSON.stringify(rst)+'}');
        res.end();
    });
});



module.exports = router;
