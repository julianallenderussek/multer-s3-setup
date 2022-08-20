import UserForm from "./UserForm";
import { useState, useEffect } from "react"
import User from "./User"

function App() {
  
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
  
  const fetchUsers = () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        fetch("http://localhost:8000/users").then(async (res) => {
          const data = res.json();
          resolve(data)
        })
      } catch (err) {
        reject(err)
     }
    })
    return promise
  }

  useEffect(() => {
    setLoading(true)
    fetchUsers().then((data) => {
      console.log(data)
      setUsers(data.data)
      setLoading(false)
    })
    
  }, [reload])

  if (loading === true) {
    return (
      <>
        <h1>Loading</h1>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          This is the image uploader tutorial
        </h1>
        <UserForm />
        <div>
          {users.map(user => {
            return <User user={user}/>
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
