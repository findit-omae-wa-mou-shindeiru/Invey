interface IUserDetail {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  position: { id: number; name: string } | null;
  gender: { id: number; name: string } | null;
  bio?: string;
  photo_url?: string;
}

export default IUserDetail;
