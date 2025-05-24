import AlbumDetailPage from "@/app/album/[id]/AlbumDetailClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Album",
};

function page() {
  return <AlbumDetailPage />;
}

export default page;
