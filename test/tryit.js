/**
 * Created by march on 16/5/18.
 */
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

exports.execScrapy = function () {
    var exec = require('child_process').exec;
    exec('python reaperXXxiao/reaperXXxiao/main.py ', function (error, stdout, stderr) {
        if (error) {
            console.info('stderr : ' + stderr);
        }
    });
};
getDb = function () {
    var Db = require('mongodb').Db;
    Server = require('mongodb').Server;
    var db = new Db('march', new Server('localhost', 27017));
    return db;
}


// var Db = require('mongodb').Db;
// Server = require('mongodb').Server;
// var db = new Db('march', new Server('localhost', 27017));
exports.findAlbum = function (callback) {
    var db = getDb();
    db.open(function (error, client) {
        if (error) throw error;
        var collection = db.collection('album');
        var rst = ''
        collection.find().toArray(function (error, docs) {
            callback(docs)
        });
    });
}


exports.findDetails = function (albumlink,offset,callback) {
    var db = getDb();
    db.open(function (error, client) {
        if (error) throw error;
        var collection = db.collection('album_detail');
        var rst = ''
        collection.find({"album_link":albumlink}).limit(offset).toArray(function (error, docs) {
            callback(docs)
        });
    });
}