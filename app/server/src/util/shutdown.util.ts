const shutdown = {
  listen() {
    const gracefulShutdown = async (signal: string, value: number) => {
      try {
        console.log(`Shutdown signal received: ${signal}, closing resources.`);
        console.log('All resources closed. Exiting now.');
        process.exit(128 + value);
      } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1); // Force exit with error
      }
    };

    const signals: { [key: string]: number } = {
      SIGHUP: 1,
      SIGINT: 2,
      SIGTERM: 15,
    };

    Object.keys(signals).forEach((signal) => {
      process.on(signal, () => gracefulShutdown(signal, signals[signal]));
    });

    process.on('uncaughtException', async (err) => {
      console.error('Uncaught Exception:', err);
      await gracefulShutdown('uncaughtException', 1);
    });

    process.on('unhandledRejection', async (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      await gracefulShutdown('unhandledRejection', 1);
    });
  },
};

export default shutdown;
