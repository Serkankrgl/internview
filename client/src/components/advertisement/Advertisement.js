import React from 'react'
import 'styles/advertisement/Advertisement.scss'
import AdListItem from './components/AdListItem'

export default function Advertisement() {
   const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   return (
      <div className="container">
         <div className="flex-container">
            {array.map((Item) => {
               return (
                  <div className="flex-item" key={Item}>
                     <AdListItem />
                  </div>
               )
            })}
         </div>
      </div>
   )
}
