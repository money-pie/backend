declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: "development" | "production";
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      POSTGRES_USERNAME: string;
      POSTGRES_PASSWORD: string;
      DB_NAME: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
