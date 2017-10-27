from io import open
text = 'test'
with open('test.txt', 'w+', encoding='utf-8') as f:
    f.write(unicode(text))