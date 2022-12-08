import http from "../../http-common";

class GetAlbumsService {
  getAll(params) {
    return http.get("/artists", { params });
  }
}

export default new GetAlbumsService();
