import pandas as pd
import json
import requests
from IPython.display import display
import time
from datetime import datetime

with open("data.txt", "a") as myfile:
    myfile.write("{\n")
for i in range(60):
    DATA_URL = "https://www.waze.com/partnerhub-api/waze-feed-access-token/1046cdae-bcb9-4723-90c0-111c3cb014c2?format=1"
    json_string = requests.get(DATA_URL)
    temp = json_string.content

    index = str (temp).index('[')
    index2 = str (temp).index(']')
    s = (str (temp))[index : index2 + 1]

    # This gives everything in alerts
    parsed_input = json.loads(temp)['alerts']
    # display(parsed_input)
    y = json.dumps(parsed_input)

    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(ts)

    # # Display in a pandas df
    # df = pd.DataFrame(parsed_input)
    # display(df)

    # write to a json file (with index at the top), time.sleep?
    with open("data.txt", "a") as myfile:
        myfile.write("\"" + ts + "\": ")
        myfile.write(y)
        myfile.write(",\n\n")
    
    time.sleep(120)

with open("data.txt", "a") as myfile:
    myfile.write("}")