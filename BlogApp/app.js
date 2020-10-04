var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    methodOverride=require("method-override")
mongoose.connect("mongodb://localhost/blogApp")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(methodOverride("_method"))

var blogSchema=new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default: Date.now}
})

var Blog= mongoose.model("Blog", blogSchema)
// Blog.create({
//     title: "Test Blog",
//     image:"https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     body:"Hello"
// })

// Restful Routes
// Index
app.get("/", function(req,res){
    res.redirect("/blogs")
})
app.get("/blogs", function(req,res){
    Blog.find({},function(err,bs){
        if(err){
            console.log("Error")
        }else{
            res.render("index.ejs",{blogs:bs})
        }
    })
})
//New
app.get("/blogs/new", function(req,res){
    res.render("new.ejs")
})

//Create 
app.post("/blogs",function(req,res){
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            res.render("Create Error")
        }else{
            res.redirect("/blogs")
        }
    })

})
//Show
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("show.ejs", {blog:foundBlog})
        }
    })
})
//Edit
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("edit.ejs", {blog: foundBlog})
        }
    })
})
//Upate
app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err, updatedblog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs/"+ req.params.id)//go to the show page
        }
    })
    // res.send("Update")
})
//Delete
app.delete("/blogs/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs")
        }
    })
})

app.listen(3000, function(){
    console.log("Blog Server is running!")
})
