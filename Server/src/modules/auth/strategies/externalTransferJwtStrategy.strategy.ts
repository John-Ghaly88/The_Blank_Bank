import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class ExternalTransferJwtStrategy extends PassportStrategy(
  Strategy,
  "jwt-external"
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: true,
      secretOrKey: process.env.EXTERNAL_TRANSFER_JWT_SECRET,
    });
  }

  //Trivial call of validate, since it is guarateed that JWT is verfied.
  async validate(payload: any) {
    return payload;
  }
}
