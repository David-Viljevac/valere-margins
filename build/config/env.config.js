"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
class EnvConfig {
    static get() {
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
                NODE_ENV: process.env.NODE_ENV || 'development',
            };
        }
        return EnvConfig.instance;
    }
}
exports.env = EnvConfig.get();
//# sourceMappingURL=env.config.js.map