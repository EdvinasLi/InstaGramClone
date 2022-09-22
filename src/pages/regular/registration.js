import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './registration.css'

export default function Registration() {

    const navigate = useNavigate()


    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        image: ''
    })
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })
    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        for (const key in form) {
            formData.append(key, form[key])
        }
        axios.post('/api/users/register/', formData)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                window.scrollTo(0, 0)

                setTimeout(() => navigate('/'), 1000)
            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }
    return (
        <div className='mainBody'>

            <div className="regTable">

                <div className="regForm">
                    <span className="logo">
                        <img src="https://i.ibb.co/VTkxXx1/3ad0ded6721d4729af7b851c50f7f8d1-1.png" alt="logo" />
                    </span>

                    <form onSubmit={(e) => handleSubmit(e)} className='regForm'>
                        <input type="text" name="first_name" className="input" onChange={(e) => handleForm(e)} placeholder="Vardas" />
                        <input type="text" name="last_name" className="input" onChange={(e) => handleForm(e)} placeholder="Pavardė" />
                        <input type="text" name="email" className="input" onChange={(e) => handleForm(e)} placeholder="El paštas" />
                        <input type="text" name="password" className="input" onChange={(e) => handleForm(e)} placeholder="Slaptažodis" />
                        <label> Profilio nuotrauka</label>
                        <input type="file" name="image" onChange={(e) => handleForm(e)} />

                        <button>Registruotis</button>


                    </form>


                </div>
                <div className="loginTable">
                    <p> Jau turite paskyrą? <Link to='/'> Jungtis!</Link></p>
                </div>



            </div>



        </div>
    )
}
