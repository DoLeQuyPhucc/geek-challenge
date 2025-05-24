import { userService } from "@/api/axiosInstance";

export const getUsers = async () => {
  const response = await userService.get("/users");
  return response.data;
};
