import OpenAI from "openai";
import { db } from "@/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function transcribeAudio(file: File): Promise<string> {
  const response = await openai.audio.transcriptions.create({
    language: "en",
    file: file,
    model: "whisper-1",
  });

  return response.text;
}

async function saveTranscriptionToFirebase(text: string): Promise<void> {
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

export async function handleAudioInput(file: File): Promise<void> {
  const text = await transcribeAudio(file);
  await saveTranscriptionToFirebase(text);
}
