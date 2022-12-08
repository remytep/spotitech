import http from "../../http-common";

class GetArtistDetailService {
  getAll(id) {
    return http.get("/artists/" + id);
  }
}

export default new GetArtistDetailService();
