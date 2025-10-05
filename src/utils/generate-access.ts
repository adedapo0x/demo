import jwt from "jsonwebtoken";

interface AccessTokenPayload {
  id: string;   
  role: number; 
}

export const generateAccessToken = (payload: AccessTokenPayload) => {
    const token = jwt.sign(
    {
      id: payload.id,
      role: payload.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h", 
    }
  );

  return token;
    
}