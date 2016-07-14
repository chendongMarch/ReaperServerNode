#API文档


[TOC]


#数据库设计

##共有三个数据库———>全部专辑,推荐专辑,专辑详情

###全部专辑WholeAlbum
####_id": 主键id
####album_desc":该专辑的描述
####album_link": 指向该专辑的link,每个专辑这个也是唯一的
####key_words": 关键字,用' ,'分割的字符串
####album_cover": 专辑的封面
####time_stamp": 时间戳


###推荐专辑RecommendAlbum
####_id": 主键id
####album_desc":该专辑的描述
####album_link": 指向该专辑的link,每个专辑这个也是唯一的
####album_type: 该专辑的类型
####album_cover": 专辑的封面
####time_stamp": 时间戳


###推荐专辑AlbumDetail
####_id": 主键id
####width":图片的宽度,用来实现瀑布流
####height":图片的高度,用来实现瀑布流
####album_link":指向所在专辑的link,多个专辑详情指向同一个link
####photo_src":详情的图片的链接
####time_stamp":时间戳


#接口设计


##/
###首页


##/lucky?limit=10
###GET
###随机获取一定数目的数据,每次都是随机的
###url参数
####limit 数据量
###返回数据
####{'offset':0,data:[{WholeAlbum},{WholeAlbum}...]}


##/scan/whole?limit=10&offset=10
###GET
###浏览全部专辑时获取数据
###url参数
####limit 数据量
####offset 数据偏移
###返回数据
####{'offset':0,data:[{WholeAlbum},{WholeAlbum}...]}


##/scan/recommend?limit=10&offset=10&albumtype=new
###GET
###浏览推荐专辑时获取数据
###url参数
####limit 数据量
####offset 数据偏移
####albumtype 推荐专辑的类型
###返回数据
####{'offset':0,data:[{RecommendAlbum},{RecommendAlbum}...]}


##/scan/detail
###GET
###获取某一个专辑的详情数据
###url参数
####limit 数据量
####offset 数据偏移
####albumlink 这个专辑指向的link
###返回数据
####{'offset':0,data:[{AlbumDetail},{AlbumDetail}...]}



##/offline/recommend?time=201603042311
###GET
###离线下载推荐专辑的数据,增量下载
###url参数
####time 下载该时间之后的数据,格式(年月日时分秒)
###返回数据
####{'offset':0,data:[{RecommendAlbum},{RecommendAlbum}...]}


##/offline/detail
###GET
###离线下载专辑详情的数据,增量下载
###url参数
####time 下载该时间之后的数据,格式(年月日时分秒)
###返回数据
####{'offset':0,data:[{AlbumDetail},{AlbumDetail}...]}



##/offline/whole
###GET
###离线下载全部专辑的数据,增量下载
###url参数
####time 下载该时间之后的数据,格式(年月日时分秒)
###返回数据
####{'offset':0,data:[{WholeAlbum},{WholeAlbum}...]}