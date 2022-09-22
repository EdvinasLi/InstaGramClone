import React from 'react'
import './homepage.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcSharpIcon from '@mui/icons-material/MapsUgcSharp';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
export default function Homepage() {
  const [comment, setComment] = useState('')
  const [getpost, setGetpost] = useState({})
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])

  const [users, setUsers] = useState([])
  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [keyword, setKeyword] = useState('')
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()
  let commentCounter = 0

  const { id } = useParams();





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
  }, [refresh, comment])

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

  useEffect(() => {
    axios.get('/api/likes/')
      .then(resp => {
        setLikes(resp.data)
      })
      .catch(error => {
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
      })
  }, [refresh])

  const handleLikes = (e, id) => {
    e.preventDefault()
    axios.post('/api/likes/' + id, { like: true })
      .then(resp => {
        setRefresh(!refresh)
      })
      .catch(error => {
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
      })
  }


  const handleForm = (e, id) => {
    e.preventDefault()

    axios.post('/api/comments/', { comment, postId: id })
      .then(resp => {

        setComment('')

        setRefresh(!refresh)

        setTimeout(() => setAlert({
          message: '',
          status: ''
        }), 2000)
      })
      .catch(error => {
        console.log(error)
        setAlert({
          message: error.response.data,
          status: 'danger'
        })

        if (error.response.status === 401)
          setTimeout(() => navigate('/'), 2000)
      })
  }




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
                  <div className='Likes'>
                    {likes.map(like => {
                      return <span>{like.total_likes}</span>
                    })}
                    <span className='icons1'><FavoriteBorderIcon onClick={(e) => handleLikes(e, article.id)} />
                      <MapsUgcSharpIcon className='heart' />
                      <NearMeOutlinedIcon /></span>
                    <span className='icons2'><BookmarkBorderOutlinedIcon /></span>

                  </div>
                  <div className="controls">

                  </div>
                  <div className="comment">

                    <span className="comments">   {article.comments.map(entry => {
                      commentCounter++

                      if (commentCounter > 3)
                        return


                      return (
                        <>
                          {/* <span className="commentDisplay">
                            <strong className="date d-block">{ }</strong>
                            <em className="user-name"></em>
                          </span> */}

                          <div style={{ whiteSpace: "pre-line" }}>
                            {entry.comment}
                          </div>
                        </>
                      )
                    }
                    )}
                    </span>











                    <div className="commentInput">
                      <form className='pou' onSubmit={(e) => handleForm(e, article.id)}>

                        <textarea name='commentArea' placeholder='Rasyti komentara' onChange={(e) => setComment(e.target.value)} /> <button>Siusti</button>
                      </form>

                    </div>
                    .


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
