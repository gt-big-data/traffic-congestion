#FEATURE SELCTION USING THE BORUTA PACKAGE

#select all features and dependent variable in our dataset
featureDF <- featureDF %>%
  dplyr::select(4:38) 
#names(featureDF)

#impute any missing values
featureDF <- featureDF[complete.cases(featureDF),]

#create vector of column numbers that have categorical variables
convert <- c(1,2,3)
#convert categorical variables into factor data type
featureDF[,convert] <- data.frame(apply(featureDF[convert], 2, as.factor))

#run Boruta model
set.seed(123)
borutaTrain <- Boruta(Length ~., data = featureDF, doTrace = 2)
#print(borutaTrain)
borutaTrainDF <- attStats(borutaTrain)

#get final selection 
finalBoruta <- TentativeRoughFix(borutaTrain)
#print(finalBoruta)
borutaFinalDF <- attStats(finalBoruta)