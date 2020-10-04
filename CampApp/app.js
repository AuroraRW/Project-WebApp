var express=require("express")
var app=express()
var bodyParser=require("body-parser")
var mongoose= require("mongoose")

mongoose.connect("mongodb://localhost/camp")
app.use(bodyParser.urlencoded({extended: true}))

var campSchema= new mongoose.Schema({
    name: String,
    image: String,
    description: String
})
var Campsite=mongoose.model("Campsite", campSchema)
Campsite.create({
    name: "Creek",
    image:"https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description: "This is awesome!!"
},function(err, site){
    if(err){
        console.log(err)
    }else{
        console.log("Created!")
        console.log(site)
    }
})
// var campsites=[
//     {name: "Creek", image:"https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name: "Hill", image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-tulips-blooming-in-field-royalty-free-image-1584131616.jpg?crop=0.630xw:1.00xh;0.186xw,0&resize=640:*"},
//     {name: "Mountain", image:"https://images.pexels.com/photos/850359/pexels-photo-850359.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
// ]

app.get("/", function(req, res){
    res.render("landing.ejs")
})

app.get("/campsites", function(req,res){
    Campsite.find({}, function(err,site){
        if(err){
            console.log(err)
        }else{
            res.render("index.ejs", {campsites:site})
        }
    })
    // res.render("campsites.ejs", {campsites:campsites})
    
})

app.post("/post",function(req,res){
    // eval(require("locus"))
    var name=req.body.name
    var image=req.body.image
    var description=req.body.desc
    var newCampsite={name:name, image:image, description:description}
    Campsite.create(newCampsite,function(err,site){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campsites")
        }
    })
    // res.send("POST is OK!")
})

app.get("/campsites/new",function(req,res){
    res.render("new.ejs")
})

app.get("/campsites/:id", function(req,res){
    Campsite.findById(req.params.id, function(err,site){
        if(err){
            console.log(err)
        }else{
            res.render("show.ejs",{campsites:site})
        }
    })
})

app.listen(3000, function(){
    console.log("Campsite App Server Started!")
})