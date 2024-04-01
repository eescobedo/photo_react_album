import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PhotoCarousel.css'

const BASE_URL = 'https://photo-technical-test.onrender.com/api/photos'; // Ajusta esto a la URL de tu API

const PhotoCarousel = () => {
    const [photos, setPhotos] = useState([]);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                console.log("limit", limit);
                console.log("currentPage", currentPage);
                console.log("offset", offset);

                const url = `${BASE_URL}?offset=${offset}&limit=${limit}`;
                const response = await fetch(url);
                const data = await response.json();
                console.log("data", data)
                setPhotos(data);
                setTotalPages(10);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, [limit, offset]);

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
            <div className="row">
                <div className="col-md-3">
                    <div className="sidebar">
                        <input
                            type="number"
                            className="form-control mb-2"
                            value={offset}
                            onChange={(e) => setOffset(Number(e.target.value))}
                            placeholder="Offset de elementos"
                        />
                        <input
                            type="number"
                            className="form-control mb-2"
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            placeholder={`Mostrar ${limit} fotos por página`}
                        />

                        {/*<button*/}
                        {/*    className="btn btn-primary mb-2"*/}
                        {/*    onClick={() => setCurrentPage(currentPage - 1)}*/}
                        {/*    disabled={currentPage === 1}*/}
                        {/*>*/}
                        {/*    Anterior*/}
                        {/*</button>*/}
                        {/*<button*/}
                        {/*    className="btn btn-primary mb-2"*/}
                        {/*    onClick={() => setCurrentPage(currentPage + 1)}*/}
                        {/*    disabled={currentPage === totalPages}*/}
                        {/*>*/}
                        {/*    Siguiente*/}
                        {/*</button>*/}
                        {/*<div>Página {currentPage} de {totalPages}</div>*/}
                    </div>
                </div>
                <div className="col-md-9">
                    <div className={"photo-grid"}>
                        {/*{photoRows.map((row, rowIndex) => (*/}
                        {/*    <div key={rowIndex} className="photo-row">*/}
                        {/*        {row.map((photo, photoIndex) => (*/}
                        {/*            <div key={photoIndex} className="photo-card">*/}
                        {/*                <img src={photo.url} alt={photo.title} className="photo-image" />*/}
                        {/*                <div className="photo-title">{photo.title}</div>*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*))}*/}
                             {photoRows.map((row, rowIndex) => (
                                <div key={rowIndex} className="row">
                                    {row.map((photo, photoIndex) => (
                                        <div key={photoIndex} className="photo-item">
                                            <div className="card card-title">
                                                <img src={photo.url} alt={photo.title} className="card-img-top photo-image" />
                                                <div className="card-body ">
                                                    <p className="card-text">{photo.title}</p>
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




            // <div className="container mt-5">
        //     <div className="row mb-3">
        //         <div className="col">
        //             <input
        //                 type="text"
        //                 className="form-control"
        //                 placeholder="Buscar por título..."
        //                 onChange={(e) => setFilter(e.target.value)}
        //             />
        //         </div>
        //     </div>
        //     {photoRows.map((row, rowIndex) => (
        //         <div key={rowIndex} className="row">
        //             {row.map((photo, photoIndex) => (
        //                 <div key={photoIndex} className="col">
        //                     <div className="card card-type">
        //                         <img src={photo.url} alt={photo.title} className="card-img-top photo-image" />
        //                         <div className="card-body">
        //                             <p className="card-text">{photo.title}</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     ))}
        // </div>
    );
};

export default PhotoCarousel;
