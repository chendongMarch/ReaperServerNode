# -*-coding:utf-8 -*-
str = "i am node.js exec python demo"
print str
import pymongo
def funConnDb():
	client = pymongo.MongoClient(host="127.0.0.1",port=27017)
	db = client['march']
	coll = db['tb_new']
	# coll.insert({'abc':'def'})
	for index in coll.find({'abc':'def'}):
		print index
	# coll.remove({'abc':'def'},True)
funConnDb()

from klass import *
k = klass('chendong',12)
k.desc()