import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { createRoom as createRoomApi, joinChatApi } from '../services/RoomService';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';


const JoinCreateChat = () => {
  const [detail,setDetail] = useState({
    roomId:"",
    userName:"",
  });


 const {roomId,userName,connected,setRoomId, setCurrentUser, setConnected}= useChatContext();
 const navigate = useNavigate()

  function handleFormInputChange(event){
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    })

  }

  async function joinChat() {
    if (validateForm()) {
      //join chat

      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("joined..");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status == 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining room");
        }
        console.log(error);
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      console.log(detail);
  
      // Clean roomId before sending the request
      const cleanedRoomId = detail.roomId.trim().replace(/=+$/, ""); // Removes '=' if present
  
      try {
        const response = await createRoomApi(cleanedRoomId); // Send cleaned ID
        
        console.log(response);
        toast.success("Room created successfully");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
  
        navigate("/chat");
      } catch (error) {
        console.log(error);
        if (error.status === 400) {
          toast.error("Room Already Exists");
        } else {
          toast.error("Error in creating room");
        }
      }
    }
  }
  

function validateForm() {
  if (detail.roomId === "" || detail.userName === "") {
    toast.error("Invalid Input ")
    return false;
  }
 
  return true;
}


  return (
    <div className=' border min-h-screen flex items-center justify-center'>
<div className="flex flex-col gap-5 p-10 dark:border-gray-700 border w-full max-w-md shadow dark:bg-gray-900 rounded-md">

<div className="text-2xl flex flex-col gap-8 font-semibold text-center ">
  <h1>Join Room / Create Room</h1>
  {/* name div */}
  <div className="">
    <label htmlFor="name" className='block font-medium mb-2'>Name</label>
 <input type="text"
 onChange={handleFormInputChange}
 value={detail.userName}
 id='name'
 name="userName"
 placeholder='Enter the name '
 className='w-full dark:bg-gray-600 px-4 py-2 border focus:ring-blue-500 focus:ring-2 focus:outline-none  rounded-lg dark:border-gray-600'
 />
 
 
  </div>
{/* room id div  */}


  <div className="">
    <label htmlFor="name" className='block font-medium mb-2'>Room Id / New Room Id</label>
 <input 
 onChange={handleFormInputChange}
 value={detail.roomId}
 name="roomId"
 type="text"
 id='name'
 placeholder="Enter the room id"
 className='w-full dark:bg-gray-600 px-4 py-2 border focus:ring-blue-500 focus:ring-2 focus:outline-none  rounded-lg dark:border-gray-600'
 />
 
 
  </div>
  {/* button */}
  <div className="flex justify-around" >
  <button
  onClick={joinChat}
  className='px-3 rounded-md py-2 dark:bg-blue-500 hover:dark:bg-blue-800'>
Join Room
</button>

<button
onClick={createRoom}
 className='px-3 rounded-md py-2 dark:bg-orange-500 hover:dark:bg-orange-800'>
Create Room
</button>

  </div>

  
</div>
</div>


    </div>
  )
}

export default JoinCreateChat