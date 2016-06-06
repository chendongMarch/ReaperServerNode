class DomainIt:

    name = 'unname'
    link = ''
    desc = ''
    src = ''

    def __init__(self, link, desc, src):
        self.link = link
        self.desc = desc
        self.src = src

    def speak(self):
        print self.link, self.desc, self.src