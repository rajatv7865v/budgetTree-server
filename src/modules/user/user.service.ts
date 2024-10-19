// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { Repository } from 'typeorm';
// import { UserSignUpDTO } from 'src/authantication/dto/user-signup.dto';
// import { CustomHttpException } from 'src/core/exceptions';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   createUser(userSignUpDTO: UserSignUpDTO) {
//     console.log('userSignUpDTO'), userSignUpDTO;
//     return 'This action adds a new user';
//   }

//   async findUser(email: string): Promise<User> {
//     try {
//       return this.userRepository.findOne({ where: { email } });
//     } catch (error) {
//       throw new CustomHttpException(error);
//     }
//   }

//   async findOneAndUpdate(email: string): Promise<User> {
//     try {
//       return this.userRepository.findOne({ where: { email } });
//     } catch (error) {
//       throw new CustomHttpException(error);
//     }
//   }
// }
