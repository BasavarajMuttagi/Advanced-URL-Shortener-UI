import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getToken } from "../hooks/useAuth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
