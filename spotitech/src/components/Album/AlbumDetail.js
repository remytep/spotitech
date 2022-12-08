import { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import GetAlbumDetailService from "../../services/Album/GetAlbumDetailService";

export default class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { id: props.id, album: [], tracks: [] };
  }
  retrieveAlbumDetail() {
    GetAlbumDetailService.getAll(this.state.id).then((response) =>
      this.setState({
        album: response.data.album,
        tracks: response.data.tracks,
      })
    );
  }
  componentDidMount() {
    this.retrieveAlbumDetail();
  }

  render() {
    const { album, tracks } = this.state;
    return (
      <Container>
        <Card>
          <Card.Header className="d-flex">
            <img src={album.cover} alt="album-cover" />
            <div className="mx-3 d-flex flex-column">
              <h2>{album.name}</h2>
              <p>
                Release Date :{" "}
                {new Date(album.release_date * 1000).toLocaleDateString(
                  "en-US"
                )}
              </p>
              <p>Popularity score : {album.popularity}</p>
              <Card.Text>{album.description}</Card.Text>
            </div>
          </Card.Header>
          <Table hover>
            <thead className="text-center">
              <tr>
                <th className="col-1">Nº</th>
                <th className="col-4">Track Name</th>
                <th className="col-2">Duration</th>
                <th className="col-6">Play</th>
              </tr>
            </thead>
            <tbody>
              {tracks &&
                tracks.map((track) => (
                  <tr key={track.id} className="align-middle text-center">
                    <td>{track.track_no}</td>
                    <td>{track.name}</td>
                    <td>
                      {Math.floor(track.duration / 60) +
                        ":" +
                        (track.duration % 60).toString().padStart(2, "0")}
                    </td>
                    <td>
                      <audio controls>
                        <source src={track.mp3} type="audio/mp3"></source>
                      </audio>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    );
  }
}
