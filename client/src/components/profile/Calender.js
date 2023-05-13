import React, { useState } from 'react';
import 'styles/profile/Calender.scss';

const Calendar = () => {
   // State for the selected date
   const [selectedDate, setSelectedDate] = useState(new Date());

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
      console.log('days :>> ', days);
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

   return (
      <div className="calendar">
         <div className="header">
            <button
               onClick={() =>
                  setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))
               }>
               &lt;
            </button>
            <h2>{formattedDate}</h2>
            <button
               onClick={() =>
                  setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))
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
                                       key={datex}
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
                                 return <td></td>;
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
   );
};

export default Calendar;
