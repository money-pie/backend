import { AuthGuard } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { USER_NOT_AUTHORIZED } from "../auth.constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new HttpException(USER_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
