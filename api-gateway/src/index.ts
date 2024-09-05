import express from 'express';
import { ROUTES } from './routes/routes';
import { setupRateLimit } from './ratelimit/ratelimit';
import { setupProxies } from './proxy/proxy';
import { setupAuth } from './auth/auth';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(cookieParser());
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
    console.log(`API-Gateway  running at http://localhost:${port}`);
});
