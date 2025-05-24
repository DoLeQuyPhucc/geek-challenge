import axios from "axios";

const createApiInstance = (baseURL?: string, customHeaders = {}) => {
  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is required");
  }
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });
};

export const albumService = createApiInstance(process.env.NEXT_PUBLIC_BASE_URL);
export const userService = createApiInstance(process.env.NEXT_PUBLIC_BASE_URL);
export const userAvatarService = createApiInstance(
  process.env.NEXT_PUBLIC_BASE_URL
);
