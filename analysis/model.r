#MIXED EFFECT MODEL
#PART 1: DIVIDE INTO TEST AND TRAINING
#Partition of data into train and test datasets (80% train and 20% test) through random selection
inTrain <- createDataPartition (
  y = imputedDF$length, 
  p = .80, 
  list = FALSE)
trainDF <- imputedDF[inTrain,] 
testDF <- imputedDF[-inTrain,]  


#PART 2: CREATE FUNCTIONS FOR MIXED EFFECT MODEL 
#PART2.1 FUNCTION TO BUILD MODEL AND GENERATE PREDICTIONS
#function for mixed effect model
modelFunction <- function(df) {
  lme2 <- lmer(length ~ visibility+weekday+freeway+weekend+peak+hour+
                 parking_ct2+ind_ct+comm_ct+res_ct+ret_cnt+tot_blng_cnt+
                 turning_ct+sign_ct+cross_ct+toll_ct+traffic_signal+junction+
                 al_rel+al_count+interaction+
                 (1+hour || fishnet_id)+(1+hour|| freeway),
               data=df)
}

#function to generate train dataset predictions
trainPredFunction <- function(trainDF) {
  #run model
  model <- modelFunction(trainDF)
  #add predictions to dataframe
  trainDF$fitted <- predict(model, trainDF, allow.new.levels = TRUE)
  #get output dataframe
  trainPred <- trainDF
  #convert dependent variable from seconds to minutes; compute and add columns for relevant goodness of fit metrics
  trainPred <- trainPred %>%
    mutate(lengthMin = length/60,
           fittedMin = fitted/60,
           MAE = abs(lengthMin-fittedMin),
           MAPE = ifelse(length == 0, 0, abs((lengthMin-fittedMin)/fittedMin)),
           RMSE = sqrt(mean(abs(lengthMin-fittedMin)^2)))
  #return output dataframe
  return(trainPred)
}

#function to generate train dataset predictions
testPredFunction <- function(trainDF, testDF) {
  #run model
  model <- modelFunction(trainDF)
  #add predictions to dataframe
  testDF$fitted <- predict(model, testDF, allow.new.levels = TRUE)
  #get output dataframe
  testPred <- testDF 
   #convert dependent variable from seconds to minutes; compute and add columns for relevant goodness of fit metrics
  testPred <- testPred %>%
    mutate(lengthMin = length/60,
           fittedMin = fitted/60,
           MAE = abs(lengthMin-fittedMin),
           MAPE = ifelse(length == 0, 0, abs((lengthMin-fittedMin)/fittedMin)),
           RMSE = sqrt(mean(abs(lengthMin-fittedMin)^2)))
  #return output dataframe
  return(testPred)
}

#FUNCTIONS TO DISPLAY PREDICTIONS AND GOODNESS OF FIT METRICS IN DIFFERENT FORMATS
#functions to display output as tables - predictions grouped by day of the week
predByWeekdayFunction <- function(predDF) {
  #run model
  outputDF <- predDF %>%
    group_by(weekday) %>%
    summarise(Observed = mean(lengthMin),
              Predicted = mean(fittedMin),
              MAE = mean(MAE),
              MAPE = mean(MAPE),
              RMSE = mean(RMSE))
  return(outputDF)
}

#functions to display output as tables - predictions grouped by hour
predByHourFunction <- function(predDF) {
  #run model
  outputDF <- predDF %>%
    group_by(hour) %>%
    summarise(Observed = mean(lengthMin),
              Predicted = mean(fittedMin),
              MAE = mean(MAE),
              MAPE = mean(MAPE),
              RMSE = mean(RMSE))
  return(outputDF)
}

