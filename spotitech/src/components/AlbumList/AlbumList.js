import { Component } from "react";
import Pagination from "@mui/material/Pagination";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import GetAlbumsService from "../../services/AlbumList/GetAlbumsService";
import CountAlbumsService from "../../services/AlbumList/CountAlbumsService";

export default class AlbumList extends Component {
  constructor() {
    super();
    this.retrieveAlbumList = this.retrieveAlbumList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.state = { albums: [], page: 1, limit: 12, count: 0 };
    this.limits = [12, 24, 48, 96];
  }
  componentDidMount() {
    this.retrieveAlbumList();
  }
  getRequestParams(page, limit) {
    let params = {};
    if (page) {
      params["page"] = page;
    }
    if (limit) {
      params["limit"] = limit;
    }
    return params;
  }
  retrieveAlbumList() {
    const { page, limit } = this.state;
    const params = this.getRequestParams(page, limit);
    GetAlbumsService.getAll(params).then((response) => {
      this.setState({ albums: response.data });
    });
    CountAlbumsService.getAll().then((response) =>
      this.setState({ count: Math.ceil(response.data.length / limit) })
    );
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
        limit: event.target.value,
        page: 1,
      },
      () => {
        this.retrieveAlbumList();
      }
    );
  }
  render() {
    const { albums, page, limit, count } = this.state;
    //console.log(albums)
    return (
      <Container>
        <Card>
          <Card.Header>
            <h2>Albums</h2>
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
