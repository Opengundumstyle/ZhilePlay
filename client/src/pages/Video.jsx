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
import { useLocation } from 'react-router-dom';
import { fetchSuccess,like,dislike } from '../redux/videoSlice';
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
  const dispatch = useDispatch()

  const path = useLocation().pathname.split('/')[2]

  const [channel,setChannel] = useState({})

  const handlelike = async()=>{
       await axios.put(`/users/like/${currentVideo._id}`)
       dispatch(like(currentUser._id))
  }

  const handleDislike = async()=>{
      await axios.put(`/users/dislike/${currentVideo._id}`)
      dispatch(dislike(currentUser._id))
  }

  const handleSub = async()=>{
     currentUser.subscribedUsers.includes(channel._id)?
     await axios.put(`/users/unsub/${channel._id}`):
     await axios.put(`/users/sub/${channel._id}`)
     dispatch(subscription(channel._id))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

           const videoRes = await axios.get(`/videos/find/${path}`)
           const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)

           setChannel(channelRes.data)
           dispatch(fetchSuccess(videoRes.data))

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [path,dispatch]);

  return (
    <Container>
         <Content>
             <VideoWrapper>
                <VideoFrame src={currentVideo.videoUrl} controls/>
             </VideoWrapper>
              <Title>
                {currentVideo.title}
              </Title>
              <Details>
                  <Info>{currentVideo.views} views. {format(currentVideo.createdAt)}</Info>
                  <Buttons>
                      <Button onClick={handlelike}>
                         { currentVideo.likes?.includes(currentUser._id)?
                           <ThumbUpIcon/>:<ThumbUpOffAltIcon/>}{currentVideo.likes?.length}
                         
                      </Button>
                      <Button onClick={handleDislike}>
                         {currentVideo.dislikes?.includes(currentUser._id)?<ThumbDownAltIcon/>:<ThumbDownOffAltIcon/>}{currentVideo.dislikes?.length}
                      </Button>
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
                              {currentVideo.desc}
                          </ChannelDescribtion>
                       </ChannelDetails>
                  </ChannelInfo>
                  <Subscribtions onClick={handleSub}>
                       {currentUser.subscribedUsers?.includes(channel._id)?"SUBSCRIBED":"SUBSCRIBE"}
                  </Subscribtions>
              </Channel>
              <Hr/>
              <Comments videoId={currentVideo._id}/>
         </Content>
        <Recommendation tags={currentVideo.tags}/>
        
    </Container>
  )
}

export default Video
