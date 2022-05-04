import {
  VStack,
  Text,
  Spinner,
  ChakraProvider,
  Grid,
  HStack,
  Box,
} from "@chakra-ui/react";
import { db } from "../firebase";
import { set, ref, get, child, onValue, onUpdate } from "firebase/database";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";

function Waiting() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  //If difficulty is not set, players will be on the waiting screen
  const monitorDifficulty = () => {
    return onValue(ref(db, `games/difficulty`), (snapshot) => {
      if (snapshot.exists()) {
        navigate("/Game");
        return;
      }
    });
  };

  useEffect(() => {
    return onValue(ref(db, `games/Players`), (snapshot) => {
      console.log("There are " + snapshot.size + " players");

      let usersArr = [];
      snapshot.forEach((player) => {
        usersArr = [...usersArr, player.val().name];
      });

      // console.log(usersArr);
      setUsers(usersArr);
      console.log(usersArr);
    });
  }, [users]);

  return (
    <>
      <ChakraProvider>
        <VStack
          h={"100vh"}
          justifyContent={"center"}
          align={"center"}
          backgroundImage={`url(${require("../imgs/ducks.jpg")})`}
          backgroundPosition="bottom"
          objectFit="cover"
        >
          <Text color={"black"} fontWeight="extrabold">
            Players
          </Text>
          <HStack
            justifyContent={"center"}
            w={"50vw"}
            p={"5"}
            mb={"3rem !important"}
          >
            {users.map((user) => {
              return (
                <Box border={"1px"} borderRadius="md" p={2}>
                  {user}
                </Box>
              );
            })}
          </HStack>
          <Text mb={"2rem !important"} color={"black"} fontWeight={"bold"}>
            Waiting for Host to set difficulty
          </Text>
          <Spinner onLoad={monitorDifficulty()} size="xl" />
        </VStack>
      </ChakraProvider>
    </>
  );
}

export default Waiting;
