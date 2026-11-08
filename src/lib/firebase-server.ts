/**
 * POLANITAS — Firebase Server-Side DB (No Admin SDK)
 *
 * Initialises a separate Firebase app instance for server-only use
 * (Server Actions, Route Handlers). Avoids browser-only IndexedDB persistence.
 *
 * Uses the same project credentials as the client SDK (NEXT_PUBLIC_*),
 * which are safe to read on the server side.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const SERVER_APP_NAME = "__polanitas_server__";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForPolanitasServer",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "polanitas.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "polanitas",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "polanitas.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

function getServerApp() {
  const existing = getApps().find((a) => a.name === SERVER_APP_NAME);
  if (existing) return existing;
  return initializeApp(firebaseConfig, SERVER_APP_NAME);
}

const serverApp = getServerApp();

// Use "memory" cache so Firestore doesn't try to access IndexedDB on the server
export const db = initializeFirestore(serverApp, {} as any);
