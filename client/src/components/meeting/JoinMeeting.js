import React, { useEffect, useState } from 'react';
import { setIsRoomHost, setIdentity } from 'stores/interviewStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
export default function JoinMeeting() {
   const { isRoomHost, roomId } = useSelector((state) => state.InterviewStore);
   const [nameValue, setNameValue] = useState('');
   const search = useLocation().search;
   const dispatch = useDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      const isRoomHostFromURL = new URLSearchParams(search).get('host');
      if (isRoomHostFromURL) {
         dispatch(setIsRoomHost(true));
      } else {
         dispatch(setIsRoomHost(false));
      }
   }, []);

   // Handling Start
   const handleNameValueChange = (event) => {
      setNameValue(event.target.value);
   };

   const handleJoinRoom = async () => {
      dispatch(setIdentity(nameValue));
      navigate('/meeting');
   };

   // Handling End

   return (
      <div>
         <Input
            placeholder="Adınızı giriniz"
            value={nameValue}
            changeHandler={handleNameValueChange}
         />
         <button onClick={handleJoinRoom}>Toplantıya Katıl</button>
      </div>
   );
}

const Input = ({ placeholder, value, changeHandler }) => {
   return (
      <input
         value={value}
         onChange={changeHandler}
         className="join_room_input"
         placeholder={placeholder}
      />
   );
};
