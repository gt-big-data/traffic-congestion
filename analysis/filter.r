#SELECT RELVEANT FEATURES
#exclude features as per analysis under feature selection using 
imputedDF <- imputedDF %>%
  dplyr::select(-precipProbability, -month, -off_ct, -roundabt_ct, -holiday, -date, -geometry,)