import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

import { LoggedInUser } from "@/types";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginUser } from "@/services/auth";

interface AuthContextType {
  user: LoggedInUser | null;
  token: string | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

// Keys used in SecureStore and AsyncStorage
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const REMEMBER_ME_KEY = "remember_me";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        const rememberMe = await AsyncStorage.getItem(REMEMBER_ME_KEY);

        const storedUser = await AsyncStorage.getItem(USER_KEY);

        if (rememberMe === "true" && token && storedUser) {
          setToken(token);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => {
    try {
      const response = await loginUser(email, password);

      setUser(response.user);
      setToken(response.token);

      if (rememberMe) {
        await SecureStore.setItemAsync(TOKEN_KEY, response.token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
        await AsyncStorage.setItem(REMEMBER_ME_KEY, "true");
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    await AsyncStorage.multiRemove([USER_KEY, REMEMBER_ME_KEY]);

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
