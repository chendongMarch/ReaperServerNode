/**
 * Created by march on 16/5/18.
 */
//启动python程序
exports.execPy = function () {
    var exec = require('child_process').exec;
    var arg1 = 'hello'
    var arg2 = 'jzhou'
    exec('python python/py_test.py ' + arg1 + '  ' + arg2 + '  ', function (error, stdout, stderr) {
        if (stdout.length > 1) {
            console.log('you offer args:', stdout);
            console.log('返回值', stdout)
        } else {
            console.log('you don\'t offer args');
        }
        if (error) {
            console.info('stderr : ' + stderr);
        }
    });
};

//启动爬虫
exports.execScrapy = function () {
    var exec = require('child_process').exec;
    exec('python reaperXXxiao/reaperXXxiao/main.py ', function (error, stdout, stderr) {
        if (error) {
            console.info('stderr : ' + stderr);
        }
    });
};

//获取数据库对象
getDb = function () {
    userName = '94612674-478f-48a8-85a4-a967508a5c91'
    passWd = '3f5c94f8-9283'
    hostNum = '192.168.1.19'
    portNum = 27017
    dbName = '5f24f670-9c2b-4089-ba75-759971499e7b'

    // userName = 'chendong'
    // passWd = 'chendong'
    // hostNum = '127.0.0.1'
    // portNum = 27017
    // dbName = 'xxxiao'

    var Db = require('mongodb').Db;
    Server = require('mongodb').Server;
    var db = new Db(dbName, new Server(hostNum, portNum));

    return db;
}

//查看专辑列表
exports.findAlbum = function (offset, callback) {
    var db = getDb();
    db.open(function (error, client) {
        if (error) throw error;
        var collection = db.collection('album');
        var rst = ''
        collection.find().limit(offset).toArray(function (error, docs) {
            callback(docs)
        });
    });
}

//查看某一个专辑下面的详细图片
exports.findDetails = function (albumlink, offset, callback) {
    var db = getDb();
    db.open(function (error, client) {
        if (error) throw error;
        var collection = db.collection('album_detail');
        var rst = ''
        collection.find({"album_link": albumlink}).limit(offset).toArray(function (error, docs) {
            callback(docs)
        });
    });
}


exports.findRecommend = function (time, callback) {
    var db = getDb();
    db.open(function (error, client) {
        if (error) throw error;
        var collection = db.collection('album_recommend');
        var rst = ''
        collection.find({"time_stamp": {$gt: time}}).toArray(function (error, docs) {
            callback(docs)
        });

    });
}

exports.findWholeAlbum = function (time, callback) {
    var db = getDb();
    db.open(function (error, client) {
        if (error) throw error;
        var collection = db.collection('album_whole');
        var rst = ''
        collection.find({"time_stamp": {$gt: time}}).toArray(function (error, docs) {
            callback(docs)
        });
    });
}
exports.findAlbumDetail = function (time, callback) {
    var db = getDb();
    db.open(function (error, client) {
        if (error) throw error;
        var collection = db.collection('album_detail');
        var rst = ''
        collection.find({"time_stamp": {$gt: time}}).toArray(function (error, docs) {
            callback(docs)
        });
    });
}

exports.insert = function (rst) {
    var db = getDb();
    db.authenticate(userName, passWd, function (err,rst) {
        console.log(err)
        db.open(function (error, client) {
            if (error) throw error;
            var collection = db.collection('test');
            for (var i = 0; i < rst.length; i++) {
                var toInsert = {
                    "album_desc": rst[i]['album_desc'],
                    "album_link": rst[i]['album_link'],
                    "album_cover": rst[i]['album_cover'],
                    "album_type": rst[i]['album_type'],
                    "time_stamp": rst[i]['time_stamp']
                };
                collection.insert(toInsert, function (err, docs) {
                    // console.log(err);
                });
            }
        });
    })
}

exports.findit = function (callback) {
    var db = getDb();

    db.open(function(err, db){
        if(err){
            return callback(err);
        }
        //读取 users 集合
        db.authenticate('chendong', 'chendong', function () {
            db.collection('test', function(err, collection){
                if(err){
                    db.close();
                    return callback(err);
                }
                //将用户数据插入 users 集合
                collection.find().toArray(function (error, docs) {
                    callback(docs)
                    db.close()
                });
            });
        });
    });
}
