import { VStack, Select, Text, Button, ChakraProvider } from "@chakra-ui/react";
import { db } from "../firebase";
import { set, ref, get, child } from "firebase/database";
import { useNavigate } from "react-router-dom";
import React from "react";

function Difficulty() {
  let difficulty = "empty";
  const navigate = useNavigate();

  const handleSelection = (e) => {
    difficulty = e.target.value;
  };

  const createGameOnSubmit = (e) => {
    if (difficulty === "empty") {
      alert("No difficult selected");
    } else {
      set(ref(db, `games/difficulty`), difficulty);
      navigate("/Game");
    }
  };

  return (
    <>
      <ChakraProvider>
        <VStack
          h="100vh"
          justify={"center"}
          align="center"
          backgroundImage={`url(${require("../imgs/ducks.jpg")})`}
          backgroundPosition="bottom"
          objectFit="cover"
        >
          <Text mb={"2rem"} color="black" fontWeight={"bold"}>
            Select difficulty
          </Text>
          <Select
            onChange={handleSelection}
            w="50%"
            bg={"white"}
            placeholder="Select option"
          >
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </Select>
          <Button onClick={createGameOnSubmit}>Confirm difficulty</Button>
        </VStack>
      </ChakraProvider>
    </>
  );
}

export default Difficulty;
