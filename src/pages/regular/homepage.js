import React from 'react'
import './homepage.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Homepage() {

  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [keyword, setKeyword] = useState('')
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    axios.get('/api/posts/')
      .then(resp => {
        setPosts(resp.data)
      })
      .catch(error => {
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
      })
  }, [refresh])

  useEffect(() => {
    axios.get('/api/users/')
      .then(resp => {
        setUsers(resp.data)
      })
      .catch(error => {
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
      })
  }, [])


  const handleSearch = (e) => {
    e.preventDefault()

    if (keyword === '')
      return setRefresh(!refresh)

    axios.get('/api/posts/search/' + keyword)
      .then(resp => {
        setPosts(resp.data)
      })
      .catch(error => {
        console.log(error)
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
        window.scrollTo(0, 0)
      })
      .finally(() => {
        setTimeout(() => setAlert({
          message: '',
          status: ''
        }), 3000)
      })
  }


  return (
    <div className="mainBody">

      <div class="parent">
        <div class="userList">


          {users.map(user =>
            <div class="user"> <span><img src={user.image} alt="none" /></span>
              <span><p> {user.first_name}</p></span></div>)}


        </div>
        <div class="postArea">



          <div className="articles">
            {posts.length > 0 && posts.map(article => {
              return (
                <div key={article.id} className="box">
                  <Link to={'/post/' + article.id} className="article-link">
                    <span className="postUser">
                      <img src={article.user.image} alt="" className='articleImage' />
                      <p>
                        {article.user.first_name + ' ' + article.user.last_name}</p></span>

                  </Link>
                  <div className="image">
                    <Link to={'/post/' + article.id}>
                      <img src={article.image} alt={article.title} />
                    </Link>
                  </div>
                  <div className="controls">
                    <div className="date">
                      <em>{new Date(article.createdAt).toLocaleDateString('lt-LT')}</em>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>





        </div>
        <div class="randomUser"> <p> Suggested</p></div>
      </div>


    </div>
  )
}
