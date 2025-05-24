import { albumService } from "@/api/axiosInstance";
import { getUsers } from "./UserService";

interface PaginationParams {
  _start?: number;
  _end?: number;
}

interface Album extends Record<string, unknown> {
  id: number;
  title: string;
  userId: number;
}

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface AlbumWithUser extends Album {
  user?: User;
}

export const getAlbums = async (params?: PaginationParams): Promise<Album[]> => {
  const response = await albumService.get("/albums", { params });
  return response.data;
};

export const getAlbumsCount = async (): Promise<number> => {
  const response = await albumService.get("/albums");
  return response.data.length;
};

export const getAlbumsWithUsers = async (params?: PaginationParams): Promise<AlbumWithUser[]> => {
  const [albums, users] = await Promise.all([getAlbums(params), getUsers()]);

  // Map albums with user information
  return albums.map((album: Album) => ({
    ...album,
    user: users.find((user: User) => user.id === album.userId),
  }));
};
