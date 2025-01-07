const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const User = require('./models/user');
const Village = require('./models/village');
const Message = require('./models/Message');  // استيراد نموذج الرسالة


// الاتصال بقاعدة البيانات
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

    getVillages:[Village]

    getVillage(id:String!):Village
    getDemographic(id:String!):Village
    getUserChatMessages(username: String!): ChatMessages
    getMessages(senderUsername: String!, receiverUsername: String!): [ChatMessage]


    totalNumberOfVillages: Int

    totalNumberOfUrbanAreas: Int

    totalPopulationSize: Int
    
    averageLandArea: Float



  }

  type Mutation {
    signup(fullName: String!, username: String!, password: String!): User
    userUpdate(username: String!, fullName: String, password: String, role: String): User
    userDelete(username: String!): String

    addVillage(
        
        villageName: String!
        regionDistrict: String!
        landArea: String!
        latitude: String!
        longitude: String!
        urlmage: String!
        tags:String!
          ): Village

    villageUpdate(
        id:String!
        villageName: String!
        regionDistrict: String!
        landArea: String!
        latitude: String!
        longitude: String!
        urlmage: String!
        tags:String!
          ): String

     demographicUpdate(
            id:String!
            populationSize:String!
            ageDistribution:String!
            genderRatios:String!
            populationGrowthRate:String!
          ): String      

    villageDelete(id: String!): String

    sendMessage(senderUsername: String!, receiverUsername: String!, message: String!): String

  }

  

  type User {
    id: String
    fullName: String
    username: String
    role: String
  }
  
  type Village {
    id: String
    villageName: String
    regionDistrict: String
    landArea: String
    latitude: String
    longitude: String
    urlmage: String
    tags:String
    populationSize:String
    ageDistribution:String
    genderRatios:String
    populationGrowthRate:String
  }

  type ChatMessage {
    id: String
    sender: String
    receiver: String
    message: String
  }

  type ChatMessages {
    sentMessages: [ChatMessage]
    receivedMessages: [ChatMessage]
}
`);

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


    getVillages: async () => {
        const villags = await Village.find();
        return villags;
    },

    getVillage:async({id})=>{
        const village = await Village.findOne({id});
        return village;
    },

    getDemographic:async({id})=>{
        const village = await Village.findOne({id});
        return village;
    },


    addVillage: async ({ villageName, regionDistrict ,landArea ,latitude ,longitude ,urlmage ,tags}) => {

        const newVillage = new Village({
            villageName,
            regionDistrict,
            landArea,
            latitude,
            longitude,
            urlmage,
            tags

        });

        try {
            const savedVillage = await newVillage.save();
            return savedVillage;
        } catch (error) {
            console.error('Error savedVillage:', error);
            throw new Error('Failed to savedVillage');
        }
    },

    villageUpdate: async ({id, villageName, regionDistrict ,landArea ,latitude ,longitude ,urlmage ,tags}) => {
        const updates = {};
        
        if (villageName) updates.villageName = villageName;
        if (regionDistrict) updates.regionDistrict = regionDistrict;
        if (landArea) updates.landArea = landArea;
        if (latitude) updates.latitude = latitude;
        if (longitude) updates.longitude = longitude;
        if (urlmage) updates.urlmage = urlmage;
        if (tags) updates.tags = tags;



        const village = await Village.findOneAndUpdate(
            { id },
            { $set: updates },
            { new: true }
        );

        return "Sucsess";
    },

    demographicUpdate: async ({id, populationSize, ageDistribution ,genderRatios ,populationGrowthRate}) => {
        const updates = {};
        
        if (populationSize) updates.populationSize = populationSize;
        if (ageDistribution) updates.ageDistribution = ageDistribution;
        if (genderRatios) updates.genderRatios = genderRatios;
        if (populationGrowthRate) updates.populationGrowthRate = populationGrowthRate;


         await Village.findOneAndUpdate(
            { id },
            { $set: updates },
            { new: true }
        );

        return "Sucsess";
    },

    villageDelete: async ({ id }) => {
        const villageName = await Village.findOne({ id });
       const name= villageName.villageName
        const village = await Village.findOneAndDelete({ id });
        return village ? `${name} has been deleted.` : `village not found.`;
    },

    sendMessage: async ({ senderUsername, receiverUsername, message }) => {
        const sender = await User.findOne({ username: senderUsername });
        const receiver = await User.findOne({ username: receiverUsername });
    
        if (!sender || !receiver) {
            throw new Error('Sender or Receiver not found');
        }
    
        const newMessage = new Message({
            fromUsername: sender.username,
            toUsername: receiver.username,
            message: message,
        });
    
    
        try {

            await newMessage.save();
            return `Message sent successfully from ${senderUsername} to ${receiverUsername}`;
        } catch (error) {
            console.error('Error saving message:', error);
            throw new Error('Failed to send message');
        }
    },
    
    getUserChatMessages: async ({ username }) => {

        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
    

        const sentMessages = await Message.find({ fromUsername: username }).lean();
    

        const receivedMessages = await Message.find({ toUsername: username }).lean();
    

        return {
            sentMessages: sentMessages.map(msg => ({
                id: msg.id,
                sender: msg.fromUsername, 
                receiver: msg.toUsername, 
                message: msg.message,
            })),
            receivedMessages: receivedMessages.map(msg => ({
                id: msg.id,
                sender: msg.fromUsername, // استخدم fromUsername
                receiver: msg.toUsername, // استخدم toUsername
                message: msg.message,
            })),
        };
    },

    getMessages: async ({ senderUsername, receiverUsername }) => {
        const sender = await User.findOne({ username: senderUsername });
        const receiver = await User.findOne({ username: receiverUsername });
    
        if (!sender || !receiver) {
            throw new Error('Sender or Receiver not found');
        }
    
        // جلب جميع الرسائل بين المرسل والمستقبل
        const messages = await Message.find({
            $or: [
                { fromUsername: senderUsername, toUsername: receiverUsername },
                { fromUsername: receiverUsername, toUsername: senderUsername }
            ]
        }).sort({ createdAt: 1 }); 
    
        // تحويل الرسائل إلى الشكل المطلوب
        return messages.map(msg => ({
            id: msg._id.toString(),
            sender: msg.fromUsername,
            receiver: msg.toUsername,
            message: msg.message,
        }));
    },
    

    ///Overview



    totalNumberOfVillages: async () => {
        const count = await Village.countDocuments();
        return count;
    },
    totalNumberOfUrbanAreas: async () => {
        const count = await Village.countDocuments({ tags: /urban/i });
        return count;
    },
    totalPopulationSize: async () => {
        const villages = await Village.find({}, { populationSize: 1 });
        const totalPopulation = villages.reduce((sum, village) => {
            const population = parseInt(village.populationSize, 10) || 0;
            return sum + population;
        }, 0);
        return totalPopulation;
    },
    averageLandArea: async () => {
        const villages = await Village.find({}, { landArea: 1 });
        const totalLandArea = villages.reduce((sum, village) => {
            const landArea = parseFloat(village.landArea) || 0;
            return sum + landArea;
        }, 0);
        const average = villages.length ? totalLandArea / villages.length : 0;
        return average;
    },
    

};

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