import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
axios.defaults.baseURL = 'http://localhost:3001/'
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
   (request) => {
      console.log(request)
      // Edit request config
      return request
   },
   (error) => {
      console.log(error)
      return Promise.reject(error)
   }
)

axios.interceptors.response.use(
   (response) => {
      console.log(response)
      // Edit response config
      return response
   },
   (error) => {
      console.log(error)
      return Promise.reject(error)
   }
)

function BackGround() {
   return (
      <div>
         <div className="line"></div>
         <div className="line"></div>
         <div className="line"></div>
      </div>
   )
}
ReactDOM.render(
   <>
      <BackGround />
      <App />
   </>,
   document.getElementById('root')
)
