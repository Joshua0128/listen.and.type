import React, { useState } from "react";
import defaultAudio from "./default.mp3";
import {
  Button,
  TextareaAutosize,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    height: "100vh",
    justifyContent: "center",
    padding: "20px",
  },
  paper: {
    padding: "20px",
    backgroundColor: "#FFFFFF",
    marginBottom: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  textarea: {
    width: "100%",
    marginBottom: "20px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #E0E0E0",
  },
  audioContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  audio: {
    width: "100%",
    maxWidth: "400px",
  },
  button: {
    textTransform: "none",
    fontSize: "16px",
    padding: "10px 20px",
    backgroundColor: "#FF5A5F",
    color: "#FFFFFF",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#E5484F",
    },
  },
  accuracy: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
});

const App = () => {
  const classes = useStyles();
  const [transcription, setTranscription] = useState("");
  const [accuracy, setAccuracy] = useState(0);

  // Calculate accuracy
  const checkAccuracy = (userTranscription) => {
    // Compare the user's transcription with the correct answer, calculate accuracy
    // Here, we assume the correct answer is "example transcription" for demonstration purposes
    const correctTranscription = "Hi, Minijiang. I am Taylor Swift. Let's learn english together !";
    const calculatedAccuracy = calculateAccuracy(
      userTranscription,
      correctTranscription
    );
    setAccuracy(calculatedAccuracy);
  };

  const calculateAccuracy = (userTranscription, correctTranscription) => {
    const userWords = userTranscription.trim().split(" ");
    const correctWords = correctTranscription.trim().split(" ");
    const wordCount = correctWords.length;
    let correctCount = 0;

    for (let i = 0; i < wordCount; i++) {
      if (userWords[i] && userWords[i] === correctWords[i]) {
        correctCount++;
      }
    }

    return (correctCount / wordCount) * 100;
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h3" component="h1">
        Listen & Type - v0.0.1
      </Typography>
      <Paper className={classes.paper}>
        <div className={classes.audioContainer}>
          <audio
            className={classes.audio}
            controls
            src={defaultAudio}
            type="audio/mpeg"
          />
        </div>
        <TextareaAutosize
          className={classes.textarea}
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          minRows={4}
        />
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => checkAccuracy(transcription)}
        >
          Check Accuracy
        </Button>
        <Typography className={classes.accuracy} component="p">
          Accuracy: {accuracy}%
        </Typography>
      </Paper>
    </Container>
  );
};

export default App;
