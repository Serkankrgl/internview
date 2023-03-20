import { registerUser } from 'apis/auth'
import {
   isContainWhiteSpace,
   isEmail,
   isEmpty,
   isLength,
} from 'helper/validator'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import 'styles/Auth.scss'

const Register = (props) => {
   const navigate = useNavigate()
   const [formData, setFormData] = useState({})
   const [errors, setErrors] = useState({})
   const [formSubmitted, setFormSubmitted] = useState(false)

   const handleInputChange = (event) => {
      const target = event.target
      const value = target.value
      const name = target.name

      formData[name] = value

      setFormData(formData)
   }
   const validateLoginForm = (e) => {
      let errors = {}

      if (isEmpty(formData.full_name)) {
         errors.full_name = 'Ad soyad boş bırakılamaz.'
      }

      //Email Validation
      if (isEmpty(formData.email)) {
         errors.email = 'Email boş bırakılamaz.'
      } else if (!isEmail(formData.email)) {
         errors.email = 'Lütfen geçerli bir mail adresi giriniz.'
      }
      //Password Validation
      if (isEmpty(formData.password)) {
         errors.password = 'Şifre boş bırakılamaz'
      } else if (isContainWhiteSpace(formData.password)) {
         errors.password = 'Şifre boşluk karakteri içeremez.'
      } else if (
         !isLength(formData.password, { gte: 6, lte: 16, trim: true })
      ) {
         errors.password = 'Şifre 6-16 karakterden oluşmalıdır.'
      }

      if (isEmpty(errors)) {
         return true
      } else {
         return errors
      }
   }

   const register = (e) => {
      e.preventDefault()

      let errors = validateLoginForm()

      if (errors === true) {
         let registerPromis = registerUser(formData)
         toast.promise(registerPromis, {
            loading: 'Oluşturuluyor...',
            success: <b>Kayıt Başarıyla oluşturuldu.</b>,
            error: (err) =>
               err?.response?.data?.msg ?? 'Bir şeyler ynalış gitti.',
         })
         registerPromis.then(() => {
            navigate('/auth/login')
         })
      } else {
         setErrors(errors)
         setFormSubmitted(true)
      }
   }

   return (
      <>
         <Toaster position="top-center" reverseOrder={false}></Toaster>
         <div className="Container">
            <div className="auth-form-container">
               <h2>Kayıt Ol</h2>
               <form className="custom-form" onSubmit={register}>
                  <label htmlFor="name">Ad Soyad</label>
                  <input
                     name="full_name"
                     onChange={handleInputChange}
                     id="name"
                     placeholder="full Name"
                  />
                  {errors.full_name && (
                     <small className="small-hint">{errors.full_name}</small>
                  )}
                  <label htmlFor="email">Email</label>
                  <input
                     onChange={handleInputChange}
                     type="text"
                     placeholder="internview@gmail.com"
                     id="email"
                     name="email"
                  />
                  {errors.email && (
                     <small className="small-hint">{errors.email}</small>
                  )}
                  <label htmlFor="password">Şifre</label>
                  <input
                     onChange={handleInputChange}
                     type="password"
                     placeholder="********"
                     id="password"
                     name="password"
                  />
                  {errors.password && (
                     <small className="small-hint">{errors.password}</small>
                  )}
                  <button type="submit">Kayıt Ol</button>
               </form>
               <Link to="/auth/login" className="link-btn">
                  Hesabın var mı? Giriş Yap!!!
               </Link>
            </div>
         </div>
      </>
   )
}

export default Register
