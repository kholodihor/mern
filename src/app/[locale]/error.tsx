"use client";

import ErrorPage from "@/components/shared/error-page";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log(error);
  return <ErrorPage reset={reset} />;
};

export default error;
