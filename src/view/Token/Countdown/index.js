import React, { useState, useEffect } from "react";
import moment from "moment";
import { Paper, Stack } from "@mui/material";

const Countdown = () => {
  const [unixEndDate, setUnixEndDate] = useState(
    Number(moment(`03 15 2022 12:00 am`, "MM-DD-YYYY hh:mm A").format("X"))
  );
  const initialCountdownTimer = {
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  };

  const [countdownTimer, setCountdownTimer] = useState({
    ...initialCountdownTimer,
  });

  useEffect(() => {
    let timer = null;

    timer = setInterval(() => playTimer(unixEndDate), 1000);
    localStorage.setItem("countdownDate", JSON.stringify(unixEndDate));

    return () => {
      clearInterval(timer);
      timer = null;
    };
  }, [unixEndDate]);

  function playTimer(currentUnixEndDate) {
    const distance = currentUnixEndDate - moment().format("X");

    if (distance > 0) {
      setCountdownTimer((prevCountdownTimer) => {
        return {
          ...prevCountdownTimer,
          days: parseInt(distance / (60 * 60 * 24), 10),
          hours: parseInt((distance % (60 * 60 * 24)) / (60 * 60), 10),
          mins: parseInt((distance % (60 * 60)) / 60, 10),
          secs: parseInt(distance % 60, 10),
        };
      });
    } else {
      alert("ended!");
      setCountdownTimer({ ...initialCountdownTimer });
      setUnixEndDate(moment().format("X") - 5 + 15);
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      <Paper
        elevation={3}
        sx={{
          width: 90,
          height: 90,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ color: "#8b2be2", fontSize: "20px", fontWeight: "bold" }}>
          {countdownTimer.days}
        </div>
        <div>Days</div>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: 90,
          height: 90,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ color: "#8b2be2", fontSize: "20px", fontWeight: "bold" }}>
          {countdownTimer.hours}
        </div>
        <div>Hours</div>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: 90,
          height: 90,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ color: "#8b2be2", fontSize: "20px", fontWeight: "bold" }}>
          {countdownTimer.mins}
        </div>
        <div>Mins</div>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: 90,
          height: 90,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ color: "#8b2be2", fontSize: "20px", fontWeight: "bold" }}>
          {countdownTimer.secs}
        </div>
        <div>Secs</div>
      </Paper>
    </Stack>
  );
};

export default Countdown;
