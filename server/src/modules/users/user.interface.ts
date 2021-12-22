interface AbstractUser {
  firstname: string;
  surname: string;
  age: number;
  login: string;
  post?: string;
}

export default interface User extends AbstractUser {
  userID: number;
}

export interface UserDTO extends AbstractUser {
  password: string;
}
