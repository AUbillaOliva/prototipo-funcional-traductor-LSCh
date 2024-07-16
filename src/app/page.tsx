"use client";
import React from "react";
import { Container } from "./components/container";
import Navbar from "./components/navbar";
import Recorder from "./components/recorder";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container>
        <Recorder />
      </Container>
    </>
  );
}
