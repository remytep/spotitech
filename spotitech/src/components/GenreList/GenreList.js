import { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import GetGenresService from "../../services/GenreList/GetGenresService";

export default class GenreList extends Component {
  constructor() {
    super();
    this.retrieveGenreList = this.retrieveGenreList.bind(this);
    this.state = { genres: [] };
  }
  componentDidMount() {
    this.retrieveGenreList();
  }
  retrieveGenreList() {
    GetGenresService.getAll().then((response) => {
      this.setState({ genres: response.data });
    });
  }
  render() {
    const { genres } = this.state;
    return (
      <Container>
        <Card>
          <Card.Header>
            <h2>Genres</h2>
          </Card.Header>
          <Card.Body className="d-flex justify-content-around">
            {genres &&
              genres.map((genre) => (
                <Link
                  key={genre.id}
                  className="btn btn-primary"
                  to={"/genres/" + genre.id}
                >
                  {genre.name}
                </Link>
              ))}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
