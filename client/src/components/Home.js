import React, { useState, useEffect } from 'react';
import 'styles/Home.scss';
export default function Home() {
   const [text, setText] = useState('');

   const [texts, setTexts] = useState([
      'Aktif olarak iş arayışında mısınız?',
      'Aradığınız çalışanı henüz bulamadınız mı?'
   ]);
   const [fullText, setFullText] = useState(texts[0]);
   const [index, setIndex] = useState(0);
   const [tindex, setTindex] = useState(0);

   useEffect(() => {
      if (index < fullText.length) {
         setTimeout(() => {
            setText(text + fullText[index]);
            setIndex(index + 1);
         }, 50);
      } else {
         setTimeout(() => {
            setText('');

            let i = tindex < texts.length - 1 ? tindex + 1 : 0;
            setTindex(i);
            setFullText(texts[i]);
            setIndex(0);
         }, 2000);
      }
   }, [index]);
   return (
      <div className="splash">
         <h2>{text}</h2>
         <h3>Doğru yerdesiniz</h3>
      </div>
   );
}
