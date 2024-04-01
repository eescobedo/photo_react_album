import React, { useState, useEffect } from 'react';
import { fetchPhotos } from '../api/metaPhotoService';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        const data = await fetchPhotos();
        setPhotos(data);
      } catch (error) {
        console.error("Error loading photos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  if (loading) return <p>Loading photos...</p>;

  return (
    <div>
      <h2>Photos</h2>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;

