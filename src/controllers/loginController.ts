import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { RoleMessage, TokenNames } from "../projections";


export const tokenSecret = "token-secrete-move-to-env";  // move this to environment variable

export interface Credentials {
  email: string;
  password: string;
}

/**
 * GET /
 * login route
 */
export const login = (req: Request, res: Response) => {
  const credentials = req.body.credentials as Credentials;
  if (credentials.email && credentials.password) {
    const token = jwt.sign(credentials, tokenSecret, {
      expiresIn: "1h"
    });
    const userMessage: RoleMessage = {
      message: "user successfully authenticated",
      role: "admin"
    };
    res
      .cookie(TokenNames.name, token, { httpOnly: true })
      .status(200)
      .send(userMessage);
  } else {
    res.status(401).send();
  }
};
