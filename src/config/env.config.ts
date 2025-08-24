interface EnvironmentConfig {
  // Database
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  
  // App
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
}

class EnvConfig {
  private static instance: EnvironmentConfig;

  public static get(): EnvironmentConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = {
        // Database
        DB_HOST: process.env.DB_HOST,
        DB_PORT: parseInt(process.env.DB_PORT),
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        
        // App
        PORT: parseInt(process.env.PORT) || 3000,
        NODE_ENV: (process.env.NODE_ENV as any) || 'development',
      };
    }
    return EnvConfig.instance;
  }
}

export const env = EnvConfig.get();