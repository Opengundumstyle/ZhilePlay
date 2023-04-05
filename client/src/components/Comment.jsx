import React from 'react'
import styled from 'styled-components'



const Container = styled.div`
   display:flex;
   gap:10px;
   margin:30px 0px`

const Avatar = styled.img`
   width:50px;
   height:50px;
   border-radius:50%;`

const Details = styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
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





const Comment = () => {
  return (
    <Container>
        <Avatar src="https://pbs.twimg.com/media/FS7LmWUUsAE642E.jpg"/>
        <Details>
            <Name>Momo<Date>1 day</Date></Name>
            <Text>
                君と離れてしまってから
                星の数ほどいろんな相手とつきあったりいろいろしたけど
                君を超える相手なんていなかった
                君のことしか考えられなかった

                君への初恋が唯一ですべてだった
                馬鹿げてるかもしれないけど
                君への初恋が僕のすべてだった
            </Text>
        </Details>
    </Container>
  )
}

export default Comment
