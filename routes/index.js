var express = require('express');
var router = express.Router();
var query = require('../helper/query');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});


router.post('/post', function (req, res) {
    console.log("接受post" + req.body.test)
    console.log(req.method)
    res.end("a" + req.method)
});


router.post('/addUser', function (req, res) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    query.addUser(username, pwd, function (rst) {
        res.send('{' + '"status":' + rst + ',"offset":' + 0 + '}');
        res.end();
    })
});

router.post('/checkUser', function (req, res) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    query.checkUser(username, pwd, function (rst) {
        res.send('{' + '"status":' + rst + ',"offset":' + 0 + '}');
        res.end();
    })
});

router.get('/download', function (req, res, next) {
    var fs = require('fs');
    var pdf = fs.createReadStream("../NodeTest/reaper-1.0.apk");
    res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-Disposition': 'attachment; filename=reaper-1.0.apk'
    });
    pdf.pipe(res);
});

//监测版本
router.get('/checkVersion', function (req, res, next) {
    query.checkVersion(function (rst) {
        console.log(rst[0].versioncode)
        res.send('{' + '"status":' + 0 + '",offset":' + 0 + ',' + '"versionCode":' + rst[0].versioncode + '}');
        res.end();
    })
});

//测试链接
router.get('/test', function (req, res, next) {
    query.test(function (rst) {
        res.send(rst)
        res.end()
    });
});


//随机浏览
router.get('/lucky', function (req, res, next) {
    var limit = ~~req.query.limit;
    query.lucky(limit, function (rst) {
        res.send('{' + '"offset":' + 0 + ',' + '"data":' + JSON.stringify(rst) + '}');
        res.end();
    })
});

//浏览全部专辑
router.get('/scan/whole', function (req, res, next) {
    var offset = ~~req.query.offset;
    var limit = ~~req.query.limit;
    query.getWholeAlbumScanData('album_whole', offset, limit, function (rst) {
        res.send('{' + '"offset":' + offset + ',' + '"data":' + JSON.stringify(rst) + '}');
        res.end();
    });
});

//浏览推荐专辑
router.get('/scan/recommend', function (req, res, next) {
    var albumtype = req.query.albumtype;
    var offset = ~~req.query.offset;
    var limit = ~~req.query.limit;
    console.log("albumtype = " + albumtype)
    query.getRecommendAlbumScanData('album_recommend', albumtype, offset, limit, function (rst) {
        res.send('{' + '"offset":' + offset + ',' + '"data":' + JSON.stringify(rst) + '}');
        res.end();
    });
});

//浏览专辑详情
router.get('/scan/detail', function (req, res, next) {
    var albumlink = req.query.albumlink;
    var offset = ~~req.query.offset;
    var limit = ~~req.query.limit;
    query.getDetails(albumlink, offset, limit, function (rst) {
        res.send('{' + '"offset":' + offset + ',' + '"data":' + JSON.stringify(rst) + '}');
        res.end();
    });
});


//查询所有的推荐,用于离线数据
router.get('/offline/recommend', function (req, res, next) {
    time = req.query.time;
    query.offlineData('album_recommend', time, function (rst) {
        res.send('{' + '"data":' + JSON.stringify(rst) + '}');
        res.end();
    });
});

//查询所有详情,用于离线
router.get('/offline/detail', function (req, res, next) {
    time = req.query.time;
    query.offlineData('album_detail', time, function (rst) {
        res.send('{' + '"data":' + JSON.stringify(rst) + '}');
        res.end();
    });
});

//查询所有专辑,用于离线
router.get('/offline/whole', function (req, res, next) {
    time = req.query.time;
    query.offlineData('album_whole', time, function (rst) {
        res.send('{' + '"data":' + JSON.stringify(rst) + '}');
        res.end();
    });
});

module.exports = router;
