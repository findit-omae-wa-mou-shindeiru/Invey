import { ApiSrv } from "services";

class ApiProxy {
  private static instance: ApiProxy;
  private apiSrv: ApiSrv;

  private constructor() {
    this.apiSrv = new ApiSrv();
  }

  public static getInstance(): ApiProxy {
    if (!ApiProxy.instance) {
      ApiProxy.instance = new ApiProxy();
    }
    return ApiProxy.instance;
  }

  public async login({ email, password }: { email: string; password: string }) {
    const { data, err } = await this.apiSrv.post("", "auth/login", {
      email,
      password,
    });

    if (data && data.token) {
      this.setToken(data.token);
    }

    return { data, err };
  }

  public async register({
    firstname,
    secondname,
    email,
    password,
  }: {
    firstname: string;
    secondname: string;
    email: string;
    password: string;
  }) {
    const { data, err } = await this.apiSrv.post("", "auth/register", {
      firstname,
      secondname,
      email,
      password,
    });

    if (data && data.token) {
      this.setToken(data.token);
    }

    return { data, err };
  }

  public async get(path: string) {
    const token = this.getToken();

    if (!token) {
      alert("No token found");
      return;
    }

    return this.apiSrv.get(token, path);
  }

  public async post(path: string, payload: Object) {
    const token = this.getToken();

    if (!token) {
      alert("No token found");
      return;
    }

    return this.apiSrv.post(token, path, payload);
  }

  public async put(path: string, payload: Object) {
    const token = this.getToken();

    if (!token) {
      alert("No token found");
      return;
    }

    return this.apiSrv.put(token, path, payload);
  }

  getToken() {
    return localStorage.getItem("token");
  }
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
}

export default ApiProxy;
