import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../redux/videoSlice'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Container = styled.div``

const NewComment = styled.form`
        display:flex;
        align-items:center;
        gap:10px;

        `

const Avatar = styled.img`
        width:50px;
        height:50px;
        border-radius:50%;`

const Input = styled.input`
       border:none;
       border-bottom:1px solid ${({theme})=>theme.soft};
       background-color:transparent;
       outline:none;
       padding:5px;
       width:100%;
       color:${({theme})=>theme.text};
       `

const Comments = ({videoId}) => {


  const {currentUser} = useSelector(state=>state.user)
  const {currentComments} = useSelector(state=>state.video)
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch()
 
   const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!newComment)return
        try{
            let res =  await axios.post(`/comments`,{desc:newComment,userId:currentUser._id,videoId})
             console.log('what is res',res)
             dispatch(addComment(res.data))
             setNewComment('')
             
        }catch(err){
            console.log(err)
        }
   }

  return (
  <Container>

       <NewComment onSubmit={handleSubmit}>

        {currentUser?
         <Avatar src={currentUser.img?currentUser.img:
          'https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307t-user-account-image-log-user.png'}/>
         :<AccountCircleIcon sx={{ fontSize: 55}} color="disabled"/>
         }

        {currentUser?  <Input placeholder='Add a comment...' value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>: <Input placeholder='sign in to add comment'/>}
      
      </NewComment>
       
       {currentComments ? currentComments.map(comment=>(
         <Comment key={comment._id} comment={comment} />
       )):""}
       
  </Container>
  )
}

export default Comments
