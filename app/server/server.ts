import path from 'path';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import api from './src/routes';
import cors from 'cors';
import dotenv from 'dotenv';
import shutdown from './src/util/shutdown.util';

dotenv.config();

// Swagger
// const swaggerDocument = YAML.load('./swagger.yaml');

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api', api);
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.ENV_MODE === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
  });
}



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
shutdown.listen();
