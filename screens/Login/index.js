import React from "react";
import LoginCard from "./loginCard";
import UserLayout from "@components/UserLayout";

export default function Login() {
  return (
    <UserLayout displayGoBack alwayCompany>
      <LoginCard />
    </UserLayout>
  );
}
