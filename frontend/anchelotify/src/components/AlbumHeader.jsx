import './AlbumHeader.css';

function AlbumHeader({ title, artist, year, img }) {
    return (
        <div id="album-header">
            <img src={img} alt={title} id="album-cover" />
            <div id="album-info">
                <h1 id="album-title">{title}</h1>
                <div id="sec-info">
                    <h2 id="album-artist">{artist}</h2>
                    <h3 id="album-year">{year}</h3>
                </div>
            </div>
        </div>
    );
}

export default AlbumHeader;