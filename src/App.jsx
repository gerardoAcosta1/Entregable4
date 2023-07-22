
import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import UserCard from './components/UserCard'
import FormUsers from './components/FormUsers'
/*https://users-crud.academlo.tech/swagger/ 
https://users-crud.academlo.tech <-- baseurl
*/
function App() {
  const [closeForm, setCloseForm] = useState(true)
  const [updateInfo, setUpdateInfo] = useState()
const baseUrl = 'https://users-crud.academlo.tech'
  const [
    users,
    getAllUsers, 
    createNewUser, 
    deleteUserById, 
    updateUserById]=useFetch(baseUrl, setCloseForm)

    useEffect(()=>{
      getAllUsers('/users')
    },[])
console.log(users)
const handleOpenForm = () => {
  setCloseForm(false)
}
  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleOpenForm} className='formuser__btn'>Open Form</button>
      <FormUsers 
      createNewUser={createNewUser}
      updateInfo={updateInfo}
      updateUserById={updateUserById}
      setUpdateInfo={setUpdateInfo}
      closeForm={closeForm}
      setCloseForm={setCloseForm}
      />
      <div>
      {
        users?.map(user => (
          <UserCard
          key={user.id}
          user={user}
          deleteUserById={deleteUserById}
          setUpdateInfo={setUpdateInfo}
          handleOpenForm={handleOpenForm}
          />
        ))
      }
      </div>
    </div>
  )
}

export default App
