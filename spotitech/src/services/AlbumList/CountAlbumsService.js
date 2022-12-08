import http from "../../http-common";

class CountAlbumsService {
  getAll() {
    return http.get("/albums");
  }
}

export default new CountAlbumsService();
