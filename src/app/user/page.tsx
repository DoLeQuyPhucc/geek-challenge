import UserClient from "@/app/user/UserClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User",
};

function page() {
  return <UserClient />;
}

export default page;
