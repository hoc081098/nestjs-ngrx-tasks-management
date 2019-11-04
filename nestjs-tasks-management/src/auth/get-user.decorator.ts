import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string, req) => {
  return data ? req.user && req.user[data] : req.user;
});
