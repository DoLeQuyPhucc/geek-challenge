import React from "react";
import UserDetailPage from "./UserDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
};

function page() {
  return <UserDetailPage />;
}

export default page;
