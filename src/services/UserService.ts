import { userService, albumService } from "@/api/axiosInstance";

interface PaginationParams {
  _start?: number;
  _end?: number;
}

export const getUsers = async (params?: PaginationParams) => {
  const response = await userService.get("/users", { params });
  return response.data;
};

export const getUserById = async (id: string | number) => {
  const response = await userService.get(`/users/${id}`);
  return response.data;
};

export const getUserAlbums = async (userId: string | number, params?: PaginationParams) => {
  const response = await albumService.get("/albums", { 
    params: { 
      userId, 
      ...params 
    } 
  });
  return response.data;
};
