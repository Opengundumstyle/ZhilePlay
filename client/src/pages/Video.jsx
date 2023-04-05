import React from 'react'
import styled from 'styled-components'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Comments from '../components/Comments';
import Card from '../components/Card';


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
  return (
    <Container>
         <Content>
             <VideoWrapper>
             <iframe width="560" height="315" src="https://www.youtube.com/embed/uhA55hYnoHw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
             </VideoWrapper>
              <Title>
              Seven Lions x Illenium x Said The Sky - Rush Over Me (feat. HALIENE)
              </Title>
              <Details>
                  <Info>13.5M views . Oct 10, 2016</Info>
                  <Buttons>
                      <Button>
                          <ThumbUpOffAltIcon/>143k
                      </Button>
                      <Button>
                         <ThumbDownOffAltIcon/>0
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
                      <Img src={'data:image/jpeg;base64,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'}/>
                       <ChannelDetails>
                          <ChannelName>Seven Lions</ChannelName>
                          <ChannelCounter>200k Subscribers</ChannelCounter>
                          <ChannelDescribtion>
                          Seven Lions x Illenium x Said The Sky - Rush Over Me (feat. HALIENE)
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
         <Recommendation>
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
         </Recommendation>
    </Container>
  )
}

export default Video
