"use client";
import { Container } from "@components/container";
import Navbar from "@components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Acerca() {
  return (
    <>
      <Navbar />
      <Container>
        <h1>
          Prototipo funcional de transcriptor automático de la lengua de señas.
        </h1>
        <p>
          Este proyecto presenta un prototipo funcional de un transcriptor del
          lenguaje de señas chilena (LSCh), con tecnologías de inteligencia
          artificial.
        </p>

        <h2>¿Como Funciona?</h2>
        <p>
          El prototipo consta de una interfaz web que permite grabar un video
          con la cámara web del dispositivo, para posteriormente transcribir el
          contenido del video a texto. El usuario deberá realizar un gesto
          correspondiente a una letra del abecedario en lengua de señas chilena,
          para que el sistema pueda transcribirlo.
        </p>

        <h2>Limitancias</h2>
        <p>
          El prototipo presenta limitaciones en la precisión de la transcripción
          debido a la calidad de la grabación y la variabilidad de los gestos
          realizados por el usuario. Se recomienda realizar gestos claros y
          precisos para obtener una mejor transcripción. El prototipo se
          encuentra en una etapa temprana de desarrollo y presenta limitaciones
          en la cantidad de gestos que puede transcribir.
        </p>

        <h2>¿Cuales gestos admite por el momento?</h2>
        <p>
          El prototipo admite la transcripción de los siguientes gestos en
          lengua de señas chilena:
        </p>
        <ul>
          <li>Buenas Noches</li>
          <li>Buenas Tardes</li>
          <li>Buenos Días</li>
          <li>Chao</li>
          <li>Como Estas</li>
          <li>Como Esta Tu Salud</li>
          <li>Como Esta Usted</li>
          <li>Como Puedo Llegar Al Centro</li>
          <li>Como Te Llamas</li>
          <li>Cual Es Tu Apellido</li>
          <li>Cual Es Tu Nombre</li>
          <li>Donde Trabajas</li>
          <li>Hola Como Están Ustedes</li>
        </ul>

        <h2>¿Como se realizo?</h2>
        <p>
          El prototipo fue desarrollado por un grupo de estudiantes de la
          Universidad Tecnológica Metropolitana de Santiago de Chile. El
          prototipo utiliza tecnologías de inteligencia artificial
          (Tensorflow.js) para el reconocimiento de gestos en lengua de señas
          chilena, además de librerías de apoyo como MediaPipe.
        </p>
      </Container>
    </>
  );
}
