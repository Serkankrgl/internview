import { setShowOverlay, setMessages } from 'stores/interviewStore';
import store from 'stores';
import { fetchTURNCredentials, getTurnIceServers } from './turn';
import * as wss from './ws';
import Peer from 'simple-peer';
const defaultConstraints = {
   audio: true,
   video: {
      width: '480',
      height: '360'
   }
};

const onlyAudioConstraints = {
   audio: true,
   video: false
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
   isRoomHost,
   identity,
   roomId = null,
   onlyAudio
) => {
   console.log('1');
   await fetchTURNCredentials();
   console.log('2');
   const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
   console.log('3');
   try {
      try {
         localStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (error) {}

      console.log('Successfully received local stream');
      showLocalVideoPreview(localStream);

      store.dispatch(setShowOverlay(false));

      if (isRoomHost) {
         wss.createNewRoom(identity, onlyAudio);
      } else {
         wss.joinRoom(identity, roomId, onlyAudio);
      }
   } catch (error) {
      console.log('Error occurred when trying to get access to local stream');
      console.log(error);
   }
};

let peers = {};
let streams = [];

const getConfiguration = () => {
   const turnIceServers = getTurnIceServers();

   if (turnIceServers) {
      return {
         iceServers: [
            {
               urls: 'stun:stun.l.google.com:19302'
            },
            ...turnIceServers
         ]
      };
   } else {
      console.warn('Using only STUN server');
      return {
         iceServers: [
            {
               urls: 'stun:stun.l.google.com:19302'
            }
         ]
      };
   }
};

const messengerChannel = 'messenger';

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
   const configuration = getConfiguration();

   peers[connUserSocketId] = new Peer({
      initiator: isInitiator,
      config: configuration,
      stream: localStream,
      channelName: messengerChannel
   });
   peers[connUserSocketId].on('signal', (data) => {
      const signalData = {
         signal: data,
         connUserSocketId: connUserSocketId
      };

      wss.signalPeerData(signalData);
   });
   peers[connUserSocketId].on('stream', (stream) => {
      console.log('New stream came');

      addStream(stream, connUserSocketId);
      streams = [...streams, stream];
   });
   {
   }
   peers[connUserSocketId].on('data', (data) => {
      const messageData = JSON.parse(data);
      appendNewMessage(messageData);
   });
};

export const handleSignalingData = (data) => {
   peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data) => {
   const { socketId } = data;
   const videoContainer = document.getElementById(socketId);
   const videoEl = document.getElementById(`${socketId}-video`);

   if (videoContainer && videoEl) {
      const tracks = videoEl.srcObject.getTracks();

      tracks.forEach((t) => t.stop());

      videoEl.srcObject = null;
      videoContainer.removeChild(videoEl);

      videoContainer.parentNode.removeChild(videoContainer);

      if (peers[socketId]) {
         peers[socketId].destroy();
      }
      delete peers[socketId];
   }
};

////////////////////////////////// UI Videos //////////////////////////////////
const showLocalVideoPreview = (stream) => {
   const videosContainer = document.getElementById('videos_portal');
   videosContainer.classList.add('videos_portal_styles');
   const videoContainer = document.createElement('div');
   videoContainer.classList.add('video_track_container');
   const videoElement = document.createElement('video');
   videoElement.autoplay = true;
   videoElement.muted = true;
   videoElement.srcObject = stream;
   videoElement.id = 'myVideoId';

   videoElement.onloadedmetadata = () => {
      videoElement.play();
   };

   videoContainer.appendChild(videoElement);

   if (store.getState().connectOnlyWithAudio) {
      videoContainer.appendChild(getAudioOnlyLabel());
   }

   videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSocketId) => {
   console.log('addStream :>> ');
   const videosContainer = document.getElementById('videos_portal');
   const videoContainer = document.createElement('div');
   videoContainer.id = connUserSocketId;

   videoContainer.classList.add('video_track_container');
   const videoElement = document.createElement('video');
   videoElement.autoplay = true;
   videoElement.srcObject = stream;
   videoElement.id = `${connUserSocketId}-video`;

   videoElement.onloadedmetadata = () => {
      videoElement.play();
   };

   videoElement.addEventListener('click', () => {
      if (videoElement.classList.contains('full_screen')) {
         videoElement.classList.remove('full_screen');
      } else {
         videoElement.classList.add('full_screen');
      }
   });

   videoContainer.appendChild(videoElement);

   const participants = store.getState().InterviewStore.participants;
   const participant = participants.find((p) => p.socketId === connUserSocketId);

   if (participant?.onlyAudio) {
      videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
   } else {
      videoContainer.style.position = 'static';
   }

   videosContainer.appendChild(videoContainer);
};

const getAudioOnlyLabel = (identity = '') => {
   const labelContainer = document.createElement('div');
   labelContainer.classList.add('label_only_audio_container');

   const label = document.createElement('p');
   label.classList.add('label_only_audio_text');
   label.innerHTML = `${identity}  (Sadece ses)`;

   labelContainer.appendChild(label);
   return labelContainer;
};

////////////////////////////////// Buttons logic //////////////////////////////////

export const toggleMic = (isMuted) => {
   localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled) => {
   localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};

export const toggleScreenShare = (isScreenSharingActive, screenSharingStream = null) => {
   if (isScreenSharingActive) {
      switchVideoTracks(localStream);
   } else {
      switchVideoTracks(screenSharingStream);
   }
};

const switchVideoTracks = (stream) => {
   for (let socket_id in peers) {
      for (let index in peers[socket_id].streams[0].getTracks()) {
         for (let index2 in stream.getTracks()) {
            if (
               peers[socket_id].streams[0].getTracks()[index].kind ===
               stream.getTracks()[index2].kind
            ) {
               peers[socket_id].replaceTrack(
                  peers[socket_id].streams[0].getTracks()[index],
                  stream.getTracks()[index2],
                  peers[socket_id].streams[0]
               );
               break;
            }
         }
      }
   }
};

////////////////////////////////// Messages /////////////////////////////////////
const appendNewMessage = (messageData) => {
   const messages = store.getState().InterviewStore.messages;

   console.log('object :>> ', messages);
   store.dispatch(setMessages([...messages, messageData]));
};

export const sendMessageUsingDataChannel = (messageContent) => {
   console.log('identity :>> ', identity);
   const identity = store.getState().InterviewStore.identity;

   const localMessageData = {
      content: messageContent,
      identity,
      messageCreatedByMe: true
   };

   appendNewMessage(localMessageData);

   const messageData = {
      content: messageContent,
      identity
   };

   const stringifiedMessageData = JSON.stringify(messageData);
   for (let socketId in peers) {
      peers[socketId].send(stringifiedMessageData);
   }
};
