import React, { useState, useEffect } from 'react';
import 'styles/profile/Calender.scss';
import { getApplicationsByUserId } from 'apis/application';
import toast, { Toaster } from 'react-hot-toast';
import InviteContent from './components/InviteContent';
const Calendar = () => {
   // State for the selected date
   const [selectedDate, setSelectedDate] = useState(new Date());
   const [myApplications, setMyApplications] = useState([]);
   const [filteredApplications, setFilteredApplications] = useState([]);
   // Helper function to generate an array of days for a given month
   const generateDays = (year, month) => {
      const days = [];
      const date = new Date(
         year || selectedDate.getFullYear(),
         month || selectedDate.getMonth(),
         1
      );

      while (date.getMonth() === (month || selectedDate.getMonth())) {
         days.push(new Date(date));
         date.setDate(date.getDate() + 1);
      }
      return days;
   };

   // Generate an array of days for the current month
   const days = generateDays(selectedDate.getFullYear(), selectedDate.getMonth());

   // Format the date for display
   const formattedDate = selectedDate.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
   });

   const getApplications = () => {
      let AppPromise = getApplicationsByUserId(JSON.parse(localStorage.getItem('user'))._id);
      toast.promise(AppPromise, {
         loading: 'İşlem Yapılıyor...',
         success: 'İşlemi başarılı...!',
         error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
      });
      AppPromise.then((res) => {
         setMyApplications(res);
         const xdate = selectedDate ? selectedDate : new Date();
         const day = xdate.getDate().toString().padStart(2, '0');
         const month = (xdate.getMonth() + 1).toString().padStart(2, '0');
         const year = xdate.getFullYear().toString();

         // Format the date as "DD/MM/YYYY"
         const formattedDate = `${day}/${month}/${year}`;
         const _filteredApplications = myApplications.filter((item) => {
            if (!item.interviewDate) {
               return false;
            }
            return item.interviewDate == formattedDate;
         });
         console.log('_filteredApplications :>> ', myApplications);
         setFilteredApplications(_filteredApplications);
      });
   };
   useEffect(() => {
      getApplications();
   }, []);

   useEffect(() => {
      const xdate = selectedDate ? selectedDate : new Date();
      const day = xdate.getDate().toString().padStart(2, '0');
      const month = (xdate.getMonth() + 1).toString().padStart(2, '0');
      const year = xdate.getFullYear().toString();

      // Format the date as "DD/MM/YYYY"
      const formattedDate = `${day}/${month}/${year}`;
      const _filteredApplications = myApplications.filter((item) => {
         if (!item.interviewDate) {
            return false;
         }
         return item.interviewDate == formattedDate;
      });
      setFilteredApplications(_filteredApplications);
   }, [selectedDate, myApplications]);

   return (
      <>
         <div className="calendar">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="header">
               <button
                  onClick={() =>
                     setSelectedDate(
                        new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
                     )
                  }>
                  &lt;
               </button>
               <h2>{formattedDate}</h2>
               <button
                  onClick={() =>
                     setSelectedDate(
                        new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
                     )
                  }>
                  &gt;
               </button>
            </div>
            <table>
               <thead>
                  <tr>
                     <th>Pzt</th>
                     <th>Sal</th>
                     <th>Çar</th>
                     <th>Per</th>
                     <th>Cum</th>
                     <th>Cmt</th>
                     <th>Paz</th>
                  </tr>
               </thead>
               <tbody>
                  {days.map((day, index) => {
                     if (index % 7 === 0) {
                        return (
                           <tr key={day}>
                              {Array.from({ length: 7 }).map((_, i) => {
                                 const datex = days[index + i];
                                 if (datex) {
                                    return (
                                       <td
                                          key={index + i}
                                          className={
                                             datex.getMonth() === selectedDate.getMonth()
                                                ? 'active'
                                                : 'inactive'
                                          }
                                          onClick={() => setSelectedDate(datex)}>
                                          {datex.getDate()}
                                       </td>
                                    );
                                 } else {
                                    return <td key={index + i}></td>;
                                 }
                              })}
                           </tr>
                        );
                     }
                     return null;
                  })}
               </tbody>
            </table>
         </div>
         <div>
            {filteredApplications.map((item, index) => {
               return <InviteContent key={index} Application={item} />;
            })}
         </div>
      </>
   );
};

export default Calendar;
