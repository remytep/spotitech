import http from "../../http-common";

class CountAlbumsService {
  getAll() {
    return http.get("/artists");
  }
}

export default new CountAlbumsService();
