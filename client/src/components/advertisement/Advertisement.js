import React, { useEffect, useState } from 'react';
// import 'styles/advertisement/Advertisement.scss';
import { Drawer } from 'components/shared';
import { AdList, AdDetail } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedAd } from 'stores/advertisementStore';
import { Link } from 'react-router-dom';
export default function Advertisement() {
   const dispatch = useDispatch();
   let { selectedAd } = useSelector((state) => state.advertisement);
   const [show, setShow] = useState(false);

   ///Effects

   //componentDidMount
   useEffect(() => {
      dispatch(setSelectedAd({}));
   }, []);

   //Trigger When currentAd Changed
   useEffect(() => {
      if (Object.keys(selectedAd).length != 0) {
         setShow(true);
      } else {
         setShow(false);
      }
   }, [selectedAd]);

   return (
      <div>
         <Link to="/advertisement/advertise" className="advertise">
            Çalışan mı arıyorsun? Hemen ilan ver.
         </Link>
         <AdList />
         <Drawer show={show} setShow={setShow} children={<AdDetail />} />
      </div>
   );
}
