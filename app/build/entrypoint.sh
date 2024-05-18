#!/bin/sh

# Apply database migrations
npx prisma migrate deploy

# Initialize the database
npx ts-node ./src/util/init.util.ts

# Start the application
npm start
