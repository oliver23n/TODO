const { User, Task} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {

    Query: {

        me: async ( parent, args, context) => {
            if(context.user) {
                return User.findOne({_id:context.user._id}).populate('todos')
            }
            throw AuthenticationError;
        }
    },

    Mutation: {
        addProfile: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            // console.log(email, password);
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
        addTask: async (parent, { title,description, status }, context)=>{
            if (!context.user) {
                throw AuthenticationError;
            }
            const newTask = new Task({
                title,
                description,
                status
            });
            newTask.user = context.user;
            await newTask.save();
            return newTask;
        },
        updateTask: async (parent, { id, status }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            const task = await Task.findById(id);
            if (!task) {
                throw new Error('Task not found');
            }
            task.status = status;
            await task.save();
            return task;
        },
        removeTask: async( parent, {id}, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            const removeTask = await Task.findOneAndDelete( { _id: id});
            return removeTask;
        }

    }
}

module.exports = resolvers;
