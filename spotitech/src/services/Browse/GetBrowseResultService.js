import http from "../../http-common";

class GetBrowseResultService {
  getAll(params) {
    return http.get("/search", { params });
  }
}

export default new GetBrowseResultService();
