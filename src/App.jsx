import { useEffect, useState } from "react";
import VideoModal from "./components/VideoModal";
import { ListCanciones } from "./components/listCanciones";
import "./App.css";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  // Cargar canciones desde localStorage o desde mi lista 
  useEffect(() => {
    const storedSongs = localStorage.getItem("songs");

    if (storedSongs) {
      setSongs(JSON.parse(storedSongs));
    } else {
      const defaultSongs = ListCanciones();
      setSongs(defaultSongs);
    }
  }, []);
// Guardar canciones en localStorage 
  const extractVideoId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
// Filtrar canciones según la búsqueda
  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase())
  );
//reproducir la canción
  const handlePlay = (songName) => {
    const updated = songs.map((song) => {
      if (song.name === songName) {
        return { ...song, plays: song.plays + 1 };
      }
      return song;
    });

    setSongs(updated);
    localStorage.setItem("songs", JSON.stringify(updated));

    const songClicked = updated.find((song) => song.name === songName);
    const videoId = extractVideoId(songClicked.url);
    setCurrentVideoId(videoId);
  };

  const handleAdd = () => {
    const trimmedName = newName.trim();
    const trimmedUrl = newUrl.trim();

    if (!trimmedName || !trimmedUrl) {
      alert("Por favor completá ambos campos.");
      return;
    }

    const isValidYouTubeUrl = (url) => {
      return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
    };

    if (!isValidYouTubeUrl(trimmedUrl)) {
      alert("La URL debe ser un enlace válido de YouTube.");
      return;
    }

    const isDuplicate = songs.some(
      (song) =>
        song.name.toLowerCase() === trimmedName.toLowerCase() ||
        song.url === trimmedUrl
    );

    if (isDuplicate) {
      alert("La canción ya está en la lista (por nombre o URL).");
      return;
    }

    const newSong = {
      name: trimmedName,
      url: trimmedUrl,
      plays: 0,
    };

    const updated = [...songs, newSong];
    setSongs(updated);
    localStorage.setItem("songs", JSON.stringify(updated));
    setNewName("");
    setNewUrl("");
  };

  const top3 = [...songs].sort((a, b) => b.plays - a.plays).slice(0, 3);
  const restSongs = [...songs].sort((a, b) => b.plays - a.plays).slice(3);

  return (
  
    <div className="App">
      <div className="container">
        <div className="contenido-superior">
          {/* Lado izquierdo: listado filtrado */}
          <div className="listado">
            <ul>
              {filteredSongs.map((song) => (
                <li key={song.name} onClick={() => handlePlay(song.name)}>
                  {song.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Lado derecho: buscador, video y rankings */}
          <div className="cancionesContainer">
            <input
              type="text"
              className="buscador"
              placeholder="buscar canción 🔍"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <VideoModal
              videoId={currentVideoId}
              onClose={() => setCurrentVideoId(null)}
            />

            <div className="rankingContainer">
              <h3 className="rankingTitulo">Top 3 canciones más reproducidas</h3>
              <ul>
                {top3.map((song, i) => (
                  <li key={i}>
                    {i + 1}. {song.name} ({song.plays} reproducciones)
                  </li>
                ))}
              </ul>

              <h3 className="rankingTitulo">Ranking completo</h3>
              <ul>
                {restSongs.map((song, i) => (
                  <li key={i}>
                    {i + 4}. {song.name} ({song.plays} reproducciones)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sección inferior: agregar canción */}
        <div className="agregar">
          <input
            className="inputAgregar"
            type="text"
            placeholder="Nombre de la canción"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="inputAgregar"
            type="text"
            placeholder="URL de la canción"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button className="buttonAgregar" onClick={handleAdd}>
            Agregar
          </button>
        </div>
      </div>
      </div>
    
  );
}
