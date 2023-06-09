import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';
import { getAdsByOwnerId } from 'apis/advertisement';
import toast, { Toaster } from 'react-hot-toast';
import 'styles/profile/UserAdvertisement.scss';
import { Link, useNavigate } from 'react-router-dom';

export default function UserAdvertisement() {
   const navigate = useNavigate();
   const [pagedata, setPagedata] = useState([]);

   useEffect(() => {
      let promise = getAdsByOwnerId();
      toast.promise(promise, {
         loading: 'Veriler getiriliyor...',
         success: 'Başarılı...!',
         error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
      });
      promise.then((res) => {
         setPagedata(res);
      });
   }, []);

   const NavigateDetail = () => {};

   return (
      <>
         <Toaster position="top-center" reverseOrder={false} />
         <div className="wrapper">
            {Array.isArray(pagedata) && pagedata.length > 0 ? (
               pagedata.map((value, index) => (
                  <div className="ad-box" key={'A' + index}>
                     <div>
                        <h2>
                           {value.title}{' '}
                           <small>
                              <small>({value.company})</small>
                           </small>
                        </h2>
                        <small>
                           {value.employment_type}-{value.seniority}-{value.role}
                        </small>
                     </div>
                     <div>{value.description}</div>
                     <div>
                        <Link to={`/profile/UserAdvertisement/${value._id}`}>ilanı yönet</Link>
                     </div>
                  </div>
               ))
            ) : (
               <div class="container">
                  <div class="centered-text">
                     <h3>ilan Bulunamadı</h3>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}
