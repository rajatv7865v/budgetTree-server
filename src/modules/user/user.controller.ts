import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CustomHttpException } from 'src/core/exceptions';
import axios from 'axios';

@Controller('user')
export class UserController {
  private readonly AUTH_API: 'https://app.budgetree.in/account/get-user-token-with-company/';
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signInUser(@Body('phoneNumber') phoneNumber: string) {
    try {
      console.log(phoneNumber);
      const response = await axios.post(
        this.AUTH_API,
        {
          phoneNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response);
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }
}
