import { config } from './src/config/config.js';
import DatabaseFactory from './src/databases/DatabaseFactory.js';

import server from './src/server.js';

const runServer = async () => {
  try {
    if (config.DATABASE == 'supabase') {
      DatabaseFactory.getConnection();
    }

    const port = process.env.PORT || config.SERVER_PORT;

    server.listen(
      port,
      "0.0.0.0",
      () => {
        console.log(`
          Server is running at: http://0.0.0.0:${port}
        `);
      }
    );
  } catch (error) {
    console.log(`Error en el server`, error.message);
  }
};


runServer();
