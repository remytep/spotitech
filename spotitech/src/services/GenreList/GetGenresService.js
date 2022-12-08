import http from "../../http-common";

class GetGenresService {
  getAll(params) {
    return http.get("/genres");
  }
}

export default new GetGenresService();
