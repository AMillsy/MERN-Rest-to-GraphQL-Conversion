const express = require("express");
const path = require("path");
require("dotenv").config();
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

//app.use(routes);

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `Use GraphQL ast http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();
