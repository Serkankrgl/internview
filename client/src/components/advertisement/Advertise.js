import React, { useState, useRef } from 'react';
import plussvg from 'assets/plus.svg';
import { createAd } from 'apis/advertisement';
import { useNavigate } from 'react-router';

export default function Advertise() {
   const [formData, setFormData] = useState({
      title: null,
      company: null,
      companyURL: null,
      company_info: null,
      location: null,
      role: null,
      seniority: null,
      employment_type: null,
      description: null,
      requirement: [],
      custom_question: [],
      problem: []
   });
   const [formx, setFormx] = useState([]);
   const navigate = useNavigate();
   const requirementRef = useRef(null);
   const customQuestionRef = useRef(null);
   const problemRef = useRef(null);

   const handleFormDataChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      formData[name] = value;
      setFormData(formData);
   };
   const AddRequirement = () => {
      const newRequirement = [...formData.requirement, requirementRef.current.value];

      formData.requirement = newRequirement;
      setFormData(formData);
      setFormx(newRequirement);
      requirementRef.current.value = '';
      console.log('formData :>> ', formData);
   };
   const removeRequirement = (index) => {
      const newRequirement = [...formData.requirement];
      newRequirement.splice(index, 1);

      setFormData((prevFormData) => ({
         ...prevFormData,
         requirement: newRequirement
      }));
   };

   const AddCustomQuestion = () => {
      const newCustomQuestion = [...formData.custom_question, customQuestionRef.current.value];

      formData.custom_question = newCustomQuestion;
      setFormData(formData);
      setFormx(newCustomQuestion);
      customQuestionRef.current.value = '';
      console.log('formData :>> ', formData);
   };
   const AddProblem = () => {
      const newProblem = [
         ...formData.problem,
         { value: problemRef.current.value, text: problemRef.current.selectedOptions[0].text }
      ];
      formData.problem = newProblem;
      setFormData(formData);
      setFormx(newProblem);
      problemRef.current.value = '0';
   };
   const removeCustomQuestion = (index) => {
      const newCustomQuestions = [...formData.custom_question];
      newCustomQuestions.splice(index, 1);

      setFormData((prevFormData) => ({
         ...prevFormData,
         custom_question: newCustomQuestions
      }));
   };

   const Advertise = (e) => {
      e.preventDefault();
      createAd(formData);
      navigate('/advertisement');
   };

   return (
      <>
         {' '}
         <div className="advertise-container">
            <div>
               <h2>İlan Ver</h2>
               <form className="advertise-container-form" onSubmit={Advertise}>
                  <div className="advertise-container-form-group child1">
                     <label htmlFor="title">İlan Başlığı</label>
                     <input type="text" name="title" onChange={handleFormDataChange} />

                     <label htmlFor="description">İş Tanımı</label>
                     <textarea
                        type="text"
                        name="description"
                        onChange={handleFormDataChange}></textarea>

                     <label htmlFor="location">Konum</label>
                     <input type="text" name="location" onChange={handleFormDataChange} />

                     <label htmlFor="role">Rol</label>
                     <input type="text" name="role" onChange={handleFormDataChange} />

                     <label htmlFor="seniority">Kıdem</label>
                     <input type="text" name="seniority" onChange={handleFormDataChange} />

                     <label htmlFor="employment_type">İstihdam Türü</label>
                     <input type="text" name="employment_type" onChange={handleFormDataChange} />
                  </div>

                  <div className="advertise-container-form-group child2">
                     <label htmlFor="company">Şirket İsmi</label>
                     <input type="text" name="company" onChange={handleFormDataChange} />

                     <label htmlFor="company_site">Şirketin Sitesi</label>
                     <input type="text" name="company_site" onChange={handleFormDataChange} />

                     <label htmlFor="company_info">Şirketin Hakkında</label>
                     <textarea
                        type="text"
                        name="company_info"
                        onChange={handleFormDataChange}></textarea>

                     <button type="submit">Kaydet</button>
                  </div>

                  <div className="advertise-container-form-group w-30">
                     <div className="input-group">
                        <input
                           placeholder="Gereksinim Ekle"
                           className="input-container"
                           ref={requirementRef}
                           name="requirement"
                        />
                        <button onClick={AddRequirement} type="button">
                           <img src={plussvg} alt="React Logo" />
                        </button>
                     </div>
                     <ul>
                        {Object.entries(formData.requirement).map((Item, index) => {
                           return (
                              <li key={'R' + index}>
                                 <p>{Item[1]} </p>
                                 <button
                                    onClick={() => {
                                       removeRequirement(index);
                                    }}>
                                    Sil
                                 </button>
                              </li>
                           );
                        })}
                     </ul>
                  </div>
                  <div className="advertise-container-form-group w-30">
                     <div className="input-group">
                        <input
                           placeholder="Soru Ekle"
                           className="input-container"
                           ref={customQuestionRef}
                           name="custom_question"
                        />
                        <button onClick={AddCustomQuestion} type="button">
                           <img src={plussvg} alt="React Logo" />
                        </button>
                     </div>
                     <ul>
                        {Object.entries(formData.custom_question).map((Item, index) => {
                           return (
                              <li key={'C' + index}>
                                 <p>{Item[1]} </p>
                                 <button onClick={() => removeCustomQuestion(index)}>Sil</button>
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}
