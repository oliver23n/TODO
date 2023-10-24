const { User, Task} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {

    Query: {

        me: async ( parent, args, context) => {
            if(context.user) {
                return User.findOne({_id:context.user._id})
            }
            throw AuthenticationError;
        },
        tasks: async (parent, args, context) =>{
            if (!context.user) {
                throw AuthenticationError;
            }
            const todos = await Task.find({user: context.user._id});
            return todos;
        }
    },

    Mutation: {
        addProfile: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        addTask: async (parent, { title,description }, context)=>{
            if (!context.user) {
                throw AuthenticationError;
            }
            const newTask = await Task.create({
                title,
                description,
                user: context.user._id
            });

            return newTask;
        },
        updateTask: async (parent, { _id, status }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            const task = await Task.findById(_id);
            if (!task) {
                throw new Error('Task not found');
            }
            task.status = status;
            await task.save();
            return task;
        },
        removeTask: async( parent, {_id}, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            try{

                const removeTask = await Task.findOneAndDelete( { _id});
                return removeTask;
            }catch(err){
                console.log(err);
            }
        }

    }
}

module.exports = resolvers;
