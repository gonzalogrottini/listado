import { useEffect, useState } from "react";
import VideoModal from "./components/VideoModal";
import { ListCanciones } from "./components/listCanciones";
import "./App.css";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [currentSongName, setCurrentSongName] = useState(null);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [ascendente, setAscendente] = useState(false);

  useEffect(() => {
    const storedSongs = localStorage.getItem("songs");
    if (storedSongs) {
      setSongs(JSON.parse(storedSongs));
    } else {
      const defaultSongs = ListCanciones();
      setSongs(defaultSongs);
    }
  }, []);

  const extractVideoId = (url) => {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handlePlay = (songName) => {
    const song = songs.find((s) => s.name === songName);
    const videoId = extractVideoId(song.url);
    setCurrentVideoId(videoId);
    setCurrentSongName(songName);
  };

  const handleCloseVideo = () => {
    if (currentSongName) {
      const updated = songs.map((song) =>
        song.name === currentSongName
          ? { ...song, plays: song.plays + 1 }
          : song
      );
      setSongs(updated);
      localStorage.setItem("songs", JSON.stringify(updated));
      setCurrentSongName(null);
    }
    setCurrentVideoId(null);
  };

  const handleAdd = () => {
    const trimmedName = newName.trim();
    const trimmedUrl = newUrl.trim();

    if (!trimmedName || !trimmedUrl) {
      alert("Por favor completá ambos campos.");
      return;
    }

    const isValidYouTubeUrl = (url) =>
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);

    if (!isValidYouTubeUrl(trimmedUrl)) {
      alert("La URL debe ser un enlace válido de YouTube.");
      return;
    }

    const isDuplicate = songs.some(
      (song) =>
        song.name.toLowerCase() === trimmedName.toLowerCase() ||
        song.url === trimmedUrl
    );

    // 🎯 Validación de que el nombre no sea una URL
    const isValidName = !/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i.test(trimmedName);
    if (!isValidName) {
      alert("El nombre de la canción no puede ser una URL.");
      return;
    }

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

  // 🎯 Aplicar filtro SOLO a la lista izquierda
  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 Ranking derecha: sin filtro, solo ordenado
  const sortedSongs = [...songs].sort((a, b) =>
    ascendente ? a.plays - b.plays : b.plays - a.plays
  );

  return (
    <div className="App">
      <div className="container">
        <div className="contenido-superior">
          <div className="listado">
            <ul>
              {filteredSongs.map((song) => (
                <li key={song.name} onClick={() => handlePlay(song.name)}>
                  {song.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="cancionesContainer">
            <VideoModal videoId={currentVideoId} onClose={handleCloseVideo} />

            <input
              type="search"
              className="buscador"
              placeholder="buscar canción 🔍"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="botonOrden"
              onClick={() => setAscendente(!ascendente)}
            >
              Ordenar {ascendente ? " Menor a mayor" : " Mayor a menor"}
            </button>

            <div className="rankingContainer">
              <h3 className="rankingTitulo">Ranking de canciones</h3>
              <ul>
                {sortedSongs.map((song, i) => (
                  <li key={i}>
                    {i + 1}. {song.name} ({song.plays} reproducciones)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="agregar">
          <input
            className="inputAgregar"
            type="search"
            placeholder="Nombre de la canción"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="inputAgregar"
            type="search"
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
