import { albumService } from "@/api/axiosInstance";
import { getUsers } from "./UserService";

interface PaginationParams {
  _start?: number;
  _end?: number;
}

export const getAlbums = async (params?: PaginationParams) => {
  const response = await albumService.get("/albums", { params });
  return response.data;
};

export const getAlbumsCount = async () => {
  const response = await albumService.get("/albums");
  return response.data.length;
};

export const getAlbumsWithUsers = async (params?: PaginationParams) => {
  const [albums, users] = await Promise.all([getAlbums(params), getUsers()]);

  // Map albums with user information
  return albums.map((album: any) => ({
    ...album,
    user: users.find((user: any) => user.id === album.userId),
  }));
};
