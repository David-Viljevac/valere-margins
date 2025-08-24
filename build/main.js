"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Serve static files
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    // Set up express-handlebars
    const { engine } = require('express-handlebars');
    app.engine('hbs', engine({
        layoutsDir: (0, path_1.join)(__dirname, '..', 'views', 'layouts'),
        partialsDir: (0, path_1.join)(__dirname, '..', 'views', 'partials'),
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.setViewEngine('hbs');
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    await app.listen(3000);
    console.log(`App running on http://localhost:3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map