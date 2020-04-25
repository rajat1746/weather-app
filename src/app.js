const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geolocation')
const forecast=require('./utils/forecast')

//define paths to express config
const pathToDirectory=path.join(__dirname ,'./public')
const viewsPath=path.join(__dirname,'../src/template/views')
const partialPath=path.join(__dirname,'../src/template/partials')

const app=express();
const port=process.env.PORT || 3000

//setup static directory to server
app.use(express.static(pathToDirectory))

//setup handlebars for views engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Rajat Singh',
        contact:'rajatsinghbs80@gmail.com'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Rajat Singh',
        contact:'rajatsinghbs80@gmail.com'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help Contents',
        helpText:'Site in progress!',
        name:'Rajat Singh',
        contact:'rajatsinghbs80@gmail.com'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Please Provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error})
        }
        forecast(longitude,latitude, (error, forecast)=>{
           if(error){
          return res.send({error})
           }
           res.send({
               forecast:forecast,
               location,
               address:req.query.address
           })
        })

        
    })

})

app.get('/help/*',(req,res)=>{
    res.render('errorView',{
         message:'Site in progress!',
         name:'Rajat Singh',
        contact:'rajatsinghbs80@gmail.com'
    })

    
})

app.get('*',(req,res)=>{
    res.render('errorView',{
        message:'Page not found',
        name:'Rajat Singh',
        contact:'rajatsinghbs80@gmail.com'
    })


})

app.listen(port,()=>{
  console.log('The server is running on port' + port)
})