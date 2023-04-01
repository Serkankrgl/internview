import React from 'react'
import 'styles/advertisement/AdModal.scss'
export default function AdDetail({ setIsOpen }) {
   return (
      <>
         <div onClick={() => setIsOpen(false)} />
         <div className="DetailContainer"></div>
      </>
   )
}