#functions to display output as tables - function to bind relevant test and train dataframes
cbindFunction <- function(predTrainDF, predTestDF) {
  predTrainDF <- predTrainDF %>%
    mutate(Type = "Train")
  predTestDF <- predTestDF %>%
    mutate(Type = "Test")
  outputDF <- cbind(predTrainDF, predTestDF)
  return(outputDF)
}
rbindFunction <- function(predTrainDF, predTestDF) {
  predTrainDF <- predTrainDF %>%
    mutate(Type = "Train")
  predTestDF <- predTestDF %>%
    mutate(Type = "Test")
  outputDF <- rbind(predTrainDF, predTestDF)
  return(outputDF)
}


#functions to group predictions for mapping - predictions grouped by fishnet,hour
predByFishnetHourFunction <- function(predDF) {
  #run model
  outputDF <- predDF %>%
    group_by(fishnet_id,hour) %>%
    summarise(Observed = mean(lengthMin),
              Predicted = mean(fittedMin),
              MAE = mean(MAE),
              MAPE = mean(MAPE),
              RMSE = mean(RMSE))
  return(outputDF)
}

#functions to group predictions for mapping - predictions grouped by fishnet,weekday,hour
predByFishnetWeekdayHourFunction <- function(predDF) {
  #run model
  outputDF <- predDF %>%
    group_by(fishnet_id,weekday,hour) %>%
    summarise(Observed = mean(lengthMin),
              Predicted = mean(fittedMin),
              MAE = mean(MAE),
              MAPE = mean(MAPE),
              RMSE = mean(RMSE))
  return(outputDF)
}

#functions to group predictions for mapping - function to spatial join data with fishnets
fishnetJoinFunction <- function (fishnet, df) {
  joinedOutput <- fishnet %>%
    left_join(., df, by = "fishnet_id")
}


#functions to group predictions for cross validation - function to group by fold
predByFoldFunction <- function(predDF) {
  #run model
  outputDF <- predDF %>%
    group_by(foldHoldout) %>%
    summarise(Observed = mean(lengthMin),
              Predicted = mean(fittedMin),
              MAE = mean(MAE),
              MAPE = mean(MAPE),
              RMSE = mean(RMSE))
  return(outputDF)
}


#FUNCTIONS FOR CROSS VALIDATION
#TEMPORAL CROSS VALIDATION
temporalCV <- function (df) {
  #create empty dataframe for temporal cross validation output
  outputTemporalCV <- data.frame()
  #run 'for' loop to loop through the different hours of the day
  for (i in 0:23) {
    #extract holdout hour
    holdoutHour <- i
    #create training and test data for the ith fold
    train <- df %>%
      filter(hour != i) 
    test <- df %>%
      filter(hour == i) 
    #run model and generate predictions
    predDF <- testPredFunction(train, test) 
    #indicate holdout group in predictions output
    predDF <- predDF %>%
      mutate(foldHoldout =  holdoutHour)
    #get predictions grouped by holout period
    outputDF <- predByFoldFunction(predDF)  
    #rbind the predictions for temporal cross validation
    outputTemporalCV <- rbind(outputTemporalCV, outputDF)
  }
  return(outputTemporalCV)
}


#GROUP CROSS VALIDATION
groupCV <- function(df) {
  #create empty dataframe for spatial cross validation output
  outputGroupCV <- data.frame()
  #run 'for' loop to loop through the different jam groups 
  for (i in 1:3) {
    #extract holdout group
    holdoutGroup <- i
    #create training and test data for the ith fold
    train <- df %>%
      filter(jamQtl != i) 
    test <- df %>%
      filter(jamQtl == i) 
    #run model and generate predictions
    predDF <- testPredFunction(train, test) 
    #indicate holdout group in predictions output
    predDF <- predDF %>%
      #get predictions grouped by holout period
      outputDF <- predByFoldFunction(predDF) 
    #rbind the predictions for group cross validation
    outputGroupCV <- rbind(outputGroupCV, outputDF)
  }
  return(outputGroupCV)
}


