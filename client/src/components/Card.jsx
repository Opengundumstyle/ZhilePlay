import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  width:${(props)=>props.type !== 'sm' && "340px"};
  margin-bottom:${(props)=>props.type === 'sm'? "10px":"45px"};
  cursor:pointer;
  display:${(props)=>props.type === 'sm' && "flex"};
  gap:10px;`


const Image = styled.img`
   width:100%;
   height:${(props)=>props.type === 'sm'? "115px":"202px"};
   background-color:#999;
   flex:1;
`
const Details = styled.div`
   display:flex;
   margin-top:${(props)=>props.type !== 'sm' && "16px"};
   gap:12px;
   flex:1;
`
const ChannelImage = styled.img`
   width:36px;
   height:36px;
   border-radius:50%;
   background-color:#999;
   display:${(props)=>props.type === 'sm' && "none"};
`

const Texts = styled.div`
  
`
const Title = styled.div`
   font-size:16x;
   font-weight:500;
   color:${({theme})=>theme.text}
`
const ChannelName= styled.div`
  font-size:14px;
  color:${({theme})=>theme.textSoft};
  margin:9px 0px;

`

const Info = styled.div`
  font-size:14px;
  color:${({theme})=>theme.textSoft};
`
const Card = ({type}) => {
  return (
    <Link to="/video/test" style={{textDecoration:'none'}}>
    <Container type={type}>
        <Image type={type} src={`https://images.genius.com/39935b675602d29979a470f3fe4c5dd4.1000x1000x1.jpg`}/>
        <Details type={type}>
            <ChannelImage type={type} src={'https://d3vhc53cl8e8km.cloudfront.net/artists/580/hak2mppaisjKrQ5e9PJb7xRwNh1KJfnvBuwNRjqo.jpeg'}/>
            <Texts>
                <Title>Rush over me</Title>
                <ChannelName>Seven Lion</ChannelName>
                <Info>13M views . 6 years ago</Info>
            </Texts>
        </Details>
    </Container>
    </Link>
  )
}

export default Card
