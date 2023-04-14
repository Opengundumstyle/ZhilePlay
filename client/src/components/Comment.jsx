import React, { useEffect,useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useDispatch, useSelector } from 'react-redux'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { deleteComment,editComment} from '../redux/videoSlice';
import { format } from 'timeago.js';

const Container = styled.div`
   display:flex;
   gap:10px;
   margin:30px 0px;
   width:100%;
   `

const Avatar = styled.img`
   width:50px;
   height:50px;
   border-radius:50%;`

const Details = styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
  width:100%;
  color:${({theme})=>theme.text}

`

const Name = styled.span`
  font-size:13px;
  font-weight:500;
  `

const Date = styled.span`
  font-size:12px;
  font-weight:400;
  color:${({theme})=>theme.textSoft};
  margin-left:5px;
 `

const Text = styled.span`
  font-size:13px;
  `

const InfoIcon = styled(MoreVertOutlinedIcon)`
     cursor:pointer;
     padding:5px;
     height:auto;
     position: relative;
     color:${({theme})=>theme.text};
     &:hover{
       background-color:lightgrey;
       border-radius:50%;
       padding:5px;
     }
 `

const Info =styled.div`
      position: relative;
      margin-left: auto;
 `
const Menu = styled.div`
      background: #ffffff;
      border-radius: 5px;
      padding:12px;
      width:auto;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
      transform: translateY(-20px);
      transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
      z-index:8;
      margin-left: -100px;
      font-family: 'Open Sans';
      font-size: 14px;
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:3px;
      position: absolute;
      right:0;
     
      opacity: ${props => props.isActive?"1":"0"};
      visibility:${props => props.isActive?"visible":"hidden"};
      transform: translateY(0);

`

      const Delete = styled.div`
          display:flex;
          align-items:center;
          cursor:pointer;
          width:100%;
          padding-right:5px;
          gap:5px;

          &:hover{
              background:lightgrey;
          }`

      const Edit = styled.div`
          display:flex;
          align-items:center;
          cursor:pointer;
          width:100%;
          gap:5px;
          &:hover{
            background:lightgrey;
      }`

      const DeleteIcon = styled(DeleteForeverOutlinedIcon)`flex:2;`

      const EditIcon = styled(EditOutlinedIcon)`flex:2`
      
      const SubText = styled.div`
             flex:3;
      `

     const Textarea = styled.input`
          border:none;
          border-bottom:3px solid ${({theme})=>theme.textSoft};
          background-color:transparent;
          outline:none;
          padding:5px;
          width:100%;
          flex:1;
     `

     const Cancel = styled.div`
           cursor:pointer;
           padding:8px 15px;
           border-radius: 20px 20px;
           transition:0.2s;
           &:hover{
            background:lightgrey;
      }`

     const Submit = styled.div`
           background-color:#065fd4;
           color:white;
           padding:8px 15px;
           border-radius: 20px 20px;
           cursor:pointer;
           transition:0.3s;
           &:hover{
            background:#076aed;
      }
           `

     const EditSection = styled.div`
          gap:3px;
          display:flex;
          flex-direction:row;
          justify-content:flex-end;
          font-size:14px;
          font-weight:500;`


const Comment = ({comment}) => {

  const [channel,setChannel] = useState({})
  const {currentUser} = useSelector(state=>state.user)
  const [commentText,setEditedComment] = useState(comment.desc)
  const [isEditing,setIsEditing] = useState(false)
  const [isActive,setIsActive] = useState(false)
  

  const dispatch = useDispatch()
  const currentUserId = currentUser?._id
  const commentId = comment._id

  useEffect(()=>{
  
       const fetchComment = async()=>{
        const res = await axios.get(
          `/users/find/${comment.userId}`
        )
        setChannel(res.data)
       }
       
      fetchComment()

  },[comment.userId])


const handleEdit = ()=>{
    setIsEditing(true);
    setIsActive(false);
}


const handleDelete = async()=>{


    try{
         await axios.delete(`/comments/delete/${commentId}`)
         dispatch(deleteComment(commentId))
         
    }catch(err){
        console.log(err)
    }
}

const saveComment = async() =>{
       
       try{ 
           const res  =  await axios.put(`/comments/edit/${commentId}`,{desc:commentText})
           dispatch(editComment(res.data))
           setIsEditing(false)
        }catch(err){
             console.log(err)
        }
}




  return (
    <Container>
        <Avatar src={channel.img?channel.img:'https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307t-user-account-image-log-user.png'}/>
        <Details>
            <Name>{channel.name}<Date>{format(comment.createdAt)}</Date></Name>
         
            {isEditing ? ( // if we're in edit mode, show a textarea for editing the comment
               
                <>
                <Textarea value={commentText} onChange={e => setEditedComment(e.target.value)}/>
                <EditSection>
                      <Cancel onClick={()=>setIsEditing(false)}>Cancel</Cancel>
                      <Submit onClick={saveComment}>Save</Submit>
                </EditSection>
                </>
               
            ) : (
              <Text>{commentText}</Text> // otherwise, just show the comment text
            )}
            
        </Details>
      
           {currentUserId === comment.userId ? 
                          <Info>
                             <InfoIcon onClick={()=>setIsActive(!isActive)}/>
                          
                              <Menu isActive={isActive} >
                                    <Edit onClick={handleEdit}>
                                      <EditIcon/>
                                      <SubText>Edit</SubText>
                                        
                                   </Edit>
                                   <Delete onClick={handleDelete}>
                                        <DeleteIcon/>
                                         <SubText>Delete</SubText>
                                   </Delete>
                              </Menu>
                     
                          </Info> : 
                           ''
              }
         
     </Container>
  )
}

export default Comment
