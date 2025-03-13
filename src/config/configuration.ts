import * as process from 'node:process';

export const config = () => {
  return {
    jwt: {
      accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      accessSecret: process.env.JWT_ACCESS_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    apiMatches: {
      token: process.env.API_TOKEN_MATCHES,
      url: process.env.API_URL_MATCHES,
    },
  };
};

export type AppConfig = ReturnType<typeof config>;
