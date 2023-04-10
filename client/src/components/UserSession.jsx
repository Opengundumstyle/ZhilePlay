import React from 'react'
import styled from 'styled-components'
import { logout } from '../redux/userSlice'
import { useDispatch } from 'react-redux'


const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    color:${({theme})=>theme.text};`

const Logout = styled.button`
        padding:5px 15px;
        background-color:transparent;
        border:1px solid #3ea6ff;
        color:#3ea6ff;
        border-radius:3px;
        font-weight:500;

        cursor:pointer;
        display:flex;
        align-items:center;
        gap:5px;`


const UserSession = () => {

  const dispatch = useDispatch()

  const handleLogout = (e)=>{
    e.preventDefault()
    dispatch(logout())
}



  return (
     <Container>
          <Logout onClick={handleLogout}>
              Sign Out
          </Logout>
     </Container>
  )
}

export default UserSession
