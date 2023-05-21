import React, { useState, useEffect } from 'react';
import 'styles/profile/resume.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setResume } from 'stores/userStore';
import {
   ResumePersonal,
   ResumeEducation,
   ResumeExpreience,
   ResumeSkill,
   ResumeHobby,
   ResumeReferance,
   ResumeCertificate,
   ResumeTrophy
} from './components/ResumeComponents/ResumeIndex';
import toast, { Toaster } from 'react-hot-toast';
import { updateResume, getResumeById } from 'apis/userApis';

export default function Resume() {
   const dispatch = useDispatch();
   const [activeIndex, setActiveIndex] = useState(0);
   const [isLoading, setIsLoading] = useState(true); // Add isLoading state

   const handleNavigation = (index) => {
      setActiveIndex(index);
   };

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         console.log('object :>> ');
         await getResumeById().then((result) => {
            dispatch(setResume(result.resume));
            setIsLoading(false);
         });
      } catch (err) {
         console.log('err :>> ', err);
      }
   };
   const { resume } = useSelector((state) => state.userStore);
   const onSaved = () => {
      let resumeUpdatePromise = updateResume(resume);

      toast.promise(resumeUpdatePromise, {
         loading: 'kaydediliyor...',
         success: 'Kaydedildi',
         error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
      });

      resumeUpdatePromise.then((res) => {
         console.log('resumeSet :>> ', res);
         dispatch(setResume(res));
      });
   };

   const sections = [
      { title: 'Kişisel Bilgiler' },
      { title: 'Eğitim Bilgileri' },
      { title: 'Deneyim Bilgileri' },
      { title: 'Yetenekler' },
      { title: 'Hobiler' },
      { title: 'Referanslar' },
      { title: 'Sertifikalar' },
      { title: 'Başarımlar' }
   ];

   const activeSection = sections[activeIndex];

   return (
      <div className="resume-section">
         <Toaster position="top-center" reverseOrder={false}></Toaster>
         {isLoading ? (
            <div>Loading...</div> // Show loading message while data is being fetched
         ) : (
            <>
               <div className="resume">
                  {sections.map((section, index) => (
                     <button
                        key={index}
                        className={`resume_box ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleNavigation(index)}>
                        {section.title}
                     </button>
                  ))}
               </div>
               <div className="resume_content">
                  {0 == activeIndex && <ResumePersonal />}
                  {1 == activeIndex && <ResumeEducation />}
                  {2 == activeIndex && <ResumeExpreience />}
                  {3 == activeIndex && <ResumeSkill s />}
                  {4 == activeIndex && <ResumeHobby />}
                  {5 == activeIndex && <ResumeReferance />}
                  {6 == activeIndex && <ResumeCertificate />}
                  {7 == activeIndex && <ResumeTrophy />}

                  <div className="">
                     <div className="button-group">
                        <button
                           className="prevBtn"
                           type="button"
                           disabled={activeIndex === 0}
                           onClick={() => setActiveIndex(activeIndex - 1)}>
                           Geri
                        </button>
                        <button className="middleBtn" type="button" onClick={onSaved}>
                           Kaydet
                        </button>
                        <button
                           className="nextBtn"
                           type="button"
                           disabled={activeIndex === sections.length - 1}
                           onClick={() => setActiveIndex(activeIndex + 1)}>
                           İleri
                        </button>
                     </div>
                  </div>
               </div>{' '}
            </>
         )}
      </div>
   );
}
