const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    addNumbers(a: Int!, b: Int!): Int
    getUser(name: String!): User
    getUsers: [User]
  }

  type Mutation {
    useradd(name: String!, age: Int!, email: String!): User
    updateUser(name: String!, age: Int, email: String): User
    deleteUser(name: String!): String
  }

  type User {
    name: String
    age: Int
    email: String
  }
`);

const users = [
  { name: 'Ali', age: 25, email: 'ali@example.com' },
  { name: 'Sara', age: 30, email: 'sara@example.com' },
];

// إعداد الريزولفرز (Resolvers)
const root = {
  hello: () => 'Hello, GraphQL!',
  addNumbers: ({ a, b }) => a + b,
  getUser: ({ name }) => {
    return users.find(user => user.name === name) || null;
  },
  getUsers: () => users,
  useradd: ({ name, age, email }) => {
    users.push({ name, age, email });
    return { name, age, email };
  },
  updateUser: ({ name, age, email }) => {
    const userIndex = users.findIndex(user => user.name === name);
    if (userIndex !== -1) {
      const updatedUser = users[userIndex];
      if (age !== undefined) updatedUser.age = age;
      if (email !== undefined) updatedUser.email = email;
      users[userIndex] = updatedUser;
      return updatedUser;
    }
    throw new Error('User not found');
  },
  deleteUser: ({ name }) => {
    const userIndex = users.findIndex(user => user.name === name);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return `User ${name} has been deleted`;
    }
    throw new Error('User not found');
  }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

// بدء السيرفر
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
