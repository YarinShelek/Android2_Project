import axios from "axios";
import { User } from "../context/UserContext";

let userData: User;

export const setUserData = async (data: User) => {
  console.log(`key inside data recived: ${Object.keys(data)}`);
  userData = data;
};

export const getSavedUser = (): User | null => {
  console.log(`key inside userData: ${Object.keys(userData)}`);
  return userData;
};

export const updateUserCart = async (item: any, operation: string) => {
  let isSuccess = false;
  console.log(userData.cart!.products);
  switch (operation) {
    case "add":
      console.log(`adding ${item.id}`);
      userData.cart.products.push(item);
      console.log(userData.cart.products);
      isSuccess = !isSuccess;
      console.log(isSuccess);
      break;
    case "delete":
      userData.cart.products = userData.cart.products.filter(
        (item) => item.id !== item.id
      );
      isSuccess = !isSuccess;
      console.log(isSuccess);
      break;
    default:
      console.log(isSuccess);
      break;
  }
};

export const cartExists = async () => {
  console.log(`cart: ${userData.cart}`);
};
