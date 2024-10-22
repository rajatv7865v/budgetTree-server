import { Controller, Post, Res } from '@nestjs/common';
import { TypeFormService } from './type-form.service';
import { ApiBasicAuth } from '@nestjs/swagger';

@ApiBasicAuth()
@Controller('type-form')
export class TypeFormController {
  constructor(private readonly typeFormService: TypeFormService) {}

  @Post()
  connect(@Res() res: any) {
    return this.typeFormService.connect(res);
  }
}
