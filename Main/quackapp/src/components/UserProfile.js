import React, { useEffect } from "react";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { storeDB } from "../firebase";
import {
  Box,
  VStack,
  Image,
  Text,
  ChakraProvider,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  EditablePreview,
  useColorModeValue,
  IconButton,
  Input,
  useEditableControls,
  ButtonGroup,
  Editable,
  Tooltip,
  EditableInput,
  Flex,
  EditableTextarea,
} from "@chakra-ui/react";
import styled from "styled-components";

function UserProfile({ user }) {
  const [name, setName] = useState("name");
  const [highScore, setHighScore] = useState(0);
  const [description, setDesc] = useState("desc");

  useEffect((e) => {
    const createDatabase = async () => {
      const docRef = doc(storeDB, "Users", user);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setHighScore(docSnap.data().highScore);
        setDesc(docSnap.data().description);
      } else {
        await setDoc(docRef, {
          name: "",
          description: "Empty",
          highScore: "0",
        });
      }
    };
    createDatabase();
  }, []);

  const editName = async (e) => {
    await setDoc(doc(storeDB, "Users", user), {
      name: e.target.value,
      description: description,
      highScore: highScore,
    });
  };

  const editDescription = async (e) => {
    await setDoc(doc(storeDB, "Users", user), {
      name: name,
      description: e.target.value,
      highScore: highScore,
    });
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          color={"black"}
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          color={"black"}
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          color={"black"}
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <ChakraProvider>
      <Box
        backgroundImage={`url(${require("../imgs/ducks.jpg")})`}
        backgroundPosition="bottom"
        objectFit="cover"
        h={"100vh"}
        w={"100%"}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <VStack
          bg="rgba(0, 0, 0, 0.8)"
          w={"70%"}
          borderRadius="10rem"
          pb={"2rem"}
        >
          <Image
            mt={"5rem"}
            boxSize="100px"
            src={require("../imgs/pro.jpeg")}
            objectFit={"cover"}
            alt="Image of user"
          />

          <Text fontWeight={"bold"} color={"white"} fontSize={"3xl"}>
            Name
          </Text>
          <Editable color={"white"} defaultValue={name} key={name}>
            <EditablePreview />
            <EditableTextarea onChange={editName} />
            <EditableControls color={"black"} />
          </Editable>
          <Text
            fontWeight={"bold"}
            fontSize={"3xl"}
            color={"white"}
            mt={"3rem !important"}
          >
            Description
          </Text>
          <Editable
            color={"white"}
            defaultValue={description}
            key={description}
          >
            <EditablePreview />
            <EditableTextarea onChange={editDescription} />
            <EditableControls color={"black"} />
          </Editable>
          <Text
            fontWeight={"bold"}
            fontSize={"3xl"}
            color={"white "}
            mt={"3rem !important"}
          >
            HighScore
          </Text>
          <Text color={"white"} mt={"1rem !important"}>
            {highScore}
          </Text>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default UserProfile;
