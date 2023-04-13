
import React from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { useState } from 'react';
import Upload from './Upload';
import UserSession from './UserSession';

// import { useDetectOutsideClick } from '../utils/useDetectOutsideClick'

const Container = styled.div`
    position:sticky;
    top:0;
    background-color:${({theme})=>theme.bg};
    height:56px;

`
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    height:100%;
    padding:0px 20px; 
    position:relative;
`
const Search = styled.form`
    width:40%;
    position:absolute;
    left:0px;
    right:0px;
    margin:auto; 
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:5px;
    border:1px solid #ccc;
    border-radius:25px;
    color:${({theme})=>theme.text};

`
const Input = styled.input`
    border:none;
    outline:none;
    background-color:transparent;
    flex:1;
    color:${({theme})=>theme.text};
`

const Button = styled.button`
   padding:5px 15px;
   background-color:transparent;
   border:1px solid #3ea6ff;
   color:#3ea6ff;
   border-radius:3px;
   font-weight:500;
 
   cursor:pointer;
   display:flex;
   align-items:center;
   gap:5px;
   &:hover{
      background-color:white;
      transition: 0.7s;
      color: #58b2ff;
   }
   `
const User= styled.div`
   display:flex;
   align-items:center;
   gap:10px;
   font-weight:500;
   color:${({theme})=>theme.text};
   cursor:pointer;

`

const Avatar = styled.img`
   width:32px;
   height:32px;
   border-radius:50%;
   background-color:#999;
`


const UserUtils = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    `
const Section = styled.div`
     display:flex;
     align-items:center;
     gap:5px;
     position: relative;`


const Menu = styled.div`
    background: ${({theme})=>theme.bg};
    border-radius: 5px;
    padding:12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transform: translateY(-20px);
    transition: transform 0.4s, visibility 0.4s;
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

    opacity: ${props => props.logout?"1":"0"};
    visibility:${props => props.logout?"visible":"hidden"};
    transform: translateY(0);`

const Main = styled.div`
      position: relative;`


const SearchIcon = styled(SearchOutlinedIcon)`
    cursor:pointer;
 `

const Navbar = ({darkMode,setDarkMode}) => {
  const navigate  = useNavigate()
  const {currentUser} = useSelector(state=>state.user)
  const [open,setOpen] = useState(false)
  const [logout,setLogOut] = useState()
  const [q,setQ] = useState("") 
 
  
  
  return (
    <>
      <Container>
          <Wrapper>
              <Search onSubmit={(e)=> { 
                     e.preventDefault()
                     if(!q) return
                     navigate(`/search?q=${q}`)}}>
                 <Input placeholder='Search' onChange={(e)=>setQ(e.target.value)}/>
                 <SearchIcon onClick={()=>navigate(`/search?q=${q}`)}/>
              </Search>
            { currentUser ? 
               <>
               <UserUtils>
                <User>
                    <VideoCallOutlinedIcon onClick={()=>setOpen(true)} sx={{ fontSize: 35 }}/>
                      <Main>
                        <Section onClick={()=>setLogOut(!logout)}>
                            <Avatar src={currentUser.img?currentUser.img:'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} />
                            {currentUser.name}
                        </Section>
                        <Menu logout={logout}>
                            <UserSession darkMode={darkMode} setDarkMode={setDarkMode} />
                        </Menu>
                      </Main>

                </User>
                
                </UserUtils>
                </> 
                : 
                <Link to="signin" style={{textDecoration:"none"}}>
                <Button>
                    <AccountCircleOutlinedIcon />
                    Sign In
                </Button>
                </Link>
             }
          </Wrapper>
      </Container>
      {
         open && <Upload setOpen={setOpen}/>
      }
      </>
  )
}

export default Navbar
