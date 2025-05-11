// src/components/listCanciones.js

export function ListCanciones() {
  const stored = localStorage.getItem("songs");
  if (stored) {
    return JSON.parse(stored);
  } else {
    const defaultSongs = [
      {
        name: "Luck Ra, Khea - HOLA PERDIDA",
        url: "https://www.youtube.com/watch?v=CnuFA6PkOT8",
        plays: 0,
      },
      {
        name: "Tiago PZK, Ke Personajes - Piel",
        url: "https://www.youtube.com/watch?v=DI71FIdguUs",
        plays: 0,
      },
      {
        name: "LUNA - Feid",
        url: "https://www.youtube.com/watch?v=x2oUajHp8pg",
        plays: 0,
      },
      {
        name: "QUE ME FALTE TODO - Luck Ra",
        url: "https://www.youtube.com/watch?v=MAxuiSvA9hM",
        plays: 0,
      },
      {
        name: "Una Foto Remix (feat. Emilia) - Mesita",
        url: "https://www.youtube.com/watch?v=LWdAMW_4Yq0",
        plays: 0,
      },
      {
        name: "Solo Gata - FloyyMenor",
        url: "https://www.youtube.com/watch?v=-r687V8yqKY",
        plays: 0,
      },
      {
        name: "La_Original.mp3 - Emilia",
        url: "https://www.youtube.com/watch?v=rIcZ6X0jIl4",
        plays: 0,
      },
      {
        name: "Perdonarte, ¿Para Qué? - Los Ángeles Azules",
        url: "https://www.youtube.com/watch?v=beH6uqy6Xsw",
        plays: 0,
      },
      {
        name: "Tal Para Cual - Salastkbron",
        url: "https://www.youtube.com/watch?v=1F6JJBCEpMY",
        plays: 0,
      },
      {
        name: "Un Besito Más - Salastkbron",
        url: "https://www.youtube.com/watch?v=50t98Bqtsm4",
        plays: 0,
      },
    ];

    localStorage.setItem("songs", JSON.stringify(defaultSongs));
    return defaultSongs;
  }
}
