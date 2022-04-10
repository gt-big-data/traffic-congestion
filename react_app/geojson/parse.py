import pandas as pd
from IPython.display import display

data = pd.read_csv('./results.csv')
df = pd.DataFrame(data, columns=['geo'])
# print(df)

with open("data.json", "w") as myfile:
    myfile.write("{\n\"type\": \"FeatureCollection\",\n\"features\": [")

    for i in df.geo:

        myfile.write("{ \"type\": \"Feature\", \"geometry\": { \"type\": \"Polygon\", \"coordinates\": [ [ [ ")
        start = "POINT("
        x = i[i.find(start) + len(start): i.rfind(" ")]
        y= i[i.find(" ") + 1: i.rfind(")")]
        # print(x)
        # print(y)

        myfile.write(x + ", " + y + "\n")
        myfile.write("] ] ] } },\n")

    myfile.write("]}")