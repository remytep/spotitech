import http from "../../http-common";

class GetAlbumDetailService {
  getAll(id) {
    return http.get("/albums/" + id);
  }
}

export default new GetAlbumDetailService();
