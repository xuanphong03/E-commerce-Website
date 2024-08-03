// import React, { useEffect, useRef, useState } from 'react';
// import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
// import { IoIosArrowDown, IoMdSend } from 'react-icons/io';
// import './ChatBox.css';

// import { over } from 'stompjs';
// import SockJS from 'sockjs-client';
// import StorageKeys from '~/constants/storage-key';

// ChatBox.propTypes = {};

// const RECEIVER = {
//   chatbot: 'Aza Chōbei Assistant',
//   admin: 'ADMIN',
// };

// let stompClient = null;
// const SOCKET_URL = 'http://localhost:8080/ws';

// function ChatBox(props) {
//   const token = localStorage.getItem(StorageKeys.TOKEN) || '';
//   const user = JSON.parse(localStorage.getItem(StorageKeys.USER)) || {};
//   const { id, name } = user;
//   const [chatting, setChatting] = useState(false);
//   const [receiverId, setReceiverId] = useState(null);
//   const [receiversList, setReceiversList] = useState([]);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   const connect = () => {
//     const socket = new SockJS(SOCKET_URL);
//     stompClient = over(socket);
//     stompClient.connect(
//       { Authorization: `Bearer ${token}` },
//       onConnected,
//       onError,
//     );
//   };

//   const onConnected = () => {
//     stompClient.subscribe(`/user/${name}/queue/messages`, onMessageReceived); //check
//     stompClient.subscribe(`/user/queue/public`, onMessageReceived); //check

//     // register the connected user
//     stompClient.send(
//       '/app/addUser',
//       { Authorization: `Bearer ${token}` },
//       JSON.stringify({
//         name: name,
//         fullName: name,
//         img_url: 'img_Url_User',
//         status: 'ONLINE',
//       }),
//     );

//     findAndDisplayConnectedUsers();
//   };

//   const findAndDisplayConnectedUsers = async () => {
//     const connectedUsersResponse = await fetch('http://localhost:8080/users', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => data);

//     const connectedUsers = connectedUsersResponse.filter(
//       (user) => user.name !== name,
//     );

//     setReceiversList(connectedUsers);
//   };

//   const fetchAndDisplayUserChat = async () => {
//     const userChatResponse = await fetch(
//       `http://localhost:8080/api/v1/chat-box/messages/${name}/${receiverId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     )
//       .then((response) => response.json())
//       .then((data) => data);
//     setMessages(userChatResponse);
//   };

//   // const displayMessage = () => {};

//   const onError = (err) => {
//     console.log('Lỗi', err);
//   };
//   const onMessageReceived = async (payload) => {
//     await findAndDisplayConnectedUsers();
//     const payloadData = JSON.parse(payload.body);

//     console.log('PAYLOAD DATA: ', payload);
//   };

//   const handleSendMessage = () => {
//     if (!message.trim()) return;

//     if (stompClient) {
//       const chatMessage = {
//         senderId: name,
//         recipientId: receiverId,
//         content: message.trim(),
//         timestamp: new Date(),
//       };
//       stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));

//       setMessages((prev) => [...prev, { name, message }]);
//       if (receiverId === RECEIVER.chatbot) {
//         fetchAndDisplayUserChat();
//       }
//       setMessage('');
//     }
//     // chatArea.scrollTop = chatArea.scrollHeight;
//   };

//   const handleChangeMessage = (e) => {
//     const { value } = e.target;
//     setMessage(value);
//   };

