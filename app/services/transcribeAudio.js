import OpenAI from "openai";
import { db } from "@/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

require("dotenv").config();

const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

async function transcribeAudio(file) {
  const response = await openai.audio.transcriptions.create({
    language: "en",
    file: file,
    model: "whisper-1",
  });

  return response.text;
}

async function saveTranscriptionToFirebase(text) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No user found");
    return;
  }

  try {
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      transcriptions: arrayUnion({
        text: text,
        created: Date.now(),
      }),
    });
    console.log("Transcription added to user document");
  } catch (e) {
    console.error("Error updating user document: ", e);
  }
}

export async function handleAudioInput(file) {
  const text = await transcribeAudio(file);
  await saveTranscriptionToFirebase(text);
}
