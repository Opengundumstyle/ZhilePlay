import React from 'react'
import styled from 'styled-components'
import { logout } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    color:${({theme})=>theme.text};`

const Box = styled.div`
        padding:5px 15px;
        width:97%;
        font-weight:300;
        cursor:pointer;
        display:flex;
        align-items:center;
        gap:9px;

        &:hover{
          background-color:rgba(0,0,0,0.1);
        }`

  const Box2 = styled.a`
  text-decoration:none;
  color:black;
  padding:5px 15px;
  width:97%;
  font-weight:300;
  cursor:pointer;
  display:flex;
  align-items:center;
  gap:9px;

  &:hover{
    background-color:rgba(0,0,0,0.1);
  }`



const Line = styled.div`

    margin:5px 0px;
    border:0.7px solid ${({theme})=>theme.soft};

`
    

const UserSession = ({darkMode,setDarkMode}) => {

  const dispatch = useDispatch()

  const handleLogout = (e)=>{
    e.preventDefault()
    dispatch(logout())
}

  const navigateChannel =()=>{
    
  }


  return (
     <Container>
          <Box onClick={navigateChannel}>
              <PortraitOutlinedIcon/>
              Your Channel
          </Box>
          <Box onClick={handleLogout}>
              <ExitToAppIcon/>
              Sign Out
          </Box>

          <Line/>
          
           <Box onClick ={()=> setDarkMode(!darkMode)} >
              <Brightness2OutlinedIcon/>
              Appearance                           
           </Box>
         
           <Box2 href="https://github.com/Opengundumstyle" target="_blank">
                <GitHubIcon/>
                About the developer
              
           </Box2>
           

            <Box>
             <HelpIcon />
              Help
            </Box>
             <Box>
              <FeedbackOutlinedIcon/>
              Send feedback
             </Box>
     </Container>
  )
}

export default UserSession
