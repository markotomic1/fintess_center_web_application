"use client";
import { useEffect, useState } from "react";

export default function useStorageToken() {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("token")
      : null
  );

  useEffect(() => {
    function handleChangeStorage() {
      setToken(localStorage.getItem("token"));
    }

    window.addEventListener("storage", handleChangeStorage);
    return () => window.removeEventListener("storage", handleChangeStorage);
  }, []);

  return token;
}
