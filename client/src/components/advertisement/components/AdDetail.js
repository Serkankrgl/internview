import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedAd, setAdToApply } from 'stores/advertisementStore';
import hrIcon from 'assets/hr.svg';
export default function AdDetail() {
   const { selectedAd } = useSelector((state) => state.advertisement);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   //Component Did Unmount
   useEffect(() => () => closeDrawer(), []);
   const closeDrawer = () => {
      dispatch(setSelectedAd({}));
   };

   const apply = () => {
      dispatch(setAdToApply(selectedAd));
      navigate('/advertisement/apply');
   };
   return (
      <>
         <div className="detail-container">
            <div className="detail-header">
               <div className="icon">
                  <img className="svg" src={hrIcon} alt="React Logo" />
               </div>
               <span className="title">
                  <h2>{selectedAd.title}</h2>
                  <small>
                     <a href={selectedAd.companyURL}>{selectedAd.company}</a>
                  </small>
               </span>
            </div>
            <hr />

            <div className="detail-content">
               <div className="content-table-item">
                  <b>Kıdem:</b> {selectedAd.seniority}
               </div>
               <div className="content-table-item">
                  <b>İstihdam türü:</b> {selectedAd.employment_type}
               </div>
               <div className="content-table-item">
                  <b>Görev tanımı:</b> {selectedAd.role}
               </div>
               <hr />
               {selectedAd.description && (
                  <div className="detail-content-desc">
                     <div>
                        <b>İlan Açıklaması</b>
                        <hr />
                     </div>
                     {selectedAd.description}
                  </div>
               )}
               <hr />
               {selectedAd.requirement && (
                  <div className="detail-content-req">
                     <div>
                        <b>Aranan Özellikler</b>
                        <hr />
                     </div>
                     {selectedAd.requirement.map((req, index) => {
                        return (
                           <>
                              <p key={'R+' + index}>
                                 {'* '}
                                 {req}
                              </p>
                           </>
                        );
                     })}
                  </div>
               )}
               <hr />
               {selectedAd.company_info && (
                  <div className="detail-content-comp-info">
                     <div>
                        <b>Şirektimiz Hakkında</b>
                        <hr />
                     </div>
                     {selectedAd.company_info}
                  </div>
               )}
               <hr />
               {selectedAd.custom_question && (
                  <div className="detail-content-comp-info">
                     <div>
                        <b>Sorular</b>
                        <hr />
                     </div>
                     {selectedAd.custom_question.map((question, index) => {
                        return (
                           <>
                              <p>* {question}</p>
                           </>
                        );
                     })}
                  </div>
               )}
            </div>
            <div className="detail-footer">
               <button className="btn" onClick={apply}>
                  Başvur
               </button>
               <button className="btn" onClick={closeDrawer}>
                  Kapat
               </button>
            </div>
         </div>
      </>
   );
}
