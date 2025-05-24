import AlbumDetailPage from "@/app/album/[id]/AlbumDetailClient";
import { Metadata } from "next";
import React from "react";

// Generate dynamic metadata for album detail page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: albumId } = await params;

  return {
    title: `#${albumId} Show Album`,
  };
}

function page() {
  return <AlbumDetailPage />;
}

export default page;
