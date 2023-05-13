import { loginUser } from 'apis/auth';
import axios from 'axios';
import { isContainWhiteSpace, isEmail, isEmpty, isLength } from 'helper/validator';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import 'styles/Auth.scss';

export default function Login(props) {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({});
   const [errors, setErrors] = useState({});
   const [formSubmitted, setFormSubmitted] = useState(false);

   const handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      formData[name] = value;

      setFormData(formData);
   };

   const validateLoginForm = (e) => {
      let errors = {};

      if (isEmpty(formData.email)) {
         errors.email = 'Email boş bırakılamaz';
      } else if (!isEmail(formData.email)) {
         errors.email = 'Lütfen geçerli bir mail adresi giriniz';
      }

      if (isEmpty(formData.password)) {
         errors.password = 'Şifre boş bırakılamaz';
      } else if (isContainWhiteSpace(formData.password)) {
         errors.password = 'Şifre boşluk karakteri içeremez';
      } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
         errors.password = 'Şifre 6-16 karakterden oluşmalıdır.';
      }

      if (isEmpty(errors)) {
         return true;
      } else {
         return errors;
      }
   };

   const login = (e) => {
      e.preventDefault();

      let errors = validateLoginForm();

      if (errors === true) {
         let loginPromise = loginUser(formData);
         toast.promise(loginPromise, {
            loading: 'Kontrol ediliyor...',
            success: 'Giriş işlemi başarılı...!',
            error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
         });
         loginPromise.then((res) => {
            let { _id, tokens } = res.data;
            localStorage.setItem('access_token', tokens.access_token);
            localStorage.setItem('refresh_token', tokens.refresh_token);
            localStorage.setItem('user_id', _id);
            navigate('/');
         });
      } else {
         setErrors(errors);
         setFormSubmitted(true);
      }
   };
   return (
      <>
         <Toaster position="top-center" reverseOrder={false}></Toaster>

         <div className="auth-container ">
            <div className="auth-form-container">
               <h2>Giriş Yap</h2>
               <form className="custom-form" onSubmit={login}>
                  <label htmlFor="email">Email</label>
                  <input
                     onChange={handleInputChange}
                     type="text"
                     placeholder="internview@gmail.com"
                     id="email"
                     name="email"
                  />
                  {errors.email && <small className="small-hint">{errors.email}</small>}
                  <label htmlFor="password">Şifre</label>
                  <input
                     className={formSubmitted ? (errors.email ? 'error' : 'success') : null}
                     onChange={handleInputChange}
                     type="password"
                     placeholder="********"
                     id="password"
                     name="password"
                  />
                  {errors.password && <small className="small-hint">{errors.password}</small>}
                  <button type="submit">Giriş Yap</button>
               </form>
               <Link to="/auth/register" className="link-btn">
                  Hesabın yok mu? Kayıt ol!!!
               </Link>
            </div>
         </div>
      </>
   );
}
