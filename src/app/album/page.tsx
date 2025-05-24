import AlbumClient from "@/app/album/AlbumClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Album",
};

function page() {
  return <AlbumClient />;
}

export default page;
