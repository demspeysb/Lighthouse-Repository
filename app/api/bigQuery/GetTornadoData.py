import os 
from google.cloud import bigquery
import json



#holdover from early ideas
#This method gets tornado data from bigQuery
#Will help us to understand bigQuery

rev: slice = slice(4, -1, None)


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'LighthouseCollectiveAPIKey.json'


client = bigquery.Client()

#river_flood.flood
#tornado_paths.tornado
#Will be created based on form data sent by frontend
sql_query = """
SELECT * 
FROM `tornado_paths.tornado`
LIMIT 50
"""
#LIMIT 50

query_job = client.query(sql_query)


#Single row
rowList = []
#All combined rows
listOfRows = []
#Last char in substring
end = 0


for row in query_job.result():
    
    #Makes new row if documented last row   
    if end == 0:
        stringRow = str(row)[rev]
        jsonObjLocationStart = stringRow.find("{")
        lastItem = stringRow[stringRow.find("), {")-1:jsonObjLocationStart-1]

    #While there is data
    while (stringRow.find(",")!=-1):
        #Declare useful indexes
        jsonObjLocationStart = stringRow.find("{")
        end = stringRow.find(",")
        
        if end < jsonObjLocationStart:
            #making datetime.date into 1 value
            if stringRow.find(' datetime.date(')==0:
                dateTimeDate = stringRow[stringRow.find('datetime.date('):stringRow.find(')')+1]
                rowList.append(dateTimeDate)
                end = stringRow.find(')')+1

            #making datetime.time into 1 value
            elif stringRow.find(' datetime.time(')==0:
                dateTimeTime = stringRow[stringRow.find('datetime.time('):stringRow.find(')')+1]
                rowList.append(dateTimeTime)
                end = stringRow.find(')')+1

            #removing ) from last value before labels
            elif stringRow.find(lastItem)==1:
                lastItem=lastItem[:lastItem.find(")")]+lastItem[lastItem.find(")")+2:]
                rowList.append(lastItem)
                #stringRow=stringRow[end+1:]
                #print(stringRow[stringRow.find('datetime.date('):stringRow.find(')')])
                
            else:
                rowList.append(stringRow[1:end])
            stringRow=stringRow[end+1:]
            #print(stringRow)
            
        else:
            rowList.append(stringRow[jsonObjLocationStart:])
            stringRow = ""

    print(rowList)
    listOfRows.append(rowList)
    rowList = []
    end = 0

#experimenting with conversion to json
"""
with open("mydata.json", "w") as final:
    json.dump(listOfRows,final) 

files.download('mydata.json') 
"""