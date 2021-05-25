import HttpException from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

class AirQualityService {
  public async findStatisticalMeasurement(measurement: string): Promise<String> {
    // const findUser: User = this.users.find(user => user.id === userId);
    // if (!findUser) throw new HttpException(409, "You're not user");

    return measurement;
  }

  // public async createUser(userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const findUser: User = this.users.find(user => user.email === userData.email);
  //   if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const createUserData: User = { id: this.users.length + 1, ...userData, password: hashedPassword };
  //   this.users = [...this.users, createUserData];

  //   return createUserData;
  // }

  // public async updateUser(userId: number, userData: CreateUserDto): Promise<User[]> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const findUser: User = this.users.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "You're not user");

  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const updateUserData: User[] = this.users.map((user: User) => {
  //     if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
  //     return user;
  //   });

  //   return updateUserData;
  // }

  // public async deleteUser(userId: number): Promise<User[]> {
  //   const findUser: User = this.users.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "You're not user");

  //   const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
  //   return deleteUserData;
  // }
}

export default AirQualityService;
