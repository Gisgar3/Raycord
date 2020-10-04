/* 
Copyright (c) Gavin R. Isgar 2020
Developed at Hack Upstate XV (October 3-4, 2020)
*/
const Discord = require("discord.js");
const bot = new Discord.Client();
let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');
let userdata = require("./data/userdata.json");
const tokens = require("./tokens.json");

  // userHandler mocks out a simple ORM
  const userHandler = {
    getUser(id) {
      for (let i = 0; i < userdata.users.length; i++) {
        if(userdata.users[i].id === id) {
          return userdata.users[i];
        }
      }
    },
    getPosts(userId) {
      const userPosts = [];
      for (let i = 0; i < userdata.posts.length; i++) {
        if (userdata.posts[i].user_id === userId) {
          userPosts.push(userdata.posts[i]);
        }
      }
      return userPosts;
    },
    getServer(serverID) {
        const serverData = [];
        for (let i = 0; i < userdata.servers.length; i++) {
            if (userdata.servers[i].server_id === serverID) {
                serverData.push(userdata.servers[i]);
            }
        }
        return serverData;
    } 
  }
  const schema = buildSchema(`
    type Post {
      text: String
    }
    type User {
      name: String
      posts: [Post]
    }
    type Latest_Message {
      text: String
      timestamp: String
    }
    type Message {
        latest_message: [Latest_Message]
    }
    type Server {
        messages: [Message]
    }
    type Query {
      user(id: Int!): User
      server(id: String!): Server
    }
  `);
  const root = {
    user: (args) => {
      const user_id = args.id;
      const user = userHandler.getUser(user_id);
      console.log(userHandler.getUser(user_id))
      const posts = userHandler.getPosts(user_id);
      return {
        name: user.name,
        posts: posts
      }
    },
    server: (args) => {
        const server_id = args.id;
        const server = userHandler.getServer(server_id);
        console.log(userHandler.getServer(server_id));
        console.log(server[0].messages);
        return {
            messages: server[0].messages
        }
    }
  };

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

bot.on("ready", (ready) => {
    bot.user.setActivity("over the server!", {type: "WATCHING"});
    console.log("READY");
});

bot.on("message", (message) => {

});

bot.login(tokens.bot_token);