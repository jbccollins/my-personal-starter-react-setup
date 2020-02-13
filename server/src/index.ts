import './LoadEnv'; // Must be the first import
import app from '@server';
import { logger } from '@common';

// Start the server
const DEFAULT_PORT: number = 5001;
const port: number = Number(process.env.PORT) || DEFAULT_PORT;
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
