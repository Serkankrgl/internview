import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'styles/profile/SideBar.scss';
function SideBar() {
   return (
      <div className="sidebar">
         <ul>
            <Link to="/profile/Resume">
               <li>Özgeçmişler</li>
            </Link>
            <Link to="/profile/UserApplications">
               <li>Başvurularım</li>
            </Link>
            <Link to="/profile/UserAdvertisement">
               <li>İlanlarım</li>
            </Link>
            <Link to="/profile/Calender">
               <li>Takvimim</li>
            </Link>
         </ul>
      </div>
   );
}

function ProfileSideBar({ children }) {
   return (
      <div className="fix">
         <SideBar />
         <div className="content">{children}</div>
      </div>
   );
}

export default ProfileSideBar;
