import axios from "axios";
import { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import HomePageNav from "./HomePageNav";
import Nav from "./home/Nav";

const API_KEY="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";

function Chatgpt() {
  const [typing, setTyping]=useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGpt!",
      sender: "ChatGPT"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };
    const newMessages = [...messages, newMessage];
setTyping(true);

    setMessages(newMessages);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages){
    let apiMessages =chatMessages.map((messagesObject)=> {
      let role="";
      if(messagesObject.sender ==="ChatGPT"){
        role="assistant"
      }
      else{
        role="user"
      }
      return {role :role, content: messagesObject.message}
    });

    const systemMessage={
      role:"system",
      content: "Speak like instructor."
    }

    const apiRequestBody={
      "model":"gpt-3.5-turbo",
      "messages":[
        systemMessage,
        ...apiMessages
      ]
    }
    await fetch("https://api.openai.com/v1/chat/completions",{
      method: "POST",
      headers:{
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data)=>{
      return data.json();
    }).then((data)=>{
      console.log(data);
      console.log(data.choices[0].message.content);
      setMessages(
        [...chatMessages,{
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }
      ]);
      setTyping(false);
    });
  }
  return (
    <div>
      <div style={{ position: "relative", height: "600px", width: "500px" ,marginLeft: "630px", marginTop: "20px"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={typing? <TypingIndicator content="Chatgpt is typing"/>:null}
            >
              {messages.map((message, index) => {
                return <Message key={index} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend}></MessageInput>
            <TypingIndicator content="ChatGPT is typing..." />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatgpt;
