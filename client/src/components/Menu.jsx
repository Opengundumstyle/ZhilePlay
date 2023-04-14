import React from 'react'
import styled from 'styled-components'
import Zplay from '../img/zhileplay.png'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import SportsFootballRoundedIcon from '@mui/icons-material/SportsFootballRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Container = styled.div`
  flex:1.1;
  background-color:${({theme})=>theme.bg};
  height:100vh;
  color:${({theme})=>theme.text};
  font-size:16px;
  position:sticky;
  top:0;
  overflow: scroll;
  `

const Wrapper = styled.div`
    padding:18px 26px;`

const Logo = styled.div`
     display:flex;
     align-items:center;
     gap:5px;
     font-weight:bold;
     margin-bottom:25px;
`

const Img = styled.img`
    height:40px;
`

const Item = styled.div`
    display:flex;
    align-items:center;
    gap:20px;
    cursor:pointer;
    padding:5px 2px;
    font-size:13px;
    &:hover {
      background-color: ${({theme})=>theme.soft};
    }
`
const Hr = styled.hr`
    margin:15px 0px;
    border:0.7px solid ${({theme})=>theme.soft};
`

const Login = styled.div``

const Button = styled.button`
   padding:5px 15px;
   background-color:transparent;
   border:1px solid #3ea6ff;
   color:#3ea6ff;
   border-radius:3px;
   font-weight:500;
   margin-top:10px;
   cursor:pointer;
   `
const Title = styled.h2`
   font-size:14px;
   font-weight:500;
   color:#aaaaaa;
   margin-bottom:20px;
`

const Menu = ({darkMode,setDarkMode}) => {

  const {currentUser} = useSelector(state=>state.user)

  return (
     <Container>
        <Wrapper>
        <Link to="/" style={{textDecoration:'none',color:"inherit"}}>
            <Logo>
               <Img src={Zplay}/>
                ZhilePlay
            </Logo>
        </Link>

        <Link to="/" style={{textDecoration:'none',color:"inherit"}}>
            <Item>
              <HomeRoundedIcon/>
              Home
            </Item>
        </Link>
        <Link to="trends" style={{textDecoration:'none',color:"inherit"}}>
             <Item>
              <ExploreRoundedIcon/>
               Explore
             </Item>
        </Link>
        <Link to="subscriptions" style={{textDecoration:'none',color:"inherit"}}>
             <Item>
              <SubscriptionsRoundedIcon/>
              Subscriptions
             </Item>
         </Link>
          <Hr/>

             <Item>
              <LibraryAddRoundedIcon/>
               Library
             </Item>
             <Item>
              <HistoryRoundedIcon/>
               History
             </Item>

             <Hr/>
                { !currentUser &&
                 <>
                  <Login>
                        Sign in to like videos,comment and subscribe
                    </Login>
                      <Link to="signin" style={{textDecoration:"none"}}>
                        <Button>
                          SIGN IN
                        </Button>
                      </Link>
                    <Hr/>
                  </>
                } 
              <Title>
                 Best of ZhilePlay
              </Title>

             <Item>
              <LibraryMusicRoundedIcon/>
              Music
             </Item>
             <Item>
              <SportsFootballRoundedIcon/>
             Sports
             </Item>
             <Item>
              <SportsEsportsRoundedIcon/>
              Gaming
             </Item>
             <Item>
              <MovieCreationRoundedIcon/>
              Movies
             </Item>
             <Item>
              <ArticleRoundedIcon/>
               News
             </Item>
             <Item>
              <LiveTvRoundedIcon/>
              Live
             </Item>

             <Hr/>

             <Item>
              <SettingsRoundedIcon/>
              Settings
             </Item>
             <Item>
              <FlagRoundedIcon/>
              Report
             </Item>
             <Item>
              <HelpOutlineRoundedIcon/>
               Help
             </Item>
             <Item onClick ={()=> setDarkMode(!darkMode)}>
              <SettingsBrightnessIcon/>
              {darkMode? "Dark":"Light"} Mode
             </Item>

        </Wrapper>
     </Container>
  )
}

export default Menu
