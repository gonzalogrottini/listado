# 🎵 Proyecto React: Reproductor de Canciones con localStorage

## 📌 Descripción General

Desarrolla una aplicación en React que permita a los usuarios guardar, visualizar y reproducir canciones de YouTube. Toda la información debe guardarse en `localStorage`, sin necesidad de un back-end. El objetivo es practicar formularios, validaciones, uso de localStorage, modales, filtrado y ordenamiento.

---

## 🧩 Funcionalidades Requeridas

### 1. Formulario para Agregar Canciones

- Dos campos de entrada:

  - **Nombre de la canción** (texto obligatorio).
  - **URL de YouTube** (obligatorio y validado).

- **Validaciones**:

  - La URL debe ser válida y pertenecer a YouTube (`youtube.com` o `youtu.be`).
  - No se deben permitir URLs duplicadas.

- Un botón **"Agregar"** que guarda la canción en `localStorage`.

- Al agregar correctamente:
  - El formulario se limpia.
  - La lista de canciones se actualiza visualmente.

---

### 2. Lista de Canciones Guardadas

Cada canción mostrada debe incluir:

- El **nombre** de la canción.
- Un botón **"Play"**.
- Un **contador** de veces que se ha hecho clic en “Play”.

Los datos deben persistirse en `localStorage`.

---

### 3. Reproducción de Canciones

- Al hacer clic en **"Play"**:

  - Se abre un **modal** con el video de YouTube incrustado.
  - El contador de reproducciones se incrementa automáticamente.

- Para mostrar el video, se recomienda el uso del web component [`lite-youtube`](https://github.com/paulirish/lite-youtube-embed) para mejorar el rendimiento.

---

### 4. Buscador

- Un campo de búsqueda por nombre de canción.
- La lista se debe filtrar dinámicamente mientras el usuario escribe.

---

### 5. Botón de Ordenamiento

- Un botón que ordene las canciones por **cantidad de reproducciones** de forma descendente.
- No es necesario que se mantenga el orden al refrescar la página, a menos que desees persistirlo.

---

## ✅ Requisitos Técnicos

- React con componentes funcionales.
- Hooks (`useState`, `useEffect`, etc.).
- Almacenamiento persistente con `localStorage`.
- Modularización de componentes.
- Validaciones de formulario.
- Modal para el video (propio o con librerías como `react-modal`).
- Estilos básicos con CSS, Tailwind, Bootstrap o similar.

---

## 💡 Extras Opcionales

- Animaciones suaves al abrir/cerrar el modal.
- Alerta visual al detectar errores (URL duplicada o inválida).
- Tema claro/oscuro.
- Opción para eliminar canciones.

---

## **Modalidad de entrega.**

- Fecha límite: **Domingo 11 de Mayo a las 22:00hs**.
- Por medio de whatsapp, enviar:
  - Nombre y apellido.
  - Link al repositorio de GitHub.
  - Link a la demo del proyecto (puede ser en Netlify, Vercel, etc.).

## **Criterios de evaluación**

- Entrega en tiempo y forma.
- Cumplimiento de los requisitos funcionales y técnicos.
- Calidad del código (modularidad, legibilidad, uso de hooks, etc.).
- Accesibilidad y semántica del HTML.
- Uso adecuado de `localStorage`.
- Validaciones y manejo de errores.
- Uso de buenas prácticas en React.
- Experiencia de usuario (interfaz, usabilidad, etc.).
