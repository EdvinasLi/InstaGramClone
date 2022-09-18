import React from 'react'
import './firstview.css'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import MainContext from '../../Maincontext'
import axios from 'axios'


export default function Firstview() {
    const { setLoggedIn, setUserInfo } = useContext(MainContext)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/users/login/', form)
        .then(resp => {
            setLoggedIn(true)
            setUserInfo(resp.data.user)
            setAlert({
                message: resp.data.message,
                status: 'success'
            })
            


            setTimeout(() => {
                if(resp.data.user.role === 1)
                    return navigate('/admin')

                navigate('/homepage')
            }, 1000)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }

  return (
   <>
   
   <div className="mainScreen">
<div className="mainDiv">

<div className="left">
    <div className="phoneImage"><img src="https://images-eu.ssl-images-amazon.com/images/I/71AvQd3VzqL._AC._SR360,460.jpg" alt="" /></div>
</div>
<div className="right">


<div className="formDiv">
  <div className="loginLogo">
    <img src="https://i.ibb.co/VTkxXx1/3ad0ded6721d4729af7b851c50f7f8d1-1.png" alt="none" />
  </div>
  {alert.message && (
                <div className={'alert alert-' + alert.status}>
                {alert.message}
                </div>
            )}
<form className='loginForm' onSubmit={handleSubmit}>
<input type="email" name="email" className="inputs"  placeholder="email" onChange={handleForm}/>
<input type="password" name="password" className="inputs"  placeholder="Password"  onChange={handleForm}/>
<button className='loginBttn'>Logg in</button>

</form>


</div>
<div className="regDiv">
    <p className="regText">Don't have an account? <span className="regSpan">Register</span></p>
</div>

</div>


</div>



   </div>
   
   </>
  )
}

