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
    return this.users;
  }

  async findwithID(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async findOneWithEmail(email: string) {
    return this.users.find((user) => user.email === email);
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
