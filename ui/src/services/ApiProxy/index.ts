import { AxiosResponse } from "axios";
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
    const { res, err } = await this.apiSrv.post("", "auth/login", {
      email,
      password,
    });

    if (res && res.data.token) {
      this.setToken(res.data.token);
    }

    return { data: res?.data, err };
  }

  public async register({
    firstname,
    secondname,
    email,
    password,
    gender_id,
    position_id
  }: {
    firstname: string;
    secondname: string;
    email: string;
    password: string;
    gender_id: number;
    position_id: number;
  }) {
    const { res, err } = await this.apiSrv.post("", "auth/register", {
      firstname,
      secondname,
      email,
      password,
      gender_id,
      position_id
    });

    if (res && res.data.token) {
      this.setToken(res.data.token);
    }

    return { data: res?.data, err };
  }

  public async get(path: string) {
    const token = this.getToken();

    if (!token) {
      return new Promise<{res: AxiosResponse<any,any> | null | undefined, err: string}>(function(resolve, _) {
        resolve({res:null, err:"No token found"})
      })
    }

    return this.apiSrv.get(token, path);
  }

  public async getInitialData(path: string) {
    return this.apiSrv.get("", path);
  }

  public async post(path: string, payload: Object) {
    const token = this.getToken();

    if (!token) {
      return new Promise<{res: AxiosResponse<any,any> | null | undefined, err: string}>(function(resolve, _) {
        resolve({res:null, err:"No token found"})
      })
    }

    return this.apiSrv.post(token, path, payload);
  }

  public async put(path: string, payload: Object) {
    const token = this.getToken();

    if (!token) {
      return new Promise<{res: AxiosResponse<any,any> | null | undefined, err: string}>(function(resolve, _) {
        resolve({res:null, err:"No token found"})
      })
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
