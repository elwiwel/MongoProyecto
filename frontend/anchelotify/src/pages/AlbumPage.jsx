import "./AlbumPage.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Song from "../components/Song.jsx";

function AlbumPage() {

    return (
        <div className="album-page">

            <Header />

            <div className="album-content">
                <div className="album-header">
                    <h1></h1>
                </div>

                <div className="track-list">
                    <Song
                        number={1}
                        title={"Song Title 1"}
                        artist={"Artist 1"}
                        />
                   {/** {tracks.map(track => (
                    <Song
                        key={track.id || track.nombre} // ⬅️ IMPORTANTE
                        number={track.number}
                        title={track.title}
                        artist={track.artist}
                        duration={track.duration}
                    />
                ))}  */}
                </div>
            </div>

        </div>
    )
}

export default AlbumPage;