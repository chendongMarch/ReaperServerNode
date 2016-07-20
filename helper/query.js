/**
 * Created by march on 16/7/8.
 *
 * 数据库查询的相关操作
 */

//切换数据库的相关字段
var isDebug = true;
var userName = '94612674-478f-48a8-85a4-a967508a5c91';
var passWd = '3f5c94f8-9283';
var hostNum = '192.168.1.19';
var portNum = 27017;
var dbName = '5f24f670-9c2b-4089-ba75-759971499e7b';
//数据库表名
var tbVersion = 'version';
var tbUserInfo = 'userinfo';
var tbAlbumWhole = 'album_whole';
var tbAlbumRecommend = 'album_recommend';
var tbAlbumDetail = 'album_detail';
//获取数据库对象
function getDb() {
    if (isDebug) {
        userName = 'chendong';
        passWd = 'chendong';
        hostNum = '127.0.0.1';
        portNum = 27017;
        dbName = 'xxxiao';
    }
    var Db = require('mongodb').Db;
    Server = require('mongodb').Server;
    return new Db(dbName, new Server(hostNum, portNum));
}

//授权访问mongo
function authority(db, callback4Req, callbackAuth) {
    //noinspection JSUnresolvedFunction
    db.open(function openDb(err, db) {
        if (err) {
            return callback4Req(err);
        }
        db.authenticate(userName, passWd, callbackAuth);
    });
}

//打开数据库集合
function openColl(db, collName, callbackOrigin, callbackOperate) {
    //noinspection JSUnresolvedFunction
    db.collection(collName, function (err, collection) {
        if (err) {
            db.close();
            return callbackOrigin(err);
        }
        callbackOperate(collection);
    });
}

//授权,打开某一个集合
function authAndOpenColl(db, colName, callbackReq, callbackOpen) {
    authority(db, callbackReq, function auth() {
        openColl(db, colName, callbackReq, function (collection) {
            callbackOpen(collection);
        });
    });
}

//根据条件获取数目
function countNum(coll, condition, options, callbackCount) {
    coll.find(condition, options, function (e, cursor) {
        cursor.count(function (e, count) {
            console.log(count);
            callbackCount(count);
        });
    });
}

//返回数据
function returnData(db, findRst, callbackReq) {
    findRst.toArray(function (error, docs) {
        if (error)
            callbackReq(error)
        callbackReq(docs)
        db.close()
    });
}

//随机一个放在主页
exports.lucky = function (limit, callback) {
    var db = getDb();
    authAndOpenColl(db, tbAlbumWhole, callback, function (collection) {
        var skip = Math.floor(Math.random() * 1000);
        var findRst = collection.find().limit(limit).skip(skip);
        returnData(db, findRst, callback);
    });
}


//检测版本
exports.checkVersion = function (callback) {
    var db = getDb();
    authAndOpenColl(db, tbVersion, callback, function (collection) {
        var findRst = collection.find();
        returnData(db, findRst, callback);
    });
}

//添加用户
exports.addUser = function (username, pwd, callback) {
    var db = getDb();
    authAndOpenColl(db, tbUserInfo, callback, function (collection) {
        countNum(collection, {username: username}, {}, function (count) {
            if (count > 0) {//存在相同用户
                callback(901)
            } else {
                collection.insert({username: username, pwd: pwd}, function (error, docs) {
                    if (error)
                        callback(902)
                    else
                        callback(0)
                    db.close()
                });
            }
        });
    });
}


//查询用户
exports.checkUser = function (username, pwd, callback) {
    var db = getDb();
    authAndOpenColl(db, tbUserInfo, callback, function (collection) {
        countNum(collection, {username: username, pwd: pwd}, {}, function (count) {
            if (count > 0)
                callback(0)
            else
                callback(903)
        })
    });
}


//查看 专辑  列表
exports.getWholeAlbumScanData = function (offset, limit, callback) {
    var db = getDb();
    authAndOpenColl(db, tbAlbumWhole, callback, function (collection) {
        var findRst = collection.find({}, {sort: {'time_stamp': -1}}).limit(limit).skip(offset);
        returnData(db, findRst, callback);
    });
}

exports.getRecommendAlbumScanData = function (type, offset, limit, callback) {
    var db = getDb();
    authAndOpenColl(db, tbAlbumRecommend, callback, function (collection) {
        var findRst;
        if (type === 'all')
            findRst = collection.find().limit(limit).skip(offset);
        else
            findRst = collection.find({"album_type": type}, {sort: {'time_stamp': -1}}).limit(limit).skip(offset)
        returnData(db, findRst, callback);
    });
}


//查看某一个专辑下面的详细图片
exports.getDetails = function (albumlink, offset, limit, callback) {
    var db = getDb();
    authAndOpenColl(db, tbAlbumDetail, callback, function (collection) {
        var findRst = collection.find({"album_link": albumlink}).limit(limit).skip(offset);
        returnData(db, findRst, callback);
    });
}


//获取全部数据
exports.offlineData = function (colName, time, callback) {
    var db = getDb();
    authAndOpenColl(db, colName, callback, function (collection) {
        var findRst = collection.find({"time_stamp": {$gt: time}});
        returnData(db, findRst, callback);
    });
}

//测试查询
exports.test = function (callback) {
    var db = getDb();
    authAndOpenColl(db, tbAlbumDetail, callback, function (collection) {
        var findRst = collection.find();
        returnData(db, findRst, callback);
    });
}
