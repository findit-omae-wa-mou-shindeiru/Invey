interface IUserDetail {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  position: string;
  gender: string;
  bio?: string;
  photo_url?: string;
}

export default IUserDetail;