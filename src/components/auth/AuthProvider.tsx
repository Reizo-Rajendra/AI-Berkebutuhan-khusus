"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { createSession, destroySession } from "@/actions/auth-actions";

export const GUEST_USER = {
  uid: "guest-user",
  displayName: "Pengguna",
  email: "pengguna@polanitas.app",
  photoURL: "/profile/boy.svg",
  reload: async () => {},
  getIdToken: async () => "guest-token",
} as unknown as User;

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: GUEST_USER,
  loading: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(GUEST_USER);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    createSession("guest-user").catch(() => {});

    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            await firebaseUser.reload();
          } catch {}
          setUser(auth.currentUser || firebaseUser);
          createSession(firebaseUser.uid).catch(() => {});
        } else {
          setUser(GUEST_USER);
          createSession("guest-user").catch(() => {});
        }
      });

      return () => unsubscribe();
    } catch {
      setUser(GUEST_USER);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch {}
    setUser(GUEST_USER);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
