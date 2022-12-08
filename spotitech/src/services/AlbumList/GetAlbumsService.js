import http from "../../http-common";

class GetAlbumsService {
  getAll(params) {
    return http.get("/albums", { params });
  }
}

export default new GetAlbumsService();
