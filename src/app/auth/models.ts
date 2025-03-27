export type AuthenticationTokenRequestDTO = {
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
  logonProviderId?: string;
  impersonateUserId?: number;
  impersonateExternalId?: string;
  clientVersion?: string;
  machineKey?: string;
  languageCultureName?: string;
  successRedirectUri?: string;
  scopeList?: string[];
  clientIpAddress?: string;
};

export type AuthenticationTokenDTO = {
  error?: string;
  errorDescription?: string;
  errorUri?: string;
  accessToken?: string;
  tokenType?: string;
  expiresIn?: number;
  refreshToken?: string;
  issued?: string;
  expires?: string;
  arxclientId?: string;
  arxuserMustChangePassword?: boolean;
};
