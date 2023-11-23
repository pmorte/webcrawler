import express from 'express';
import routes from './routes.js';

import path from 'path';
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;
const app = express();
app.use(routes);

app.use(express.static(path.join(__dirname, 'statics')));

export default app;
