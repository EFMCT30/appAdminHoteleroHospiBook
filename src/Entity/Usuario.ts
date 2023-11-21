export class Usuario {
  id: number;
  email: string;
  password: string;
  username: string;
  roles: string[]; // Change the type to string array

  constructor(id: number, email: string, password: string, username: string, roles: string[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
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
