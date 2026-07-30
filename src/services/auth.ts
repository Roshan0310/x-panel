import loginData from "@/data/login.json";
import { LoginResponse } from "@/types";

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  // Cheriya delay idaam
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (email.toLowerCase() !== loginData.user.email.toLowerCase()) {
    throw new Error("Invalid email");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  return loginData;
};
