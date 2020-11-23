import urllib.request
import bs4 as bs
import re
#codes-basic
#100 -> basic search !
#200 -> meta tags !
#300 -> old tags !
#400 -> resposnive?

class Scanner:

    def __init__(self, address):
        self.issues = []
        self.keywords = []
        self.source = urllib.request.urlopen(address).read()
        self.soup = bs.BeautifulSoup(self.source, features="html.parser")

        self.basicSearch()
        self.scanOldTags()
        self.scanForMeta()

    def basicSearch(self):
        titleLen = len(str(self.soup.find("title")))
        if(titleLen <= 15):
            print("[*] Couldnt find title tag")
            self.issues.append(100)
        elif(titleLen >=70):
            print("[*] Title too long")
            self.issues.append(101)
        if(self.existsTag("head") != True):
            print("[*] Couldnt find head tag")
            self.issues.append(102)
        if (self.existsTag("body") != True):
            print("[*] Couldnt find body tag")
            self.issues.append(103)
        if(self.existsTag("main") != True):
            print("[*] Main tag not found")
            self.issues.append(104)

    def scanOldTags(self):
        old_tags = ["center", "font", "s", "u"]
        displayInfo = False
        for tag in old_tags:
            if(self.existsTag(tag)):
                print("[*] <" + str(tag) + "> " + "tag was found")
                displayInfo = True
        if(displayInfo == True):
            self.issues.append(300)
            # print("Find out why you should not use it here: xxxxxxx.com")

    def existsTag(self, tag):
        if(len(str(self.soup.find(tag))) > 4):
            return True
        else:
            return False

    def scanForMeta(self):
        # SEARCH FOR DESCRIPTION
        desc = self.soup.find_all(attrs={"name": re.compile(r'Description', re.I)})
        if(len(desc) == 0):
            print("[*] No meta description found")
            self.issues.append(200)
        else:
            # print("[*] Description found")
            pass
        # SEARCH FOR FAVICON
        favicon = self.soup.find_all("link", rel="icon")
        if(len(favicon) == 0):
            print("[*] No favicon found")
            self.issues.append(201)
        else:
            # print(favicon)
            pass
        # Search for charset
        charset = self.soup.find_all(attrs={"charset": re.compile('.*', re.I)})
        if (len(charset) == 0):
            print("[*] No charset found")
            self.issues.append(202)
        # Search for keywords
        # keywords_meta = self.soup.find(attrs={"name": re.compile(r'Keywords', re.I)})
        try:
            keywords = self.soup.find("meta", {"name": "keywords"})['content']
            keywords = keywords.split(",")
            for keyword in keywords:
                print(keyword)
        except TypeError:
            print("No keywords found")
            self.issues.append(203)



    def isResponsive(self):
        pass



meta = Scanner("https://www.eactive.pl/blog-o-seo/spor-o-meta-keywords-czy-wciaz-sa-potrzebne/")
if(len(meta.issues) > 0):
    print(meta.issues)
else:
    print("All good")