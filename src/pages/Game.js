import React, { useState, useEffect, useCallback } from "react";
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game({ history }) {
  const MAX_SECONDS = 90;
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  const [currentCharacter, setCurrentCharacter] = useState("a");
  const [score, setScore] = useState(0);
  const [ms, setMs] = useState(999);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  useEffect(() => {
    setRandomCharacter();
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => clearInterval(interval);
    // eslint-disable-next-line no-use-before-define
  }, []);

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(characters[randomInt]);
  };

  const updateTime = (startTime) => {
    const endDate = new Date();
    const msPassedStr = (endDate.getTime() - startTime.getTime()).toString();

    const formattedMSString = ("0000" + msPassedStr).slice(-5);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
    const updatedMs =
      1000 -
      parseInt(formattedMSString.substring(formattedMSString.length - 3));
    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));
  };

  useEffect(() => {
    if (seconds <= -1) {
      //Todo: save the score
      history.push("/gameOver");
    }
  }, [seconds, ms, history]);

  const keyUpHandler = useCallback(
    (e) => {
      console.log(e.key, currentCharacter);
      if (e.key === currentCharacter) {
        setScore((prevScore) => prevScore + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
      }
      setRandomCharacter();
    },
    [currentCharacter]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyUpHandler]);

  const addLeadingZeros = (str, length) => {
    let zeros = "";
    for (let i = 0; i < length; i++) {
      zeros += "0";
    }
    return (zeros + str).slice(-length);
  };

  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
