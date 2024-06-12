"use client";

import ErrorPage from "@/components/ErrorPage";
import React from "react";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log(error);
  return <ErrorPage reset={reset} />;
};

export default error;
