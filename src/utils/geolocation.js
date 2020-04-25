const request = require("request")


const geocoding=(location,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoicmFqYXRrc2luZ2giLCJhIjoiY2s5N2Uwcmc1MGd4dDNlbGlhYXowYXdkaSJ9.CbLtbiRFrDQCfao4D0IZVA&limit=1'
    
    request({url,json:true},(error,{body})=>{
      if(error){
         callback('Network Connection Failed!')
      }else if(body.features.length===0){
        callback('Unable to find location.Try another Search')
      }else{
          callback(undefined,{
            longitude:body.features[0].center[0],
            latitude:body.features[0].center[1],
            location:body.features[0].place_name
          })
      }
  
      
    })
  }

module.exports=geocoding