#SPATIAL CROSS VALIDATION FUNCTION
spatialCV <- function(df, neighborhood_lst) {
  #create empty dataframe for spatial cross validation output
  outputSpatialCV <- data.frame()
  #run 'for' loop to loop through the different neighborhoods in the neighborhood list
  for (i in neighborhood_lst) {
    #extract holdout neighborhood name
    holdoutNeighborhood <- i
    #create training and test dataframes for the ith fold
    train <- df %>%
      filter(NH_NAME != i) 
    test <- df %>%
      filter(NH_NAME == i) 
    #run model and generate predictions
    predDF <- testPredFunction(train, test) 
    #indicate holdout group in predictions output
    predDF <- predDF %>%
      mutate(foldHoldout = holdoutNeighborhood)
    #get predictions grouped by holout period
    outputDF <- predByFoldFunction(predDF) 
    #rbind the predictions for spatial cross validation
    outputSpatialCV <- rbind(outputSpatialCV, outputDF)
  }
  return(outputSpatialCV)
}


#PREPARE DATA FOR SPATIAL CROSS VALIDATION
#load data
fishnet <- read_sf("Data/Fishnet/fishnet.shp")
neighborhoods <- read_sf("Data/Neighborhoods/Louisville_KY_Urban_Neighborhoods.shp")

#set the coordinate reference system - UTM 16N NAD83 meters
neighborhoods <- neighborhoods %>%
  st_sf() %>%
  st_as_sf(.,  coords = c("longitude", "latitude"), crs = 4326) %>%
  st_transform(., crs = 32616) %>%
  st_sf()

#join fishnet and neighborhoods
fishnetNeighorhood <- st_intersection(fishnet, neighborhoods)

#drop geometry 
fishnetNeighorhood_df <- fishnetNeighorhood %>%
  st_set_geometry(NULL)

#left join
imputedDF_Spatial <- imputedDF %>%
  left_join(., fishnetNeighorhood_df, by="fishnet_id")


#PART 3: RUN MODEL AND GENERATE PREDICTIONS
#GENERATE PREDICTIONS
predTrainDF <- trainPredFunction(trainDF)
predTestDF <- testPredFunction(trainDF, testDF)

#RUN FUNCTIONS TO DISPLAY PREDICTIONS IN DIFFERENT FORMATS
#group predictions for tables 
predTrainWeekDF <- predByWeekdayFunction(predTrainDF)
predTestWeekDF <- predByWeekdayFunction(predTestDF)
predTrainHourDF <- predByHourFunction(predTrainDF)
predTestHourDF <- predByHourFunction(predTestDF)
#bind predictions to display as tables - filter ouT goodness of fit metrics as needed for display
weekPredTable <- cbindFunction(predTrainWeekDF, predTestWeekDF)
hourPredTable <- cbindFunction(predTrainHourDF, predTestHourDF)

#group predictions for mapping
predTrainFishnetHourDF <- predByFishnetHourFunction(predTrainDF)
predTestFishnetHourDF <- predByFishnetHourFunction(predTestDF)
predTrainFishnetWeekHourDF <- predByFishnetWeekdayHourFunction(predTrainDF)
predTestFishnetWeekHourDF <- predByFishnetWeekdayHourFunction(predTestDF)
#bind predictions to display as tables 
hourPredMapping <- rbindFunction(predTrainFishnetHourDF, predTestFishnetHourDF)
weekHourPredMapping <- rbindFunction(predTrainFishnetWeekHourDF, predTestFishnetWeekHourDF)
#create sf mapping objects by joining to dataframes to fishnet
hourPredMapping_sf <- fishnetJoinFunction(fishnet, hourPredMapping)
weekHourPredMapping_sf <- fishnetJoinFunction(fishnet, weekHourPredMapping)


#PART 5: PERFORM CROSS VALIDATIONS
#run temporal cross validation
temporalCVResults <- temporalCV(imputedDF) 

#run group cross validation
groupCVResults <- groupCV(imputedDF)

#neighborhoods selected for cross validation
neighborhood_lst <- list("CENTRAL BUSINESS DISTRICT", "CLIFTON", "SOUTHSIDE")

#run spatial cross validation
spatialCVResults <- spatialCV(imputedDF_Spatial, neighborhood_lst)