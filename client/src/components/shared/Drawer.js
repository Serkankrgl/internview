import React from 'react';
import { animated, useTransition } from 'react-spring';
import 'styles/shared/Drawer.scss';
export default function Drawer({ show, setShow, children }) {
   //Animations
   const transitions = useTransition(show, {
      from: { position: 'fixed', opacity: 0, width: 0 },
      enter: { opacity: 1, width: 640 },
      leave: { opacity: 0, width: 0 }
   });
   return (
      <div className="drawer">
         {transitions(
            (styles, item) =>
               item && (
                  <animated.div style={{ opacity: styles.opacity }} className="overlay">
                     <animated.div style={{ width: styles.width }} className="drawer">
                        {children}
                     </animated.div>
                     <div className="fill" onClick={() => setShow(false)} />
                  </animated.div>
               )
         )}
      </div>
   );
}
