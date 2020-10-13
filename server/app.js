import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../server/schema/schema';
import mongoose from 'mongoose';
//ADD TO USE ENV VARIABLE
require('dotenv').config();

const app = express();

const mongoUrl = process.env['MONGO_URL'];
console.log(mongoUrl);

mongoose.connect(mongoUrl);
mongoose.connection.once('open', () => {
  console.log('connected');
});
// mongoose.Promise = Promise;

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('now listening on port 4000');
});
