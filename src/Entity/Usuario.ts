export class User {
  id: number;
  email: string;
  password: string;
  username: string;
  roles: Role[];

  constructor(id: number, email: string, password: string, username: string, roles: Role[]) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.roles = roles;
  }
}

export class Role {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
