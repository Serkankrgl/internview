import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';
import UserApplicationItem from './components/UserApplicationItem';
import 'styles/profile/UserApplications.scss';
export default function UserApplications() {
   const dispatch = useDispatch();

   const { applications } = useSelector((state) => state.userStore);
   return (
      <div className="content-box">
         {applications.map((application, index) => {
            return (
               <div>
                  <UserApplicationItem key={index} application={application} />
               </div>
            );
         })}
      </div>
   );
}
