import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  //Trivial call of validate, since it is guarateed that JWT is verfied.
  async validate(payload: any) {
    return payload;
  }
}
