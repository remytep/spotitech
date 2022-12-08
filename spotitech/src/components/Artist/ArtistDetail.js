import { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import GetArtistDetailService from "../../services/Artist/GetArtistDetailService";
import GetArtistAlbumsService from "../../services/Artist/GetArtistAlbumsService";

export default class ArtistDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { id: props.id, artist: [], albums: [] };
  }
  retrieveArtistDetail() {
    GetArtistDetailService.getAll(this.state.id).then((response) =>
      this.setState({
        artist: response.data,
      })
    );
    GetArtistAlbumsService.getAll(this.state.id).then((response) =>
      this.setState({
        albums: response.data,
      })
    );
  }
  componentDidMount() {
    this.retrieveArtistDetail();
  }

  render() {
    const { artist, albums } = this.state;
    return (
      <Container>
        <Card>
          <Card.Header className="d-flex">
            <img src={artist.photo} alt="artist" />
            <div className="mx-3 d-flex flex-column">
              <h2>{artist.name}</h2>
              <h4>{artist.description}</h4>
              <Card.Text>{artist.bio}</Card.Text>
            </div>
          </Card.Header>
          <Card.Body className="d-flex flex-wrap">
            {albums &&
              albums.map((album) => (
                <Card
                  key={album.id}
                  className="m-2 flex-auto"
                  style={{ width: "25rem", height: "40rem" }}
                >
                  <Card.Header className="d-flex flex-column">
                    <Card.Img
                      className="my-3"
                      src={album.cover}
                      variant="top"
                      style={{ width: "12rem", height: "12rem" }}
                    />
                    <Card.Title>{album.name}</Card.Title>
                    <p>
                      {"Released: " +
                        new Date(album.release_date * 1000).toLocaleDateString(
                          "en-US"
                        )}
                    </p>
                    <p>Popularity score : {album.popularity}</p>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="text-truncate-custom">
                      {album.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-center">
                    <Link
                      className="btn btn-primary"
                      to={"/albums/" + album.id}
                    >
                      See more
                    </Link>
                  </Card.Footer>
                </Card>
              ))}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
