export interface RoleMessage {
  message: string;
  role: string;
}

export enum TokenNames {
  name = "auth-token-shredder"
}


export type ShredderTokenData = {[TokenNames.name]: string}

export const tokenSecret = "token-secrete-move-to-env";  // move this to environment variable
