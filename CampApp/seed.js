var mongoose=require("mongoose")
var Campsite=require("./models/campsite")
var Comment=require("./models/comment")
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet"
    }
]
// !!!!use callback function to ensure the code runs after the previous code
function seedDB(){
    //remove campsites
    Campsite.remove({},function(err){
        if(err){
            console.log(err)
        }
        console.log("removed campsites!")
        data.forEach(function(seed){
            Campsite.create(seed,function(err, campsite){
                if(err){
                    console.log(err)
                }else{
                    console.log("add a campsite")
                    Comment.create({
                        text: "This is a place",
                        author: "Tom"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        }else{
                            campsite.comments.push(comment)
                            campsite.save()
                            console.log("Created a new comment!")
                        }
                        
                    })
                }
            })
        })
    })
    //add a few campsites
    
    
    //add a few comments
}

module.exports = seedDB