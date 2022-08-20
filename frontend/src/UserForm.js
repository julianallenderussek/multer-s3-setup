import React, { useState } from 'react'

const UserForm = () => {

  const [file, setFile] = useState()
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")

  const postUser = async (data) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("file", file);
  
    const response = await fetch("/users", {
      method: "POST",
      body: formData,
    });
    console.log(response)
    return response
  };

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
  }
  
  return (
    <div>
      <label>username</label>
      <input value={username} onChange={e => setUserName(e.target.value)} type="text"></input>
      <label>email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} type="text"></input>
      <label>image</label>
      <input onChange={fileSelected} type="file" accept="image/*"></input>
      <button onClick={postUser}>Submit</button>
    </div>
  )
}

export default UserForm