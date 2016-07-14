/**
 * Created by march on 16/7/8.
 *
 * 数据库查询
 */
var isDebug = false
var userName = '94612674-478f-48a8-85a4-a967508a5c91'
var passWd = '3f5c94f8-9283'
var hostNum = '192.168.1.19'
var portNum = 27017
var dbName = '5f24f670-9c2b-4089-ba75-759971499e7b'
//获取数据库对象
getDb = function () {
    if (isDebug) {
        userName = 'chendong'
        passWd = 'chendong'
        hostNum = '127.0.0.1'
        portNum = 27017
        dbName = 'xxxiao'
    }
    var Db = require('mongodb').Db;
    Server = require('mongodb').Server;
    var db = new Db(dbName, new Server(hostNum, portNum));
    return db;
}


//随机一个放在主页
exports.lucky = function (limit,callback) {
    var db = getDb();
    db.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate(userName, passWd, function () {
            db.collection('album_whole', function (err, collection) {
                if (err) {
                    db.close();
                    return callback(err);
                }
                var skip = Math.floor(Math.random() * 1000);
                collection.find().limit(limit).skip(skip).toArray(function (error, docs) {
                    callback(docs)
                    db.close()
                });
            });
        });
    });
}


//查看 专辑  列表
exports.getWholeAlbumScanData = function (colName, offset, limit, callback) {
    var db = getDb();
    db.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate(userName, passWd, function () {
            db.collection(colName, function (err, collection) {
                if (err) {
                    db.close();
                    return callback(err);
                }
                collection.find({}, {sort: {'time_stamp': -1}}).limit(limit).skip(offset).toArray(function (error, docs) {
                    callback(docs)
                    db.close()
                });
            });
        });
    });
}

exports.getRecommendAlbumScanData = function (colName, type, offset, limit, callback) {
    var db = getDb();
    db.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate(userName, passWd, function () {
            db.collection(colName, function (err, collection) {
                if (err) {
                    db.close();
                    return callback(err);
                }
                if (type == 'all') {
                    collection.find().limit(limit).skip(offset).toArray(function (error, docs) {
                        callback(docs)
                        db.close()
                    });
                } else {
                    collection.find({"album_type": type}, {sort: {'time_stamp': -1}}).limit(limit).skip(offset).toArray(function (error, docs) {
                        callback(docs)
                        db.close()
                    });
                }

            });
        });
    });
}


//查看某一个专辑下面的详细图片
exports.getDetails = function (albumlink, offset, limit, callback) {
    var db = getDb();
    db.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate(userName, passWd, function () {
            db.collection('album_detail', function (err, collection) {
                if (err) {
                    db.close();
                    return callback(err);
                }
                collection.find({"album_link": albumlink}).limit(limit).skip(offset).toArray(function (error, docs) {
                    callback(docs)
                    db.close()
                });
            });
        });
    });
}


//获取全部数据
exports.offlineData = function (colName, time, callback) {
    var db = getDb();
    db.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate(userName, passWd, function () {
            db.collection(colName, function (err, collection) {
                if (err) {
                    db.close();
                    return callback(err);
                }
                collection.find({"time_stamp": {$gt: time}}).toArray(function (error, docs) {
                    callback(docs)
                    db.close()
                });
            });
        });
    });
}

//测试查询
exports.test = function (callback) {
    var db = getDb();
    db.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 users 集合
        db.authenticate(userName, passWd, function () {
            db.collection('test', function (err, collection) {
                if (err) {
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


exports.test = function (callback) {
    var db = getDb();
    db.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 users 集合
        db.authenticate(userName, passWd, function () {
            db.collection('test', function (err, collection) {
                if (err) {
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
