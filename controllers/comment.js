
import Comment from "../models/Comments.js"
import Video from "../models/Video.js"
import { createError } from "../error.js"


export const addComment = async(req,res,next)=>{
    const newComment = new Comment({...req.body,userId:req.user.id})
     try{
        const savedComment = await newComment.save()
        res.status(200).send(savedComment).json(savedComment)
     }catch(err){
        next(err)
     }
}

export const deleteComment = async(req,res,next)=>{

    try{

        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        
        if(req.user.id === comment.userId || req.user.id === video.userId) {
               await Comment.findByIdAndDelete(req.params.id)
               res.status(200).json('The comment has been deleted')
        }
    }catch(err){

        return next(createError(403,"you can delete only your comment"))
    }
}

export const editComment = async(req,res,next)=>{
       
          try{
            const comment = await Comment.findById(req.params.id)
            if(req.user.id === comment.userId){
                   let newComment = await Comment.findByIdAndUpdate(req.params.id,{
                       $set:{desc:req.body.desc}
                   },{new:true})
                   res.status(200).json(newComment)
            }

          }catch(err){
             
            return next(createError(403,"you can edit only your comment"))
          }
}

export const getComment = async(req,res,next)=>{
    try{ 
         const comments = await Comment.find({videoId:req.params.videoId})
         res.status(200).json(comments.reverse())
    }catch(err){
       next(err)
    }
}

