export class User {
    id: number;
    email: string;
    password: string;
    username: string;
    user: User[];
  
    constructor(id: number, email: string, password: string, username: string, user: User[]) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.username = username;
      this.user = user;
    }
  }