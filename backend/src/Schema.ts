
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },  
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true }
});

const User = mongoose.model("User",UserSchema)

const FilmSchema = new mongoose.Schema({
    film:{
        type:String,
        required:true
    }
})

const Film = mongoose.model("Film",FilmSchema)

const Reviews  = new mongoose.Schema({
    reviewId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    film:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Film",
        required:true
    },
    reviewmsg:{
        type:String,
        required:true,
        maxlength:1000
    },
    upvote:{
        type:Number,
        default:0,
        required:true
    },
    downvote:{
        type:Number,
        default:0,
        required:true
    }
})

const Review = mongoose.model("Review",Reviews)

const Comments  = new mongoose.Schema({
    commentUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    commentReviewId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
        required:true
    },
    commentmsg:{
        type:String,
        required:true,
        maxlength:500
    },
    upvote:{
        type:Number,
        default:0,
        required:true
    },
    downvote:{
        type:Number,
        default:0,
        required:true
    }
})

const Comment = mongoose.model("Comment",Comments)


export {
    Film,
    User,
    Review,
    Comment
}