//   return (
//     <div className={`fixed bottom-2 right-5`}>
//       <div
//         onClick={() => {
//           setChatting(true);
//           connect();
//         }}
//         className={`${chatting ? 'invisible opacity-0' : 'visible opacity-100'} flex cursor-pointer items-center gap-2 rounded bg-red-500 px-4 py-2 text-white transition-all delay-300 duration-500 ease-in-out hover:bg-red-400`}
//       >
//         <IoChatbubbleEllipsesOutline className="text-xl" /> Nhắn tin
//       </div>
//       <div
//         className={`${chatting ? 'h-[500px] w-[700px]' : 'h-0 w-0'} chatBox absolute bottom-0 right-0 overflow-hidden rounded bg-white text-black`}
//       >
//         <div className="border-gray flex h-12 items-center justify-between border-b border-solid px-5 py-2">
//           <h2 className="text-lg font-semibold tracking-wide text-red-500">
//             Nhắn tin
//           </h2>
//           <button
//             onClick={() => setChatting(false)}
//             className="flex size-5 items-center justify-center rounded border border-solid border-black"
//           >
//             <IoIosArrowDown className="text-xs" />
//           </button>
//         </div>
//         <div className="flex h-[calc(100%-48px)]">
//           <div className="border-gray w-[200px] border-r border-solid">
//             <article
//               onClick={() => {
//                 setReceiverId(RECEIVER.chatbot);
//                 fetchAndDisplayUserChat();
//               }}
//               className={`${receiverId === RECEIVER.chatbot ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} flex cursor-pointer gap-2 px-5 py-2 text-[#2c2c2c] transition-all`}
//             >
//               <div className="flex size-6 items-center justify-center overflow-hidden rounded-full">
//                 <img
//                   src="https://e7.pngegg.com/pngimages/498/917/png-clipart-computer-icons-desktop-chatbot-icon-blue-angle-thumbnail.png"
//                   className="max-w-full object-cover"
//                 />
//               </div>
//               <div>
//                 <h4>Chat bot</h4>
//               </div>
//             </article>

//             <article
//               onClick={() => {
//                 setReceiverId(RECEIVER.admin);
//                 fetchAndDisplayUserChat();
//               }}
//               className={`${receiverId === RECEIVER.admin ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} flex cursor-pointer gap-2 px-5 py-2 text-[#2c2c2c] transition-all`}
//             >
//               <div className="flex size-6 items-center justify-center overflow-hidden rounded-full">
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILDn3A82Ed8Sq7yGAzk8PNqZjpzAYgSF3-g&s"
//                   className="max-w-full object-cover"
//                 />
//               </div>
//               <div>
//                 <h4>Admin</h4>
//               </div>
//             </article>
//           </div>
//           <div className="relative w-[calc(100%-200px)]">
//             <div className="h-[calc(100%-40px)] overflow-y-auto px-4 py-2">
//               <ul>
//                 {messages.map((messageItem, index) => {
//                   return (
//                     <li className="text-sm" key={index}>
//                       {messageItem.content}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//             <div className="border-gray absolute bottom-0 left-0 right-0 h-10 border-t border-solid pr-10">
//               <input
//                 value={message}
//                 onChange={handleChangeMessage}
//                 className="h-full w-full px-2 py-1 text-sm outline-none"
//                 placeholder="Nhập tin nhắn..."
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="absolute right-0 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-blue-500 text-xl text-white transition-all hover:bg-blue-400"
//               >
//                 <IoMdSend />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;
import React, { useEffect, useRef, useState } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoMdSend } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import './ChatBox.css';

import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import StorageKeys from '~/constants/storage-key';

ChatBox.propTypes = {};

const RECEIVER = {
  chatbot: 'Aza Chōbei Assistant',
  admin: 'ADMIN',
};

let stompClient = null;
const SOCKET_URL = 'http://localhost:8080/ws';

