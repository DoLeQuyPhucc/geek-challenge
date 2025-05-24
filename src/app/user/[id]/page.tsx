import React from "react";
import UserDetailPage from "./UserDetailClient";
import { Metadata } from "next";

// Generate dynamic metadata for user detail page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: userId } = await params;

  return {
    title: `#${userId} Show User`,
  };
}

function page() {
  return <UserDetailPage />;
}

export default page;
