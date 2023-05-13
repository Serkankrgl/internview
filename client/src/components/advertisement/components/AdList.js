import React, { useEffect } from 'react';
import AdListItem from './AdListItem';
import { listAds } from 'apis/advertisement';
import { setListOfAds } from 'stores/advertisementStore';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
export default function AdList() {
   const dispatch = useDispatch();
   const { advertisement } = useSelector((state) => state.advertisement);
   useEffect(() => {
      console.log('tell me why? :>> ');

      let listAdsPromise = listAds({});
      toast.promise(listAdsPromise, {
         loading: 'Loading ...',
         error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
      });
      listAdsPromise.then((res) => {
         console.log('datas :>> ', res);
         dispatch(setListOfAds(res));
      });
   }, []);
   return (
      <div className="container">
         <Toaster position="top-center" reverseOrder={false}></Toaster>

         <div className="flex-container">
            {advertisement.map((Item) => {
               return <AdListItem key={Item._id} ad={Item} />;
            })}
         </div>
      </div>
   );
}
