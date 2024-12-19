import React, { useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      content: "Hello",
      sender: "Abhili",
    },
    {
      content: "Hello",
      sender: "mani",
    },
    {
      content: "Hello",
      sender: "Abhili",
    },
    {
      content: "Hello",
      sender: "Abhili",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("Abhili");
  return (
    <div className="">
      <header
        className="fixed w-full
        flex items-center dark:bg-gray-900 dark:border-gray-700 border shadow py-5 justify-around"
      >
        {/* room name container */}
        <div className="">
          <h1 className="text-xl font-semibold">
            Room : <span>Family</span>
          </h1>
        </div>

        {/* username container */}
        <div className="">
          <h1 className="text-xl font-semibold">
            User : <span>Abhilash</span>
          </h1>
        </div>

        {/* Leave room  */}
        <div className="">
          <button className=" text-xl font-semibold dark:bg-red-500 dark:hover:bg-red-700 px-3 py-3 rounded-md">
            Leave Room
          </button>
        </div>
      </header>

      {/* content */}
      <main className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto ">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender==currentUser?"justify-end":"justify-start"}`}>
            <div className={`my-2 ${message.sender==currentUser?'bg-green-600':'bg-blue-600'} p-2 max-w-xs rounded`}>
              <div className="flex flex-row gap-2">
                <img
                  className="h-10 w-10"
                  src={"https://avatar.iran.liara.run/public/43"}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* input message container */}
      <div className=" rounded-md bottom-2 fixed w-full h-16">
        <div className="h-full pr-3 gap-4 flex items-center justify-between rounded-lg w-1/2 mx-auto dark:bg-gray-900">
          <input
            type="text"
            className="dark:bg-gray-900 px-3 rounded w-full h-full"
            placeholder="Type your message here"
          />

          <div className="flex gap-3">
            <button className="dark:bg-purple-600 h-10 w-10  flex   justify-center items-center rounded-full">
              <MdAttachFile size={20} />
            </button>

            <button
              //   onClick={sendMessage}
              className="dark:bg-green-600 h-10 w-10  flex   justify-center items-center rounded-full"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
