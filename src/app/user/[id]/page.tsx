import React from "react";
import UserDetailPage from "./UserDetailClient";
import { Metadata } from "next";

// Generate dynamic metadata for user detail page
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const userId = params.id;

  return {
    title: `#${userId} Show User`,
  };
}

function page() {
  return <UserDetailPage />;
}

export default page;
