"use client";
import { Container } from "@components/container";
import Navbar from "@components/navbar";
import Recorder from "@components/recorder";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <Container>
        <p>Lorem Ipsum</p>
        <Recorder />
      </Container>
    </>
  );
}
