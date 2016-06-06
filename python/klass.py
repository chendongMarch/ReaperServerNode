class klass:
    name = "unname"
    age = 0

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def desc(self):
        print self.name,self.age
