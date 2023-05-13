import React from 'react';
import { useLocation } from 'react-router-dom';
export default function Apply({ props }) {
   const location = useLocation();
   return <div>{location.state.advertiment.title}</div>;
}
