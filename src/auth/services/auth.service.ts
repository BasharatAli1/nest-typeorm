import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/auth.entity';
import { User } from '../model/user.interface';

@Injectable()
export class AuthService {
  // constructor(
  //   @InjectRepository(UserEntity)
  //   private readonly userRepository: Respository<UserEntity>,
  // ) {}

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async registerAccount(user: User): Promise<User> {
    const { firstName, lastName, email, password } = user;
    const hashedPassword = await this.hashPassword(password);

    return this.userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { email },
      {
        select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
      },
    );
    if (!user) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
        HttpStatus.FORBIDDEN,
      );
    }

    return bcrypt.compare(password, user.password).then((isValidPassword) => {
      if (isValidPassword) {
        delete user.password;
        return user;
      }
    });
  }

  async login(user: User): Promise<string> {
    const { email, password } = user;
    const doesUserExist = await this.validateUser(email, password);
    if (doesUserExist) {
      // create JWT - credentials
      return this.jwtService.signAsync({ user });
    }
  }
}
