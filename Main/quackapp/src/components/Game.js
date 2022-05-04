import { VStack } from "@chakra-ui/react";
import { db } from "../firebase";
import { set, ref, get, child, onValue } from "firebase/database";
import React, { useRef, useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/provider";

function Game({ playerNo }) {
  const canvasRef = useRef(null);
  const dbref = ref(db);
  let keys = [];
  let previousX = 0;
  let previousY = 0;
  let x;
  let y = 0;

  //Sets initial position of players
  if (playerNo % 2 === 1) {
    x = 0;
  } else if (playerNo % 2 === 0) {
    x = 1195;
  }

  if (playerNo === 3 || playerNo === 4) {
    y = 595;
  }

  let velX = 0;
  let velY = 0;
  let speed = 5;
  let friction = 0.98;

  let state = {
    name: " ",
    previousX: 0,
    previousY: 0,
    currentX: 0,
    currentY: 0,
  };

  get(child(dbref, `games/Players/player ` + playerNo))
    .then((snapshot) => {
      if (snapshot.exists()) {
        state.name = snapshot.val().name;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const draw = (ctx, prevX, prevY, x, y) => {
    ctx.clearRect(prevX - 10, prevY - 10, 30, 30);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    console.log(x);
    console.log(y);
  };

  const drawOtherPlayers = (ctx) => {
    onValue(ref(db, `games/Players`), (snapshot) => {
      snapshot.forEach((element) => {
        let otherPlayerPreviousX = element.val().previousX;
        let otherPlayerPreviousY = element.val().previousY;
        let otherPlayerX = element.val().currentX;
        let otherPlayerY = element.val().currentY;
        draw(
          ctx,
          otherPlayerPreviousX,
          otherPlayerPreviousY,
          otherPlayerX,
          otherPlayerY
        );
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    update(ctx);
    drawOtherPlayers(ctx);
  }, [update]);

  function update(ctx) {
    requestAnimationFrame(function () {
      update(ctx);
    });

    previousX = x;
    previousY = y;
    // check the keys and do the movement.
    if (keys[38]) {
      if (velY > -speed) {
        velY--;
      }
      console.log("key 38");
    }

    if (keys[40]) {
      if (velY < speed) {
        velY++;
      }
      console.log("key 40");
    }
    if (keys[39]) {
      if (velX < speed) {
        velX++;
      }
      console.log("key 39");
    }

    if (keys[37]) {
      if (velX > -speed) {
        velX--;
      }
      console.log("key 37");
    }

    // apply some friction to y velocity.
    velY *= friction;

    y += velY;

    // apply some friction to x velocity.
    velX *= friction;
    x += velX;

    // bounds checking
    if (x >= 1195) {
      x = 1195;
    } else if (x <= 5) {
      x = 5;
    }

    if (y > 595) {
      y = 595;
    } else if (y <= 5) {
      y = 5;
    }

    state.previousX = previousX;
    state.previousY = previousY;
    state.currentX = x;
    state.currentY = y;
    set(ref(db, `games/Players/player ` + playerNo), state);

    ctx.clearRect(previousX - 10, previousY - 10, 30, 30);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
  });

  window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
  });

  // console.log(playerNo);

  return (
    <div>
      <ChakraProvider>
        <VStack minH={"100vh"} justify={"center"} align="center">
          <canvas
            ref={canvasRef}
            id="canvasId"
            width="1200"
            height="600"
            style={{ border: "1px solid #000000" }}
          ></canvas>
        </VStack>
      </ChakraProvider>
    </div>
  );
}

export default Game;
