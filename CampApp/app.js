var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose= require("mongoose"),
    Campsite = require("./models/campsite"),
    Comment = require("./models/comment"),
    User =require("./models/user"),
    seedDB=require("./seed")

seedDB()
mongoose.connect("mongodb://localhost/camp")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))



app.get("/", function(req, res){
    res.render("landing.ejs")
})

//Index
app.get("/campsites", function(req,res){
    Campsite.find({}, function(err,site){
        if(err){
            console.log(err)
        }else{
            res.render("campsites/index.ejs", {campsites:site})
        }
    })
    // res.render("campsites.ejs", {campsites:campsites})
    
})

//Create
app.post("/campsites",function(req,res){
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

//New
app.get("/campsites/new",function(req,res){
    res.render("campsites/new.ejs")
})

//Show
app.get("/campsites/:id", function(req,res){
    Campsite.findById(req.params.id).populate("comments").exec(function(err,site){
        if(err){
            console.log(err)
        }else{
            console.log(site)
            res.render("campsites/show.ejs",{campsites:site})
        }
    })
})
//============================
//Comment routes
//============================
app.get("/campsites/:id/comments/new", function(req,res){
    Campsite.findById(req.params.id, function(err, site){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new.ejs", {campsite: site})
        }
    })
    //res.render("Comments/new.ejs")
})

app.post("/campsites/:id/comments", function(req,res){
    Campsite.findById(req.params.id, function(err, campsite){
        if(err){
            console.log(err)
            res.redirect("/campsites")
        }else{
            console.log(req.body.comment)
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    campsite.comments.push(comment)
                    campsite.save()
                    res.redirect("/campsites/"+campsite._id)
                }
            })
        }
    })
})
app.listen(3000, function(){
    console.log("Campsite App Server Started!")
})