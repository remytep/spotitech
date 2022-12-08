import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import MyNavbar from "./components/MyNavbar";
import AlbumList from "./components/AlbumList/AlbumList";
import ArtistList from "./components/ArtistList/ArtistList";
import GenreList from "./components/GenreList/GenreList";
import Album from "./components/Album/Album";
import Artist from "./components/Artist/Artist";
import Genre from "./components/Genre/Genre";
import Browse from "./components/Browse/Browse";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <MyNavbar></MyNavbar>
          </header>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>;
          <Route exact path="/albums" element={<AlbumList />}></Route>;
          <Route exact path="/albums/:id" element={<Album />}></Route>;
          <Route exact path="/artists" element={<ArtistList />}></Route>;
          <Route exact path="/artists/:id" element={<Artist />}></Route>;
          <Route exact path="/genres" element={<GenreList />}></Route>;
          <Route exact path="/genres/:id" element={<Genre />}></Route>;
          <Route exact path="/browse" element={<Browse />}></Route>;
        </Routes>
      </Router>
    );
  }
}
