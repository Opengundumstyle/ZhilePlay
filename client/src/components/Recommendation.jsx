import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import axios from 'axios'
import { useState,useEffect } from 'react'
const Container = styled.div`
    flex:2;`

const Header = styled.div`
    padding-bottom:5px;
    font-weight:bold;
`

const Recommendation = ({tags}) => {

  const [videos,setVideos] = useState([])
  console.log('what are the tags',tags)
  
  useEffect(()=>{
     const fetchVideos = async()=>{
         const res = await axios.get(`/videos/tags?tags=${tags}`)
         setVideos(res.data)
     }
     fetchVideos()
  },[tags])

  return (
   <Container>
       <Header>You may also like:</Header>
       {videos.map(video=>(
         <Card type="sm" key={video._id} video={video}/>
       ))}
   </Container>
  )
}

export default Recommendation
