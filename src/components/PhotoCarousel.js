import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PhotoCarousel.css'

const BASE_URL = process.env.REACT_APP_API_URL;

const PhotoCarousel = () => {
    const [photos, setPhotos] = useState([]);
    const [filter, setFilter] = useState('');
    const [offset, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [offset2, setOffset] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [titleFilter, setTitleFilter] = useState('');
    const [albumTitleFilter, setAlbumTitleFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                console.log("limit", limit);
                console.log("currentPage", offset);
                console.log("offset2", offset2);
                const newOffset = offset - 1;

                const params = new URLSearchParams();
                console.log(encodeURIComponent(titleFilter));
                if (titleFilter) params.append('title',(titleFilter));
                if (albumTitleFilter) params.append('album.title', albumTitleFilter);
                if (emailFilter) params.append('album.user.email', emailFilter);
                if (offset) params.append('offset', newOffset.toString());
                if (limit) params.append('limit', limit.toString());

                const paramString = params.toString().replace(/\+/g, '%20');
                console.log("paramString", paramString);
                const apiUrl = `${BASE_URL}?${paramString.toString()}`;

                // const url = `${BASE_URL}?offset=${offset}&limit=${limit}`;
                const url = apiUrl;
                const response = await fetch(url);
                const data = await response.json();
                console.log("data", data)
                setPhotos(data.photos);
                const total = Math.ceil(data.total / limit);
                setTotalPages(total);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, [limit, offset, titleFilter, albumTitleFilter, emailFilter]);

    const handleKeyDown = (e) => {
        if (e.keyCode === 8 && e.target.value <= 1) {
            // Backspace key pressed
            e.preventDefault();
            setCurrentPage(1);
        }
    };

    const filteredPhotos = photos.filter(photo =>
        photo.title.toLowerCase().includes(filter.toLowerCase())
    );

    const handleEmailFilterChange = (e) => {
        setEmailFilter(e.target.value);
        setCurrentPage(1);
    }

    const handleTitleFilterChange = (e) => {
        setTitleFilter(e.target.value);
        setCurrentPage(1);
    }

    const handleAlbumTitleFilterChange = (e) => {
        setAlbumTitleFilter(e.target.value);
        setCurrentPage(1);
    }

    const photoRows = [];
    for (let i = 0; i < filteredPhotos.length; i += 5) {
        photoRows.push(filteredPhotos.slice(i, i + 5));
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <div className="sidebar-filters">
                        <div className="mb-3">
                            <label htmlFor="titleFilter" className="form-label filter-label">Ingrese título:</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={titleFilter}
                                onChange={handleTitleFilterChange}
                                placeholder="Filtrar por título"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="albumTitleFilter" className="form-label filter-label">Ingrese título de álbum:</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={albumTitleFilter}
                                onChange={handleAlbumTitleFilterChange}
                                placeholder="Filtrar por título de álbum"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailFilter" className="form-label filter-label">Ingrese email:</label>
                            <input
                                type="email"
                                className="form-control mb-2"
                                value={emailFilter}
                                onChange={handleEmailFilterChange}
                                placeholder="Filtrar por email"

                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="titleOffset" className="form-label filter-label">Número de página</label>
                            <input
                                type="number"
                                className="form-control mb-2"
                                value={offset}
                                min={1}
                                onChange={(e) =>
                                    {
                                        const newValue = Number(e.target.value);
                                        setCurrentPage(newValue >= 1 ? newValue : 1);
                                    }
                                }
                                placeholder="Offset de elementos"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="titleLimite" className="form-label filter-label">Cantidad de elementos</label>
                            <input
                                type="number"
                                className="form-control mb-2"
                                value={limit}
                                onChange={(e) => {
                                        const newValue = Number(e.target.value);
                                        setLimit(newValue >= 1 ? newValue : 1);
                                    }
                                }
                                placeholder={`Mostrar ${limit} fotos por página`}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="pagination-buttons">
                        <button
                            className="btn btn-primary mb-2 button-previous button-pagination"
                            onClick={() => setCurrentPage(offset - 1)}
                            disabled={offset === 1}
                        >
                            Anterior
                        </button>
                        <button
                            className="btn btn-primary mb-2 button-pagination"
                            onClick={() => setCurrentPage(offset + 1)}
                            disabled={offset === totalPages}
                        >
                            Siguiente
                        </button>
                        </div>
                        <div>Página {offset} de {totalPages}</div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className={"photo-grid"}>

                        {photoRows.map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {row.map((photo, photoIndex) => (
                                    <div key={photoIndex} className="photo-card photo-item card-type">
                                        <div className="card card-title">
                                                <img src={photo.url} alt={photo.title} className="card-img-top photo-image" />
                                                <div className="card-body ">
                                                    <h5 className="card-title">{photo.title}</h5>
                                                    <p className="album-title card-text">Álbum: {photo.album?.title}</p>
                                                    <p className="email card-text">email: {photo.user?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PhotoCarousel;
