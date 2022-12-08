import http from "../../http-common";

class GetArtistAlbumsService {
  getAll(id) {
    return http.get("/albums/artist/" + id);
  }
}

export default new GetArtistAlbumsService();
