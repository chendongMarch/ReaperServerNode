# coding:utf-8
import scrapy
from MongoUtils import *
from scrapy import Request
from scrapy.selector import Selector


class FirstSpider(scrapy.spiders.Spider):
    name = "dmoz"
    allowed_domains = ["m.xxxiao.com"]
    start_urls = [
        "http://m.xxxiao.com",
        "http://m.xxxiao.com/cat/xinggan",
        "http://m.xxxiao.com/cat/shaonv",
        "http://m.xxxiao.com/cat/mrxt",
        "http://m.xxxiao.com/cat/wmxz",
        "http://m.xxxiao.com/cat/wallpaper"
    ]

    def make_requests_from_url(self, url):
        return Request(url, dont_filter=True, meta={
            'dont_redirect': True,
            'handle_httpstatus_list': [301, 302]
        })

    @staticmethod
    def code(unicode):
        return unicode.encode().replace('-760x500.jpg', '.jpg')

    mongo = MongoUtils('')
    db = mongo.getDb()
    collection = mongo.getCol(db, 'tb_new')
    coll_album = mongo.getCol(db, 'album')
    coll_album_detail = mongo.getCol(db,'album_detail')


    def parse_detail(self, response):
        selector = Selector(response)
        album_link = selector.xpath('//head/link[@rel="canonical"]/@href').extract()[0]
        for line in selector.xpath("//div[@class='gallery-icon portrait']"):
            detail_src = line.xpath('a[1]/@href').extract()[0]
            dict = {}
            dict['album_link'] = album_link
            dict['detail_src'] = detail_src
            MongoUtils.updateOrInsert(self.coll_album_detail,dict)

    def parse(self, response):
        selector = Selector(response)
        for line in selector.xpath('//div[@class="post-thumb"]'):
            album_link = self.code(line.xpath('a[1]/@href').extract()[0])
            yield Request(album_link, callback=self.parse_detail)
            pic_src = self.code(line.xpath('a[1]/img/@src').extract()[0])
            pic_desc = self.code(line.xpath('a[1]/img/@alt').extract()[0])
            dict = {}
            dict['album_link'] = album_link
            dict['pic_src'] = pic_src
            dict['pic_desc'] = pic_desc
            MongoUtils.updateOrInsert(self.coll_album, dict)




        # index = 0
        # otherIndex = 100
        # def parse_detail(self,response):
        #     self.otherIndex = self.otherIndex + 1
        #     filename = '%dpage.txt' % (self.otherIndex)
        #     # filename = response.url.split("/")[-2] + '.txt'
        #     selector = Selector(response)
        #     with open(filename, 'wb') as f:
        #         for line in selector.xpath("//div[@class='gallery-icon portrait']"):
        #             f.write(line.xpath('a[1]/@href').extract()[0] + '\n')
        #
        #
        # def parse(self, response):
        #     selector = Selector(response)
        #     # name = selector.xpath('//meta[@name="keywords"]/@content').extract()[0]
        #     self.index = self.index + 1
        #     filename ='%dpage.txt'%(self.index)
        #
        #     with open(filename, 'wb') as f:
        #         for line in selector.xpath('//div[@class="post-thumb"]'):
        #             link = line.xpath('a[1]/@href').extract()[0]
        #             yield Request(link, callback=self.parse_detail)
        #             src = line.xpath('a[1]/img/@src').extract()[0]
        #             desc = line.xpath('a[1]/img/@alt').extract()[0]
        #             self.start_urls.append(link)
        #             f.write(desc + '  ' + link + '  ' + self.code(src) + '\n')
        #         f.write('\n\n----------------------------------------------------写完一行----------------------------------------------------\n\n')
