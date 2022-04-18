import pandas as pd
from IPython.display import display

data = pd.read_csv('./results.csv')
df = pd.DataFrame(data, columns=['geo'])
# print(df)
count = 0
with open("data.js", "w") as myfile:
    myfile.write("var geoJson = {\n\"type\": \"FeatureCollection\",\n\"features\": [")

    for i in df.geo:
        myfile.write("{ \"type\": \"Feature\", \"properties\": {\"NAME\": \"" + str(count) + "\" }, \"geometry\": { \"type\": \"Polygon\", \"coordinates\": [ [ ")
        start = "POINT("
        x = i[i.find(start) + len(start): i.rfind(" ")]
        y = i[i.find(" ") + 1: i.rfind(")")]
        # print(x)
        # print(y)
        xvar = float(x)
        yvar = float(y)
        x1 = xvar - 0.001
        x2 = xvar + 0.001
        y1 = yvar - 0.001
        y2 = yvar + 0.001

        # myfile.write(x + ", " + y + "\n")
        myfile.write("[" + str(x1) + ", " + str(y1) + "], ")
        myfile.write("[" + str(x1) + ", " + str(y2) + "], ")
        myfile.write("[" + str(x2) + ", " + str(y1) + "], ")
        myfile.write("[" + str(x2) + ", " + str(y2) + "]")
        myfile.write(" ] ] } },\n")
        count = count + 1

    myfile.write("]}")