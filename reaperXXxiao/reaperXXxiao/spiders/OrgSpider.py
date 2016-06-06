import scrapy
from scrapy import Request
from scrapy import Selector
class DmozSpider(scrapy.Spider):
    name = "dmoz2"
    allowed_domains = ["dmoz.org"]
    start_urls = [
        "http://m.xxxiao.com/14797/"
    ]

    def make_requests_from_url(self, url):
        return Request(url, dont_filter=True, meta={
            'dont_redirect': True,
            'handle_httpstatus_list': [301, 302]
        })

    def parse(self, response):
        filename = response.url.split("/")[-2]+'.txt'
        selector = Selector(response)
        print selector.xpath()
        with open(filename, 'wb') as f:
            for line in selector.xpath("//div[@class='gallery-icon portrait']"):
                 print line
                 f.write(line.xpath('a[1]/@href').extract()[0]+'\n')