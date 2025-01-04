const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/villageManagementDB')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });

// تعريف GraphQL Schema
const schema = buildSchema(`
  type Query {
    login(username: String!, password: String!): User
    getUsers: [User]
  }

  type Mutation {
    signup(fullName: String!, username: String!, password: String!): User
    userUpdate(username: String!, fullName: String, password: String, role: String): User
    userDelete(username: String!): String
  }

  type User {
    id: String
    fullName: String
    username: String
    role: String
  }
`);

// GraphQL Resolvers
const root = {

login: async ({ username, password }) => { 
    const user = await User.findOne({ username }); 
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }

    return {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        role: user.role,
    };
},

    getUsers: async () => {
        const users = await User.find();
        return users;
    },
    signup: async ({ fullName, username, password }) => {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
        });

        try {
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            console.error('Error signing up user:', error);
            throw new Error('Failed to sign up user');
        }
    },
    userUpdate: async ({ username, fullName, password, role }) => {
        const updates = {};
        if (fullName) updates.fullName = fullName;
        if (password) updates.password = await bcrypt.hash(password, 10);
        if (role) updates.role = role;

        const user = await User.findOneAndUpdate(
            { username },
            { $set: updates },
            { new: true }
        );

        return user;
    },
    userDelete: async ({ username }) => {
        const user = await User.findOneAndDelete({ username });
        return user ? `${username} has been deleted.` : `User not found.`;
    },
};

// إعداد Express
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
});