function ChatBox(props) {
  const token = localStorage.getItem(StorageKeys.TOKEN) || '';
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER)) || {};
  const { id, name } = user;
  const [chatting, setChatting] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [receiversList, setReceiversList] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({});
  };

  useEffect(scrollToBottom, [messages]);

  const connect = () => {
    const socket = new SockJS(SOCKET_URL);
    stompClient = over(socket);
    stompClient.connect(
      { Authorization: `Bearer ${token}` },
      onConnected,
      onError,
    );
  };

  const onConnected = () => {
    stompClient.subscribe(`/user/${name}/queue/messages`, onMessageReceived);
    stompClient.subscribe(`/user/queue/public`, onMessageReceived);

    // register the connected user
    stompClient.send(
      '/app/addUser',
      { Authorization: `Bearer ${token}` },
      JSON.stringify({
        name: name,
        fullName: name,
        img_url: 'img_Url_User',
        status: 'ONLINE',
      }),
    );

    findAndDisplayConnectedUsers();
  };

  const findAndDisplayConnectedUsers = async () => {
    const connectedUsersResponse = await fetch('http://localhost:8080/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());

    const connectedUsers = connectedUsersResponse.filter(
      (user) => user.name !== name,
    );

    setReceiversList(connectedUsers);
  };

  const fetchAndDisplayUserChat = async () => {
    const userChatResponse = await fetch(
      `http://localhost:8080/api/v1/chat-box/messages/${name}/${receiverId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((response) => response.json());
    setMessages(userChatResponse);
  };

  const onError = (err) => {
    // console.log('Lỗi', err);
  };

  const onMessageReceived = async (payload) => {
    await findAndDisplayConnectedUsers();
    const payloadData = JSON.parse(payload.body);

    // Kiểm tra nếu payload có trường content, nếu có thì mới thêm vào messages
    if (payloadData.content) {
      setMessages((prev) => [...prev, payloadData]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !stompClient) return;

    const chatMessage = {
      senderId: name,
      recipientId: receiverId,
      content: message.trim(),
      timestamp: new Date(),
    };
    stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));

    setMessages((prev) => [...prev, chatMessage]);
    if (receiverId === RECEIVER.chatbot) {
      fetchAndDisplayUserChat();
    }
    setMessage('');
  };

  const handleChangeMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  useEffect(() => {
    if (receiverId) {
      fetchAndDisplayUserChat();
    }
  }, [receiverId]);

  return (
    <div className={`fixed bottom-2 right-5`}>
      <div
        onClick={() => {
          setChatting(true);
          connect();
        }}
        className={`${chatting ? 'invisible opacity-0' : 'visible opacity-100'} flex cursor-pointer items-center gap-2 rounded bg-red-500 px-4 py-2 text-white transition-all delay-300 duration-500 ease-in-out hover:bg-red-400`}
      >
        <IoChatbubbleEllipsesOutline className="text-xl" /> Nhắn tin
      </div>
      <div
        className={`${chatting ? 'h-[500px] w-[700px]' : 'h-0 w-0'} chatBox absolute bottom-0 right-0 overflow-hidden rounded bg-white text-black`}
      >
        <div className="border-gray flex h-12 items-center justify-between border-b border-solid px-5 py-2">
          <h2 className="text-lg font-semibold tracking-wide text-red-500">
            Nhắn tin
          </h2>
          <button
            onClick={() => setChatting(false)}
            className="flex size-5 items-center justify-center rounded border border-solid border-black"
          >
            <IoIosArrowDown className="text-xs" />
          </button>
        </div>
        <div className="flex h-[calc(100%-48px)]">
          <div className="border-gray w-[200px] border-r border-solid">
            <article
              onClick={() => setReceiverId(RECEIVER.chatbot)}
              className={`${receiverId === RECEIVER.chatbot ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} flex cursor-pointer gap-2 px-5 py-2 text-[#2c2c2c] transition-all`}
            >
              <div className="flex size-6 items-center justify-center overflow-hidden rounded-full">
                <img
                  src="https://e7.pngegg.com/pngimages/498/917/png-clipart-computer-icons-desktop-chatbot-icon-blue-angle-thumbnail.png"
                  className="max-w-full object-cover"
                />
              </div>
              <div>
                <h4>Chat bot</h4>
              </div>
            </article>

            <article
              onClick={() => setReceiverId(RECEIVER.admin)}
              className={`${receiverId === RECEIVER.admin ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} flex cursor-pointer gap-2 px-5 py-2 text-[#2c2c2c] transition-all`}
            >
              <div className="flex size-6 items-center justify-center overflow-hidden rounded-full">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILDn3A82Ed8Sq7yGAzk8PNqZjpzAYgSF3-g&s"
                  className="max-w-full object-cover"
                />
              </div>
              <div>
                <h4>Admin</h4>
              </div>
            </article>
          </div>
          <div className="relative w-[calc(100%-200px)]">
            <div className="h-[calc(100%-40px)] overflow-y-auto px-4 py-2">
              <ul>
                {messages.map((messageItem, index) => (
                  <li
                    className={`${messageItem.senderId === name ? 'ml-auto bg-blue-500 text-right text-white' : 'mr-auto bg-gray-200 text-left'} mb-4 w-fit max-w-[80%] rounded-lg px-2 py-2 text-sm`}
                    key={index}
                  >
                    <p className={``}>{messageItem.content}</p>
                  </li>
                ))}
                <div ref={messagesEndRef} />
              </ul>
            </div>
            <form
              onSubmit={handleSendMessage}
              className="border-gray absolute bottom-0 left-0 right-0 h-10 border-t border-solid pr-10"
            >
              <input
                value={message}
                onChange={handleChangeMessage}
                className="h-full w-full px-2 py-1 text-sm outline-none"
                placeholder="Nhập tin nhắn..."
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-blue-500 text-xl text-white transition-all hover:bg-blue-400"
              >
                <IoMdSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
