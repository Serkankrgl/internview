import React, { useEffect, useState } from 'react';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'styles/profile/ResumePdf.scss';
import { getResumeById } from 'apis/userApis';
import { useParams } from 'react-router';

export default function PDFRender() {
   const { resumeId } = useParams();
   const [resume, setResume] = useState({});

   const [isLoading, setIsLoading] = useState(true); // Add isLoading state
   useEffect(() => {
      fetchData();
      console.log('resume :>> ', resume);
   }, []);

   const fetchData = async () => {
      try {
         console.log('object :>> ');
         await getResumeById(resumeId).then((result) => {
            setResume(result.resume);
            setIsLoading(false);
         });
      } catch (err) {
         console.log('err :>> ', err);
      }
   };

   const handleDownload = async () => {
      const pdf = new JsPDF();
      const input = document.getElementById('pdf-content');

      html2canvas(input, {
         scale: 2, // Ölçeklendirme değeri (örneğin, 2 olarak ayarlanmıştır)
         useCORS: true, // CORS hatasını önlemek için CORS kullanımını etkinleştirin
         scrollX: 0, // Yatay kaydırmayı sıfırla
         scrollY: 0, // Dikey kaydırmayı sıfırla
         windowWidth: document.documentElement.offsetWidth / 2, // Pencere genişliğini ayarla
         windowHeight: document.documentElement.offsetHeight / 2 // Pencere yüksekliğini ayarla
      }).then((canvas) => {
         const imgData = canvas.toDataURL('image/png');
         const imgProps = pdf.getImageProperties(imgData);
         const pdfWidth = pdf.internal.pageSize.getWidth();
         const pdfHeight = pdf.internal.pageSize.getHeight();

         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
         pdf.save('my_document.pdf');
      });
   };

   return (
      <div>
         <button className="download-btn" onClick={handleDownload}>
            Download PDF
         </button>
         <div id="pdf-content" className="hidden" style={{ color: 'black' }}>
            {isLoading ? (
               <div>Loading...</div> // Show loading message while data is being fetched
            ) : (
               <div class="resume-container">
                  <div>
                     {' '}
                     <h1 class="resume-titlefull-name">{resume.full_name}</h1>
                     <h6 class="phone">
                        {resume.phone}
                        {' - '}
                        {resume.email}
                     </h6>
                     <h3 class="email">Hakkimda</h3>
                     <p class="about-me">{resume.about_me}</p>
                  </div>
                  <div class="skill-items">
                     <h3>Yetenekler</h3>
                     {resume.skills?.map((skill) => {
                        return <div class="skill-item">{skill}</div>;
                     })}
                  </div>
                  <div class="education-items">
                     <h3>Eğitim Durumu</h3>
                     {resume.educations?.map((edu) => {
                        return (
                           <div class="education-item">
                              <span class="school-name">{edu.school_name}</span>
                              <small class="date">
                                 {' '}
                                 ({edu.start_date} -{' '}
                                 {edu.is_current ? 'Devam ediyor' : edu.end_date})
                              </small>
                           </div>
                        );
                     })}
                  </div>
                  <div class="hobby-items">
                     <h3>Hobiler</h3>
                     {resume.hobbies?.map((hobby) => {
                        return <div class="hobby-item">{hobby}</div>;
                     })}
                  </div>

                  <div class="experience-items">
                     <h3>Deneyim</h3>
                     {resume.experiences?.map((exp) => {
                        return (
                           <div class="experience-item">
                              <span class="company-name">{exp.company_name}</span>
                              <span class="company-info">{exp.company_info}</span>
                              <small class="date">
                                 {exp.start_date} - {exp.is_current ? 'Devam ediyor' : exp.end_date}
                              </small>
                           </div>
                        );
                     })}
                  </div>

                  <div class="reference-items">
                     <h3>Referanslar</h3>
                     {resume.referances?.map((ref) => {
                        return (
                           <div class="reference-item">
                              <div class="ref-info">
                                 <span class="full-name">{ref.full_name}</span>
                                 <small class="title">({ref.title})</small>
                              </div>
                              <div class="contact-info">
                                 <span class="email">{ref.email}</span>
                              </div>
                              <div class="contact-info">
                                 <span class="phone">{ref.phone}</span>
                              </div>
                           </div>
                        );
                     })}
                  </div>

                  <div class="certificate-items">
                     <h3>Sertifikalar</h3>
                     {resume.certificates?.map((cert) => {
                        return (
                           <div class="certificate-item">
                              <div class="cert-info">
                                 <span class="name">{cert.name}</span>
                                 <small class="agency">({cert.agency})</small>
                              </div>
                              <div class="cert-identity">
                                 Sertifika Kimliği: {cert.certificate_identity}
                              </div>
                           </div>
                        );
                     })}
                  </div>
                  <div></div>
                  <div class="trophy-items">
                     <h3>Başarımlar</h3>
                     {resume.trophies?.map((trop) => {
                        return (
                           <div class="trophy-item">
                              <span class="name">{trop.name}</span>
                              <div class="info">{trop.info}</div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
