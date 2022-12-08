import { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import GetAlbumDetailService from "../../services/Album/GetAlbumDetailService";
import CountAlbumsService from "../../services/AlbumList/CountAlbumsService";

export default class RandomListing extends Component {
  constructor() {
    super();
    this.state = { albumsId: [], albums: [], count: 0 };
  }
  componentDidMount() {
    this.retrieveAlbumList();
  }
  retrieveAlbumList() {
    CountAlbumsService.getAll().then((response) => {
      this.setState({ count: response.data.length }, () => {
        const { count } = this.state;
        this.setState(
          {
            albumsId: [...Array(12)].map(() => {
              return Math.floor(Math.random() * count);
            }),
          },
          () => {
            this.retrieveAlbumInfo();
          }
        );
      });
    });
  }

  retrieveAlbumInfo() {
    const { albumsId } = this.state;
    const promiseGroup = albumsId.map((id) => GetAlbumDetailService.getAll(id));
    Promise.all(promiseGroup).then((response) => {
      this.setState({ albums: response.map((r) => r.data.album) });
    });
  }

  render() {
    const { albums } = this.state;
    return (
      <Container>
        <Card>
          <Card.Header>
            <h2>Welcome to Spotitech</h2>
            <Card.Text>
              Here is a selection of 12 random albums we think you will like
            </Card.Text>
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
