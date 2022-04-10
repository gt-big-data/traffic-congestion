#Python class that will port over data from the OpenWeather API
import requests
import errno as err
import pandas as pd



class weather_api_call:
    """
    Initialises a response from the OpenWeather API
    """
    def __init__(self, url, key, city):  # initialise api key
        self.base_url = url
        self.key = key
        self.city = city
        self.url = self.base_url + "q=" + self.city + "&appid=" + self.key

        self.weather_api = requests.get(self.url)

    """Converts data to a JSON opbject and writes to a JSON file
    
        .json() returns dict object that is written to a file
    """
    def toJson(self):
        response = self.weather_api
        if response.status_code == 200:
            data = response.json()
            file = open("data.json", "w")
            file.write(str(data))
            file.close()
            return data
        else:
            print("api status error", err)

    """ Returns individual columns in the JSON object
    
    Columns equate to individual values of weather descriptors
    """
    def jsonIndividualParameters(self, input, nested_input=None):
        masterJson = self.toJson()
        try:
            if input == "main" and nested_input is not None:
                return masterJson[input][nested_input]
            elif input == "weather" and nested_input is not None:
                return masterJson[input][0][nested_input]
            return masterJson[input]
        except:
            print("error occured")
            return None

    """Returns Pandas dataframe of relevant data parameters
    """
    def toPandas(self):

        json_data = self.toJson()
        data = pd.DataFrame()
        data["category"] = ["description", "max temp", "min temp", "feels like", "pressure", "humidity", "visibility",
                            "gust"]
        data["description"] = [json_data["weather"][0]["description"], self.toFarenheight(json_data["main"]["temp_max"]),
                   self.toFarenheight(json_data["main"]["temp_min"]), self.toFarenheight(json_data["main"]["feels_like"]), json_data["main"]["pressure"]
            , json_data["main"]["humidity"], json_data["visibility"], json_data["wind"]["speed"]]
        print(data)
        return data



    """Converts any kelvin temperatures into fahrenheit
    """
    def toFarenheight(self, temp):
        return 1.8*(float(temp) - 273) + 32



if __name__ == '__main__':
    base_url = "https://api.openweathermap.org/data/2.5/weather?"
    api_key = "cba1eecb3caa113fadc95926a58a339d"
    atlanta = "Atlanta"
    atlanta_weather = weather_api_call(base_url, api_key, atlanta)
    masterJson = atlanta_weather.toJson()
    # print(masterJson)
    json_individual = atlanta_weather.jsonIndividualParameters("weather", "main")
    dataFrame = atlanta_weather.toPandas()




