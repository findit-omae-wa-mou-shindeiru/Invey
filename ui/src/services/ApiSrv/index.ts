import axios from "axios";

class ApiSrv {
  private static API_URL = "https://invey.herokuapp.com";

  async get(token: string, path: string) {
    const url = `${ApiSrv.API_URL}/${path}`;

    try {
      const res = await axios.get(url, {
        headers: this.generateHeader(token),
        responseType: "json",
      });
      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  }
  async post(token: string, path: string, payload: Object) {
    const url = `${ApiSrv.API_URL}/${path}`;

    try {
      const res = await axios({
        method: "POST",
        url,
        headers: this.generateHeader(token),
        responseType: "json",
        data: payload,
      });

      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  }

  async put(token: string, path: string, payload: Object) {
    const url = `${ApiSrv.API_URL}/${path}`;

    try {
      const res = await axios.put(url, {
        headers: this.generateHeader(token),
        responseType: "json",
        data: payload,
      });
      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  }

  private generateHeader(token: string) {
    const auth = token ? `Bearer ${token}` : "";

    return {
      "Content-Type": "application/json",
      Authorization: auth,
      "Access-Control-Allow-Origin": "*",
    };
  }
}

export default ApiSrv;
