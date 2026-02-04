import type { JwtPayload } from "jsonwebtoken";

export interface AccessTokenPayload extends JwtPayload {
  _id: string;
  username: string;
  email: string;
  fullname: string;
}

export interface RefreshTokenPayload extends JwtPayload {
  _id: string;
}
