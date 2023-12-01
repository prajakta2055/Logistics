import axios from "axios";
import React, { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import Navbar from "./HomePageNav";

const API_KEY = "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";

function Chatgpt() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello User! How can I help you today? You can ask me about recommendation of service, near me, etc",
      sender: "ChatGPT"
    }
  ]);

  // useEffect(() => {
  //   if (messages[messages.length - 1].sender === "user") {
  //     handleUserProvidedLocation();
  //   }
  // }, [messages]);

  async function getCoordinatesFromLocation(locationName) {
    console.log("in location finder", locationName);
    const apiKey = 'AIzaSyDEQ4J-WXRoHlO9LuaCfoMcOITAV6ySZr4';
    const geocodingEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationName)}&key=${apiKey}`;

    try {
      const response = await fetch(geocodingEndpoint);

      if (!response.ok) {
        throw new Error(`Geocoding API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        console.log("lang and lat in location", latitude, longitude);
        return { latitude, longitude };
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error(`Error getting coordinates: ${error.message}`);
      throw error;
    }
  }

  async function handleUserProvidedLocation(location) {
    // const userProvidedLocation = messages[messages.length - 1].message;
    console.log("this is location", location);

    try {
      const coordinates = await getCoordinatesFromLocation(location);
      console.log(coordinates, "only coordinates");
      console.log(`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`);

      if (coordinates) {
        const userLatitude = coordinates.latitude;
        const userLongitude = coordinates.longitude;

        try {
          const radius = 10;
          const query = `
          SELECT *
          FROM locations
          WHERE
            ACOS(
              SIN(RADIANS(${userLatitude})) * SIN(RADIANS(latitude)) +
              COS(RADIANS(${userLatitude})) * COS(RADIANS(latitude)) *
              COS(RADIANS(${userLongitude} - longitude))
            ) * 6371 <= ${radius}
          LIMIT 5;`;

          const response = await axios.post('http://localhost:8081/location', {
            queryType: 'custom',
            customQuery: query,
          });

          const nearbyLocations = response.data.result;
          const locationNames = nearbyLocations.map(location => location.name);
          const newMessages = [
            ...messages,
            {
              message: `Nearby drop locations: ${locationNames.join(', ')}`,
              sender: "ChatGPT",
            },
          ];

          setMessages(newMessages);
        } catch (error) {
          console.error('Error querying nearby locations:', error);
        }
      }
    } catch (error) {
      console.error("Error getting coordinates:", error.message);
    }
  }

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };
    const newMessages = [...messages, newMessage];
    setTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messagesObject) => {
      let role = "";
      if (messagesObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messagesObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Speak like an instructor."
    };

    const databaseContext = {
      role: "system",
      content: "The orders database has tables like 'orders' with columns 'orderId', 'customer', 'itemWeight', 'packageDimensions', 'carrierName(i.e. service provider)',destination,logo,price etc. just return sql query"
    };

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        databaseContext,
        ...apiMessages
      ]
    };

    const userMessage = chatMessages[chatMessages.length - 1].message.toLowerCase();
    console.log(userMessage, "this is user message");

    let newMessages = [];

    if (userMessage.includes('top 3 service providers')) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        });

        const data = await response.json();
        console.log("OpenAI API Response:", data);
        const dynamicQuery = data.choices[0].message.content;

        console.log("Dynamically Generated Query:", dynamicQuery);
        const match = dynamicQuery.match(/```sql\n([\s\S]+)\n```/);
        const sqlQuery = match ? match[1].trim() : '';

        console.log("Extracted SQL Query:", sqlQuery);

        try {
          const response = await axios.post('http://localhost:8081/orderdatagpt', {
            queryType: 'custom',
            customQuery: sqlQuery
          });

          const extractedData = response.data.result;
          const carrierNames = extractedData.map(data => data.carrierName);
          newMessages = [
            ...chatMessages,
            {
              message: `The most liked service providers are: ${carrierNames.join(', ')}`,
              sender: "ChatGPT",
            }
          ];
        } catch (error) {
          console.error('Error executing dynamically generated query:', error);
        }
      } catch (error) {
        console.error('Error from OpenAI API:', error);
      }
    } else if (userMessage.includes('show drop locations near ')) {
      // Extract location from user message
      const locationMatch = userMessage.match(/show drop locations near\s+(.+)/);
      const location = locationMatch ? locationMatch[1] : '';
    
      if (location) {
        newMessages = [
          ...newMessages,
          {
            message: `Sure, could you please provide your current location: ${location}`,
            sender: "ChatGPT"
          }
        ];
    
        setTyping(false);
        handleUserProvidedLocation(location);
      } else {
        console.error('Error: Location not specified in the user message');
      }
    }else {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        });

        const data = await response.json();

        newMessages = [
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
          }
        ];
      } catch (error) {
        console.error('Error from OpenAI API:', error);
      }
    }

    setMessages(newMessages);
    setTyping(false);
  }

  return (
    <div>

      <div style={{
        zIndex: "999999",
         position: "fixed",
         height: "70vh",
         width: "-webkit-fill-available",
         display: "flex",
         marginTop: "200px",
         justifyContent: "center",
         alignItems: "center",
         }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, index) => (
                <Message key={index} model={message}>
                  {message.extractedData && message.extractedData.map((result, resultIndex) => (
                    <div key={resultIndex}>
                      Carrier Name: {result.carrierName}
                    </div>
                  ))}
                </Message>
              ))}
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
