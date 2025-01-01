const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');  // إضافة مكتبة CORS

// استيراد نموذج المستخدم
const User = require('./models/user');

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/villageManegementDB')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });

// إنشاء مخطط GraphQL (Schema)
const schema = buildSchema(`
  type Query {
    hello: String
    addNumbers(a: Int!, b: Int!): Int
    getUser(name: String!): User
    getUsers: [User]
  }

  type Mutation {
    userAdd(name: String!, age: Int!, email: String!): String
    userUpdate(name: String!, age: Int, email: String): User
    userDelete(name: String!): String
  }

  type User {
    name: String
    age: Int
    email: String
  }
`);

// إعداد الريزولفرز (Resolvers)
const root = {
    hello: () => 'Hello, GraphQL!',
    addNumbers: ({ a, b }) => a + b,
    getUser: async ({ name }) => {
        const user = await User.findOne({ name });
        return user;
    },
    getUsers: async () => {
        const users = await User.find();
        return users;
    },
    userAdd: async ({ name, age, email }) => {
        const newUser = new User({ name, age, email });
        try {
            const savedUser = await newUser.save();
            return "done";
        } catch (error) {
            console.error('Error adding user:', error);
            throw new Error('Failed to add user');
        }
    },
    userUpdate: async ({ name, age, email }) => {
        const user = await User.findOneAndUpdate(
            { name },
            { $set: { age, email } },
            { new: true }
        );
        return user;
    },
    userDelete: async ({ name }) => {
        const user = await User.findOneAndDelete({ name });
        return user ? `${name} has been deleted.` : `User not found.`;
    }
};

// إنشاء تطبيق Express
const app = express();

// إضافة CORS للسماح بالاتصال من واجهة العميل
app.use(cors());  // هذا السطر يسمح للطلبات من جميع المصادر

// إعداد GraphQL
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // تفعيل واجهة GraphiQL التفاعلية
}));

// بدء السيرفر
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
});
