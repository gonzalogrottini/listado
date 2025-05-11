import { useState } from 'react';

export default function SongForm({ onAdd, songs }) {
  
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

// Funcion que valida si la URL ingresada es de YouTube
  const isValidYouTubeUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  };
//mensaje de error 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !url.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setError('La URL debe ser de YouTube');
      return;
    }

    //verifico si esta la cancion
    const isDuplicate = songs.some(song => song.url === url);
    if (isDuplicate) {
      setError('Ya agregaste esta canción');
      return;
    }

    onAdd({ name: name.trim(), url: url.trim(), plays: 0 });
    setName('');
    setUrl('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <input
        type="text"
        placeholder="Nombre de la canción"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block mb-2 w-full border p-2"
      />
      <input
        type="text"
        placeholder="URL de YouTube"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="block mb-2 w-full border p-2"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Agregar
      </button>
    </form>
  );
}
