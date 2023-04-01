import favico from 'assets/favicon.ico'
import React, { useState } from 'react'
import 'styles/advertisement/AdListItem.scss'

export default function AdListItem() {
   const [isOpen, setIsOpen] = useState(false)
   const handleClick = () => {
      setIsOpen(true)
   }
   return (
      <>
         <div className="card" onClick={handleClick}>
            <span className="icon">
               <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M4.5 9.5V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5H9.5C10.0523 4.5 10.5 4.94772 10.5 5.5V9.5C10.5 10.0523 10.0523 10.5 9.5 10.5H5.5C4.94772 10.5 4.5 10.0523 4.5 9.5Z" />
                  <path d="M13.5 18.5V14.5C13.5 13.9477 13.9477 13.5 14.5 13.5H18.5C19.0523 13.5 19.5 13.9477 19.5 14.5V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5H14.5C13.9477 19.5 13.5 19.0523 13.5 18.5Z" />
                  <path d="M4.5 19.5L7.5 13.5L10.5 19.5H4.5Z" />
                  <path d="M16.5 4.5C18.1569 4.5 19.5 5.84315 19.5 7.5C19.5 9.15685 18.1569 10.5 16.5 10.5C14.8431 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 14.8431 4.5 16.5 4.5Z" />
               </svg>
            </span>
            <h4>Categories</h4>
            <p>
               Standard chunk of Lorem Ipsum used since the 1500s is showed
               below for those interested.
            </p>
            <div className="shine"></div>
         </div>
      </>
   )
}
