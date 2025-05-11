import SongItem from './SongItem';

export default function SongList({ songs, onPlay }) {
  // Verifica si hay canciones en la lista
  if (songs.length === 0) {
    return <p className="text-gray-500">No hay canciones agregadas.</p>;
  }
// Mapea las canciones y genera un componente SongItem para cada una
  return (
    <ul className="space-y-4">
      {songs.map((song, index) => (
        <SongItem
          key={index}
          song={song}
          onPlay={() => onPlay(index)}
        />
      ))}
    </ul>
  );
}
