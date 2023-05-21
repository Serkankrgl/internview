import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import 'styles/advertisement/Apply.scss';
import { createApplication } from 'apis/application';
import toast, { Toaster } from 'react-hot-toast';
export default function Apply() {
   const [application, setApplication] = useState({
      advertisementId: '',
      userId: '',
      fullName: '',
      custom_question: []
   });

   const { adToApply } = useSelector((state) => state.advertisement);

   const updateCustomQuestion = (index, value) => {
      setApplication((prevApplication) => {
         const updatedCustomQuestion = [...prevApplication.custom_question];
         updatedCustomQuestion[index] = {
            question: adToApply.custom_question[index],
            answer: value
         };
         return {
            ...prevApplication,
            custom_question: updatedCustomQuestion
         };
      });
   };
   const complateAplication = () => {
      application.advertisementId = adToApply._id;
      let promise = createApplication(application);
      toast.promise(promise, {
         loading: 'Başvuru tamamlanıyor...',
         success: 'Başvuru Başarılı...!',
         error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
      });

      promise.then((res) => {
         navigate('/advertisement');
      });
   };

   return (
      <div>
         <Toaster position="top-center" reverseOrder={false}></Toaster>

         <div className="flex-div">
            <div className="flex-l">
               <h2>{adToApply.title}</h2>
               <div>
                  <h4>
                     <a href={adToApply.companyURL}>{adToApply.company}</a>
                  </h4>
                  <p>{adToApply.company_info}</p>
               </div>
               <div>
                  <h4>İlan Açıklaması</h4>
                  <p>{adToApply.description}</p>
               </div>
               <div>
                  <h4>Aranan Özellikler</h4>
                  <ul>
                     {adToApply?.requirement?.map((req, index) => <li key={index}>{req}</li>) || ''}
                  </ul>
               </div>
               <button onClick={complateAplication}>Başvuruyu tamamla</button>
               <button>Geri Dön</button>
            </div>
            <div className="flex-r">
               <div>
                  {adToApply?.custom_question.map((cq, index) => (
                     <div key={index}>
                        <p>{cq}</p>
                        <input
                           value={application.custom_question[index]?.answer || ''}
                           onChange={(e) => updateCustomQuestion(index, e.target.value)}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
