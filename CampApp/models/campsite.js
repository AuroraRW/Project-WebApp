var mongoose=require("mongoose")
var campSchema= new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId, //ID of comment
            ref: "Comment" //refer which table
        }
    ]
})

module.exports =mongoose.model("Campsite", campSchema)