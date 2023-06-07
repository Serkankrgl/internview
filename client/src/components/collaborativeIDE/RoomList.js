import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {
   joinRoom,
   createRoom,
   subscribeToRoomJoined,
   subscribeToInvalidPassword,
   subscribeToRoomNotFound,
   subscribeToRoomCreated,
   subscribeToRoomExists,
   subscribeToAlreadyJoined
} from 'utils/IDEws';

const RoomList = () => {
   const [roomList, setRoomList] = useState([]);
   const [joinRoomID, setJoinRoomID] = useState('');
   const [joinRoomPassword, setJoinRoomPassword] = useState('');
   const [createRoomPassword, setCreateRoomPassword] = useState('');

   const navigate = useNavigate();
   useEffect(() => {
      // Odaları listeleme isteği
      fetchRooms();

      // Yeni bir odaya katılınca veya yeni oda oluşturulunca odaları listeleme isteği
      subscribeToRoomJoined((data) => {
         navigate('/collaborativeIDE/Editor');
      });
      subscribeToRoomCreated((data) => {
         navigate('/collaborativeIDE/Editor');
      });

      // Geçersiz parola veya bulunamayan oda durumunda hata mesajı
      subscribeToInvalidPassword(() => {
         alert('Geçersiz parola!');
      });
      subscribeToRoomNotFound(() => {
         alert('Oda bulunamadı!');
      });
      subscribeToRoomExists(() => {
         alert('Oda zaten mevcut!');
      });
      subscribeToAlreadyJoined(() => {
         alert('Yanlızca bir odaya katılınabilir!');
      });
   }, []);

   const fetchRooms = () => {
      // Sunucudan odaları listeleme isteği
      axios
         .get('http://localhost:3090/rooms')
         .then((response) => {
            setRoomList(response.data);
         })
         .catch((error) => {
            console.error('Hata:', error);
         });
   };

   const handleJoinRoom = (roomID) => {
      // Seçilen odaya katılma isteği
      joinRoom(roomID, joinRoomPassword);
   };

   const handleCreateRoom = () => {
      // Yeni oda oluşturma isteği
      createRoom(createRoomPassword);
   };

   return (
      <div>
         <h2>Oda Listesi</h2>
         <ul>
            {roomList.map((room) => (
               <li key={room.roomID} onClick={() => setJoinRoomID(room.roomID)}>
                  Oda ID: {room.roomID}, Şifre: {room.password}, Katılımcı Sayısı:{' '}
                  {room.clientCount}
               </li>
            ))}
         </ul>
         <div>
            <h3>Odaya Katıl</h3>
            <input type="text" value={joinRoomID} disabled placeholder="Oda ID" />
            <input
               type="password"
               value={joinRoomPassword}
               onChange={(e) => setJoinRoomPassword(e.target.value)}
               placeholder="Oda Şifresi"
            />
            <button onClick={() => handleJoinRoom(joinRoomID)}>Katıl</button>
         </div>
         <div>
            <h3>Yeni Oda Oluştur</h3>
            <input
               type="password"
               value={createRoomPassword}
               onChange={(e) => setCreateRoomPassword(e.target.value)}
               placeholder="Oda Şifresi"
            />
            <button onClick={handleCreateRoom}>Oluştur</button>
         </div>
      </div>
   );
};

export default RoomList;
