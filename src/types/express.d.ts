import { JwtPayload } from "jsonwebtoken";

export interface DecodedToken extends JwtPayload {
  id: string;
  role: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
