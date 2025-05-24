import { albumService } from "@/api/axiosInstance";
import { getUsers } from "./UserService";

export const getAlbums = async () => {
  const response = await albumService.get("/albums");
  return response.data;
};

export const getAlbumsWithUsers = async () => {
  const [albums, users] = await Promise.all([getAlbums(), getUsers()]);

  // Map albums with user information
  return albums.map((album: any) => ({
    ...album,
    user: users.find((user: any) => user.id === album.userId),
  }));
};
