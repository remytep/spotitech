import { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import GetGenreDetailService from "../../services/Genre/GetGenreDetailService";
import GetAlbumDetailService from "../../services/Album/GetAlbumDetailService";

export default class GenreDetail extends Component {
  constructor(props) {
    super(props);
    this.retrieveAlbumList = this.retrieveAlbumList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.state = {
      id: this.props.id,
      genre: [],
      albumsId: [],
      albums: [],
      page: 1,
      limit: 12,
      count: 0,
    };
    this.limits = [12, 24, 48, 96];
  }
  componentDidMount() {
    this.retrieveAlbumList();
  }

  retrieveAlbumList() {
    const { id, page, limit } = this.state;

    console.log(limit);
    GetGenreDetailService.getAll(id).then((response) => {
      this.setState(
        {
          genre: response.data.genre,
          albumsId: response.data.albums.slice(
            limit * (page - 1),
            limit * page
          ),
          count: Math.ceil(response.data.albums.length / limit),
        },
        () => {
          this.retrieveAlbumInfo();
        }
      );
    });
  }

  retrieveAlbumInfo() {
    const { albumsId } = this.state;
    const promiseGroup = albumsId.map((id) => GetAlbumDetailService.getAll(id));
    Promise.all(promiseGroup).then((response) => {
      this.setState({ albums: response.map((r) => r.data.album) });
    });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveAlbumList();
      }
    );
  }
  handlePageSizeChange(event) {
    this.setState(
      {
        limit: +event.target.value,
        page: 1,
      },
      () => {
        console.log(this.state);
        this.retrieveAlbumList();
      }
    );
  }
  render() {
    const { albums, page, limit, count, genre } = this.state;
    return (
      <Container>
        <Card>
          <Card.Header>
            <h2>{genre.name + " albums"}</h2>
            <Form>
              <Form.Label> Results per Page: </Form.Label>
              <Form.Select onChange={this.handlePageSizeChange} value={limit}>
                {this.limits.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Form.Select>
            </Form>
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
          <Card.Footer className="d-flex justify-content-center">
            <Pagination
              count={count}
              page={page}
              siblingCount={2}
              boundaryCount={2}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}
