import React from 'react'
import styled from "styled-components"

const User = ({user}) => {
  return (
    <DivUser>
      <img src={`/images/${user.image}`} ></img>
      <h2>{user.username}</h2>
      <h2>{user.email}</h2>
    </DivUser>
  )
}

const DivUser = styled.div`
  border: 1px solid black;
  margin-top: 10px;
  margin-bottom: 10px;
`

export default User