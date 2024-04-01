import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PhotoCarousel.css'

const BASE_URL = 'https://photo-technical-test.onrender.com/api/photos'; // Ajusta esto a la URL de tu API

const PhotoCarousel = () => {
    const [photos, setPhotos] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(BASE_URL);
                const data = await response.json();
                console.log("data", data)
                setPhotos(data); // Asegúrate de ajustar esto según la estructura de tu API
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    const filteredPhotos = photos.filter(photo =>
        photo.title.toLowerCase().includes(filter.toLowerCase())
    );

    // Divide las fotos filtradas en filas de hasta 5 elementos
    const photoRows = [];
    for (let i = 0; i < filteredPhotos.length; i += 5) {
        photoRows.push(filteredPhotos.slice(i, i + 5));
    }

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por título..."
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>
            {photoRows.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((photo, photoIndex) => (
                        <div key={photoIndex} className="col">
                            <div className="card card-type">
                                <img src={photo.url} alt={photo.title} className="card-img-top photo-image" />
                                <div className="card-body">
                                    <p className="card-text">{photo.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PhotoCarousel;
