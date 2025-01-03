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
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CustomHttpException } from 'src/core/exceptions';
import axios from 'axios';

@Controller('user')
export class UserController {
  private readonly AUTH_API: string;
  constructor() {
    this.AUTH_API =
      'https://app.budgetree.in/account/get-user-token-with-company/';
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signInUser(@Body('phoneNumber') phoneNumber: string) {
    try {
      console.log(this.AUTH_API);
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

      if (response.status == 200 || response.status == 201) {
        {
          return response.data;
        }
      } else {
        throw new UnauthorizedException(response.data.message);
      }
    } catch (error) {
      console.log(error);
      throw new CustomHttpException(error);
    }
  }
}
