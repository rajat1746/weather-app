const request = require("request");

const forecast=(longitude,latitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=6d3f06baabbc6f0824e25c55b104de48&query=' + latitude + ',' + longitude + '&units=m';
request({url,json:true},(error,{body})=>{
    if(error){
        callback('Network connection Failed')
    }else if(body.error){
        callback('Unable to find location')
    }else{
        callback(undefined,"It is currently " + body.current.temperature + " degrees out. " + " There is a " + 
        body.current.precip + " % chance of rain." )

    }
})


}

module.exports=forecast

    
