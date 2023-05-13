import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';

export default function UserAdvertisement() {
   const dispatch = useDispatch();
   const { applications } = useSelector((state) => state.userStore);
   return <p>UserAdvertisement</p>;
}
