import { Component } from "react";
import Pagination from "@mui/material/Pagination";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import GetArtistsService from "../../services/ArtistList/GetArtistsService";
import CountArtistsService from "../../services/ArtistList/CountArtistsService";

export default class ArtistList extends Component {
  constructor() {
    super();
    this.retrieveArtistList = this.retrieveArtistList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.state = { artists: [], page: 1, limit: 12, count: 0 };
    this.limits = [12, 24, 48, 96];
  }
  componentDidMount() {
    this.retrieveArtistList();
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
  retrieveArtistList() {
    const { page, limit } = this.state;
    const params = this.getRequestParams(page, limit);
    GetArtistsService.getAll(params).then((response) => {
      this.setState({ artists: response.data });
    });
    CountArtistsService.getAll().then((response) =>
      this.setState({ count: Math.ceil(response.data.length / limit) })
    );
  }
  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveArtistList();
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
        this.retrieveArtistList();
      }
    );
  }
  render() {
    const { artists, page, limit, count } = this.state;
    return (
      <Container>
        <Card>
          <Card.Header>
            <h2>Artists</h2>
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
              {artists &&
                artists.map((artist) => (
                  <Card
                    key={artist.id}
                    className="m-2 flex-auto photos"
                    style={{
                      width: "25rem",
                      height: "35rem",
                    }}
                  >
                    <Card.Header className="d-flex flex-column align-items-center">
                      <Card.Img
                        className="my-3"
                        src={artist.photo}
                        variant="top"
                        style={{ width: "12rem", height: "12rem" }}
                      />
                      <Card.Title>{artist.name}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <h5>{artist.description.toLowerCase()}</h5>
                      <Card.Text className="text-truncate-custom">
                        {artist.bio}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-center">
                      <Link
                        className="btn btn-primary"
                        to={"/artists/" + artist.id}
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
