import React from "react";
import { db } from "../firebase";
import { set, ref, get, child } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ChakraProvider, Input, VStack } from "@chakra-ui/react";

function CreateUser({ setPlayerNo, playerNo }) {
  const navigate = useNavigate();

  let state = {
    name: " ",
    previousX: 0,
    previousY: 0,
    currentX: 0,
    currentY: 0,
  };

  const handleInput = (e) => {
    state.name = e.target.value;
  };

  const createOnSubmit = async (e) => {
    const dbref = ref(db);

    get(child(dbref, `games/Players`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.size >= 4) {
          alert("Only max of 4 players allowed");
          alert("new game will be created for you"); //needs more work to seperate players into seperate games
          return;
        }

        // setPlayerNo(Number(snapshot.size));

        get(child(dbref, `games/difficulty`)).then((diffSnap) => {
          setPlayerNo(Number(snapshot.size + 1));
          if (diffSnap.exists()) {
            navigate("/Game");
          } else {
            navigate("/Waiting");
          }
          set(
            ref(db, `games/Players/` + "player " + Number(snapshot.size + 1)),
            state
          );
        });
      } else {
        set(ref(db, `games/Players/` + "player " + 1), state);
        setPlayerNo(1);
        navigate("/Difficulty");
      }
    });
  };

  return (
    <>
      <ChakraProvider>
        <VStack
          w="100vw"
          h="100vh"
          justifyContent={"center"}
          align="center"
          backgroundImage={`url(${require("../imgs/ducks.jpg")})`}
          backgroundPosition="bottom"
          objectFit="cover"
        >
          <Input
            w={"50%"}
            bg={"white"}
            type={"text"}
            placeholder="Enter Name"
            onChange={handleInput}
          />
          <Button onClick={createOnSubmit}>Create User</Button>
        </VStack>
      </ChakraProvider>
    </>
  );
}

export default CreateUser;
