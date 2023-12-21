import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UserDto } from './dto/user.dto';
import { Encryptor } from 'services/encyrption/encyrpt-data';

const USERS_FILE_PATH = './src/user/users.json';
const encyrpt = new Encryptor;

@Injectable()
export class UserService {
  private users = [];

  constructor() {
    this.loadUsers();
  }

  async create(user: UserDto) {
    user.id = await this.autoIncrement();
    user.password = String(await encyrpt.hashPassword(user.password));
    this.users.push(user);
    const save = this.saveUsers();
    if (save) { return user; }
  }

  async findAll() {
    const users = this.users;
    if (!users) return { errorMessage: "Users not found" };
    return users;
  }

  async findwithID(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) return { errorMessage: "User not found" };
    return user;
  }

  async findOneWithEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    if (!user) return { errorMessage: "User not found" };
    return user;
  }

  async loadUsers() {
    const users = fs.readFileSync(USERS_FILE_PATH, 'utf8');
    this.users = JSON.parse(users);
  }

  async saveUsers() {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(this.users));
    return true;
  }

  async autoIncrement() {
    return Math.max(...this.users.map((user) => user.id)) + 1;
  }


}
