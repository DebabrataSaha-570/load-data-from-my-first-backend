import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef('')
  const emailRef = useRef('')

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault()
    // console.log(nameRef.current.value)
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }


    // send data to the server 
    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(newUser)
    })

  }
  return (
    <div >
      <h3>Found users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" ref={emailRef} name="" id="" placeholder="your email" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}> {user.id} {user.name} {user.email}</li>)
        }

      </ul>


    </div>
  );
}

export default App;
