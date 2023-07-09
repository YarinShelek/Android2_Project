import axios from "axios";
import { User } from "../context/UserContext";

let userData: User;

export const setUserData = async (data: User) => {
  userData = data;
};

export const getSavedUser = (): User | null => {
  return userData;
};
