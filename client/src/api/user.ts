import {
  API_USERS_ALL,
} from "@shared/constants/urls";
import {
  User,
} from "@shared/types/User";
import Http from "@util/http";

export const getAllUsers = async () => {
  console.log("getAllUsers");
  const users: any[] = await Http.Get(API_USERS_ALL);
  return users.map(u => User.fromJSON(u))
}