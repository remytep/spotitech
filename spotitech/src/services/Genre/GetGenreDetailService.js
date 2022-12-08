import http from "../../http-common";

class GetGenreDetailService {
  getAll(id) {
    return http.get("/genres/" + id);
  }
}

export default new GetGenreDetailService();
