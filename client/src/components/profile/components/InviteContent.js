import React, { useEffect, useState } from 'react';
import { getAdvertisementById } from 'apis/advertisement';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
export default function InviteContent({ Application }) {
   const [advertisement, setAdvertisement] = useState({});
   const getAdvertisement = () => {
      let adPromis = getAdvertisementById(Application.advertisementId);
      toast.promise(adPromis, {
         loading: 'İşlem Yapılıyor...',
         success: 'İşlemi başarılı...!',
         error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
      });

      adPromis.then((res) => {
         setAdvertisement(res);
      });
   };

   useEffect(() => {
      getAdvertisement();
   }, []);

   return (
      <div>
         <Toaster position="top-center" reverseOrder={false}></Toaster>
         <div className="ad-info-box">
            <h2>{advertisement.title}</h2>
            <div>{advertisement.description}</div>
            <div>
               <h4>Gereksinimler</h4>
               <ul>
                  {advertisement.requirement?.map((value) => {
                     return <li key={value}>{value}</li>;
                  }) || ''}
               </ul>
            </div>
            <div>
               <h4>Sorular</h4>
               <ul>
                  {advertisement.custom_question?.map((value) => {
                     return <li key={value}>{value}</li>;
                  }) || ''}
               </ul>
            </div>
            <div className="ap-button-group">
               <Link to={`/interview/${Application._id}`}>Mülakata katıl</Link>
            </div>
         </div>
      </div>
   );
}
