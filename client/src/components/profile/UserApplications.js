import React, { useEffect, useState } from 'react';
import { setApplications } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';
import UserApplicationItem from './components/UserApplicationItem';
import 'styles/profile/UserApplications.scss';
import { AdvertisementsByUserId } from 'apis/advertisement';

export default function UserApplications() {
   const dispatch = useDispatch();
   const [applyedAds, setApplyedAds] = useState({ advertisements: [], applications: [] });
   const { applications } = useSelector((state) => state.userStore);

   useEffect(() => {
      AdvertisementsByUserId(JSON.parse(localStorage.getItem('user'))._id)
         .then((advertisements) => {
            setApplyedAds(advertisements);
            console.log('object :>> ', advertisements);
            // Process the fetched advertisements
         })
         .catch((error) => {
            console.error(error);
            // Handle the error
         });
   }, []);

   return (
      <div className="content-box">
         {applyedAds.advertisements.map((advertise, index) => {
            return (
               <div>
                  <UserApplicationItem
                     key={index}
                     advertise={advertise}
                     application={
                        applyedAds.applications.filter(
                           (item) => item.advertisementId == advertise._id
                        )[0]
                     }
                  />
               </div>
            );
         })}
      </div>
   );
}
