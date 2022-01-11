import urllib.request as req
import json
import csv
src = 'https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json'

datalist = []
with req.urlopen(src) as response:
    data = json.load(response)
    for i in data['result']['results']:
        stitle = i['stitle']
        address = i['address'][5:8]
        longitude = i['longitude']
        latitude = i['latitude']
        file = i['file'].split('//')[0] + i['file'].split('//')[1][0:-6]
        a = [stitle, address, longitude, latitude, file]
        datalist.append(a)

with open('data.csv', 'w') as file:
    writer = csv.writer(file, quoting=csv.QUOTE_ALL,delimiter=',')
    writer.writerows(datalist)


