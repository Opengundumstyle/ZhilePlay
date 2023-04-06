import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import {fetchSuccess} from '../redux/videoSlice';

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

const Recommendation = styled.div`
    flex:2;`


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

const Video = () => {

  const {currentUser} = useSelector(state=>state.user)
  const {currentVideo} = useSelector(state=>state.video)
  const dispatch = useDispatch()

  const path = useLocation().pathname.split('/')[2]

  console.log('path',path)

  const [channel,setChannel] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {

           const videoRes = await axios.get(`/videos/find/${path}`)
           const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)

           console.log(videoRes)
           console.log(channelRes)
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
             <iframe width="100%" height="450" src="https://www.youtube.com/embed/uhA55hYnoHw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
             </VideoWrapper>
              <Title>
                {currentVideo.title}
              </Title>
              <Details>
                  <Info>{currentVideo.views} . {format(currentVideo.createdAt)}</Info>
                  <Buttons>
                      <Button>
                          <ThumbUpOffAltIcon/>{currentVideo.likes?.length}
                      </Button>
                      <Button>
                         <ThumbDownOffAltIcon/>{currentVideo.dislikes?.length}
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
                  <Subscribtions>
                       Subscribe
                  </Subscribtions>
              </Channel>
              <Hr/>
              <Comments/>
         </Content>
         {/* <Recommendation>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
         </Recommendation> */}
    </Container>
  )
}

export default Video
