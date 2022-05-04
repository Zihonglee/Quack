import io from "socket.io-client";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  ChakraProvider,
  Text,
  VStack,
  Box,
  HStack,
} from "@chakra-ui/react";

const socket = io.connect("http://localhost:3001");
function Chat({ user }) {
  const [chats, setChats] = useState([]);
  const [message, setMesasge] = useState("");
  const [room, setRoom] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    setChats([...chats, message]);
    socket.emit("send_message", { message, room });
  };

  const renderChat = () => {
    return chats.map((chat, index) => (
      <div key={index}>
        <Text mb={"1.5rem"}>{chat}</Text>
      </div>
    ));
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data.message);
      setChats([...chats, data.message]);
    });
  }, [chats]);

  return (
    <>
      <ChakraProvider>
        <Box h={"100vh"} w={"100%"} justifyContent={"center"} display="flex">
          <HStack w={"100%"} h={"100vh"}>
            <VStack
              w={"38%"}
              h={"100vh"}
              justifyContent={"center"}
              bg="rgba(0, 0, 0, 0.8)"
            >
              <Input
                placeholder="Join Room Number"
                w={"70%"}
                mb={"2rem"}
                color={"white"}
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <Button mb={"2rem !important"} w={"70%"} onClick={joinRoom}>
                Join Room
              </Button>
              <Input
                placeholder="Message..."
                w={"70%"}
                color={"white"}
                mb={"2rem !important"}
                onChange={(event) => {
                  setMesasge(user + ": " + event.target.value);
                }}
              />
              <Button w={"70%"} onClick={sendMessage}>
                Send message
              </Button>
            </VStack>
            <VStack
              w={"72%"}
              h={"100vh"}
              backgroundImage={`url(${require("../imgs/ducks.jpg")})`}
              backgroundPosition="bottom"
              m={"0 !important"}
              justifyContent="center"
            >
              <VStack
                h={"80vh"}
                w={"80%"}
                borderTopLeftRadius={"2rem"}
                borderBottomLeftRadius={"2rem"}
                bg="rgba(0, 0, 0, 0.8)"
                scrollBehavior="smooth"
                color={"white"}
                overflowY={"scroll"}
              >
                <Text
                  fontWeight={"bold"}
                  fontSize={"3xl"}
                  mt={"2rem"}
                  color={"white"}
                >
                  Messages
                </Text>
                {renderChat()}
              </VStack>
            </VStack>
          </HStack>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default Chat;
