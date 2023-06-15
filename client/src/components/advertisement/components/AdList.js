import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import AdListItem from './AdListItem';
import { listAds } from 'apis/advertisement';
import { setListOfAds } from 'stores/advertisementStore';

export default function AdList() {
   const dispatch = useDispatch();
   const { advertisement } = useSelector((state) => state.advertisement);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchAds = async () => {
         try {
            const res = await listAds({});
            dispatch(setListOfAds(res));
            setIsLoading(false);
         } catch (err) {
            console.error(err);
            setIsLoading(false);
            toast.error(err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti');
         }
      };

      fetchAds();
   }, [dispatch]);

   return (
      <div className="container">
         <Toaster position="top-center" reverseOrder={false} />

         <div className="flex-container">
            {!isLoading ? (
               advertisement?.length > 0 ? (
                  advertisement?.map((item) => <AdListItem key={item._id} ad={item} />)
               ) : (
                  <div>Henüz bir ilan bulunmuyor.</div>
               )
            ) : (
               <div>Loading...</div>
            )}
         </div>
      </div>
   );
}
