import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Comments from '../components/Comments';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Recommendation from '../components/Recommendation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useLocation,useNavigate } from 'react-router-dom';
import { fetchSuccess,like,dislike, fetchComments } from '../redux/videoSlice';
import { subscription } from '../redux/userSlice';
import axios from 'axios';
import { format } from 'timeago.js';


const Container = styled.div`
      display:flex;
      gap:24px;
      `

const Content = styled.div`
    flex:5;`

const VideoWrapper = styled.div`
    `

const Title = styled.h1`
   font-size:18px;
   font-weight:400;
   margin-top:20px;
   margin-bottom:10px;
   color:${({theme})=>theme.text};
    `

const Details = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  
    `

const Info = styled.span`
  color:${({theme})=>theme.textSoft};   
    `

const Buttons= styled.div`
  display:flex;
  gap:20px;
  color:${({theme})=>theme.text};

    `

const Button= styled.div`
  display:flex;
  align-items:center;
  gap:5px;
  cursor:pointer;
    `

const Hr = styled.hr`
  margin:15px 0;
  border:0.5px solid ${({theme})=>theme.soft};

`



const Channel = styled.div`
display:flex;
justify-content:space-between;
`

const ChannelInfo = styled.div`
   display:flex;
   gap:20px;

`

const Subscribtions = styled.button`
    background-color:#cc1a00;
    font-weight:500;
    color:white;
    border:none;
    border-radius:10px;
    height:max-content;
    padding:10px 20px;
    cursor:pointer;
`

const Img = styled.img`
  width:50px;
  height:50px;
  border-radius:50%;`

const ChannelDetails = styled.div`
  display:flex;
  flex-direction: column;
  color:${({theme})=>theme.text};
 `

const ChannelName = styled.span`
  font-weight:500;
  `

const ChannelCounter = styled.span`
  margin-top:5px;
  margin-bottom:20px;
  color:${({theme})=>theme.textSoft};
  font-size:12px;
  `

const ChannelDescribtion = styled.p`
  font-size:14px;
  `

const VideoFrame = styled.video`
  max-height:720px;
  width:100%;
  object-fit:cover;`

const Video = () => {

  const {currentUser} = useSelector(state=>state.user)
  const {currentVideo} = useSelector(state=>state.video)


  const navigate = useNavigate();

  const dispatch = useDispatch()
  
  const path = useLocation().pathname.split('/')[2]

  console.log('what is currentVideoId',currentVideo?._id)
  console.log('what is path',path)
  console.log('currentVideo???',currentVideo)

  const [channel,setChannel] = useState({})

  const handlelike = async()=>{
       if(currentUser){
        await axios.put(`api/users/like/${path}`)
        dispatch(like(currentUser._id))
       }else{
         navigate('/signin')
       }
  }

  const handleDislike = async()=>{
      if(currentUser){
      await axios.put(`api/users/dislike/${path}`)
      dispatch(dislike(currentUser._id))
      }else{
        navigate('/signin')
     }
  }

  const handleSub = async()=>{
      
    if(currentUser){
     currentUser.subscribedUsers.includes(channel._id)?
     await axios.put(`api/users/unsub/${channel._id}`):
     await axios.put(`api/users/sub/${channel._id}`)
     dispatch(subscription(channel._id))
    }else{
       navigate('/signin')
    }

  }
 
  // fetching videos and comments
  useEffect(() => {
    console.log("useEffect called");
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`api/videos/find/${path}`);
        const channelRes = await axios.get(
          `api/users/find/${videoRes.data.userId}`
        );

        console.log('do i have videoRes',videoRes)

        setChannel(channelRes.data);
   
        dispatch(fetchSuccess(videoRes.data));

      } catch (err) {
          console.log('this is the catch err',err)
      }
    };

    fetchData();
    
    console.log('fetchData called');

    const getComments = async()=>{

      try{
          const res = await axios.get(`api/comments/${path}`)

          dispatch(fetchComments(res.data))
          
      }catch(err){

          console.log(err)

        }
      }
      getComments()
   }
  , 
  [path, dispatch]
  
  );

  

  return (
    <Container>
         <Content>
             <VideoWrapper>
                {currentVideo?
                <VideoFrame src={currentVideo.videoUrl} controls autoPlay/>:  <div>Loading video...</div> }
             </VideoWrapper>
              <Title>
                  {currentVideo ? currentVideo.title:''}
              </Title>
              <Details>
                  <Info>{currentVideo?currentVideo.views:''} views. {currentVideo?format(currentVideo.createdAt):''}</Info>
                  
                  <Buttons>
                    { currentVideo?
                      <>
                      <Button onClick={handlelike}>
                         {currentUser && currentVideo.likes?.includes(currentUser._id)?
                           <ThumbUpIcon/>:<ThumbUpOffAltIcon/>}{currentVideo.likes?.length}
                      </Button>
                      <Button onClick={handleDislike}>
                         {currentUser && currentVideo.dislikes?.includes(currentUser._id)?<ThumbDownAltIcon/>:<ThumbDownOffAltIcon/>}{currentVideo.dislikes?.length}
                      </Button>
                      </> : ''
                    }
                      <Button>
                         <ShareIcon/>
                         Share
                      </Button>
                      <Button>
                         <BookmarkBorderIcon/>
                         Save
                      </Button>
                  </Buttons>
              </Details> 
              <Hr/>
              <Channel>
                  <ChannelInfo>
                      <Img src={channel.img}/>
                       <ChannelDetails>
                          <ChannelName>{channel.name}</ChannelName>
                          <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
                          <ChannelDescribtion>
                              {currentVideo?currentVideo.desc:''}
                          </ChannelDescribtion>
                       </ChannelDetails>
                  </ChannelInfo>
                  <Subscribtions onClick={handleSub}>
                       {currentUser && currentUser.subscribedUsers?.includes(channel._id)?"SUBSCRIBED":"SUBSCRIBE"}
                  </Subscribtions>
              </Channel>
              <Hr/>
              <Comments videoId={path}/>
         </Content>
         {currentVideo? <Recommendation tags={currentVideo.tags}/> : ''}
        
     
    </Container>
  )
}

export default Video
