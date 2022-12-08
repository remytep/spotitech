import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import GetBrowseResultService from "../../services/Browse/GetBrowseResultService";

export default class Browse extends Component {
  constructor() {
    super();
    this.limits = [12, 24, 48, 96];
    this.state = {
      searchInput: "",
      searchType: "artist",
      limit: 12,
      page: 1,
      count: 0,
      searchResult: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state);
    this.searchQuery();
  }
  handleInputChange(event) {
    this.setState({
      searchInput: event.target.value,
    });
  }
  handleTypeChange(event) {
    this.setState({
      searchType: event.target.value,
    });
  }
  handlePageSizeChange(event) {
    this.setState({
      limit: event.target.value,
      page: 1,
    });
  }
  getRequestParams(searchInput, searchType) {
    let params = {};
    if (searchInput) {
      params["query"] = searchInput;
    }
    if (searchType) {
      params["type"] = searchType;
    }
    return params;
  }
  searchQuery() {
    const { searchInput, searchType } = this.state;
    const params = this.getRequestParams(searchInput, searchType);
    console.log(params);
    GetBrowseResultService.getAll(params).then((response) => {
      console.log(response.data);
      if (response.data.artists.length > 0) {
        this.setState({
          searchResult: response.data.artists,
          count: response.data.artists.length,
        });
      } else if (
        response.data.albums !== undefined &&
        response.data.albums.length > 0
      ) {
        this.setState({
          searchResult: response.data.albums,
          count: response.data.albums.length,
        });
      } else {
        this.setState({
          searchResult: response.data.genres,
          count: response.data.genres.length,
        });
      }
    });
  }
  render() {
    const { searchResult, searchType, limit } = this.state;
    return (
      <Container>
        <Card>
          <Card.Header>
            <Form>
              <Form.Group>
                <Form.Label> Results per Page: </Form.Label>
                <Form.Select onChange={this.handlePageSizeChange} value={limit}>
                  {this.limits.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="row">
                <div className="col-6">
                  <Form.Label> Query </Form.Label>
                  <Form.Control type="text" onChange={this.handleInputChange} />
                </div>
                <div className="col-6">
                  <Form.Label> Search in: </Form.Label>
                  <Form.Select onChange={this.handleTypeChange}>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                    <option value="genre">Genre</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <Button onClick={this.handleSubmit}>Search</Button>
            </Form>
          </Card.Header>
          <Card.Body className="d-flex flex-wrap justify-content-around">
            {searchResult &&
              searchResult.map((result) => {
                switch (searchType) {
                  case "album":
                    return (
                      <Card
                        key={result.id}
                        className="m-2 flex-auto"
                        style={{ width: "25rem", height: "35rem" }}
                      >
                        <Card.Header className="d-flex flex-column">
                          <Card.Img
                            className="my-3"
                            src={result.cover}
                            variant="top"
                            style={{ width: "12rem", height: "12rem" }}
                          />
                          <Card.Title>{result.name}</Card.Title>
                          <p>
                            {"Released: " +
                              new Date(
                                result.release_date * 1000
                              ).toLocaleDateString("en-US")}
                          </p>
                          <p>Popularity score : {result.popularity}</p>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text className="text-truncate-custom">
                            {result.description}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-center">
                          <Link
                            className="btn btn-primary"
                            to={"/albums/" + result.id}
                          >
                            See more
                          </Link>
                        </Card.Footer>
                      </Card>
                    );
                  case "artist":
                    return (
                      <Card
                        key={result.id}
                        className="m-2 flex-auto photos"
                        style={{
                          width: "25rem",
                          height: "35rem",
                        }}
                      >
                        <Card.Header className="d-flex flex-column align-items-center">
                          <Card.Img
                            className="my-3"
                            src={result.photo}
                            variant="top"
                            style={{ width: "12rem", height: "12rem" }}
                          />
                          <Card.Title>{result.name}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <h5>{result.description.toLowerCase()}</h5>
                          <Card.Text className="text-truncate-custom">
                            {result.bio}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-center">
                          <Link
                            className="btn btn-primary"
                            to={"/artists/" + result.id}
                          >
                            See more
                          </Link>
                        </Card.Footer>
                      </Card>
                    );

                  case "genre":
                    return (
                      <Link
                        key={result.id}
                        className="btn btn-primary"
                        to={"/genres/" + result.id}
                      >
                        {result.name}
                      </Link>
                    );
                  default:
                    return <h1>No content sorry</h1>;
                }
              })}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
