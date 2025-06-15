"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("/landing/index.html");
  }, []);
  return null;
}