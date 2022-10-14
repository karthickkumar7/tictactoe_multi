const asyncHandler = require("express-async-handler");

const Chat = require("../models/Chat");
const Message = require("../models/Message");
// const User = require("../models/User");

const getUserChats = asyncHandler(async (req, res) => {
    const userChats = await Chat.find({ members: { $in: req.user._id } });
    return res.status(200).json({ msg: "success!", chats: userChats });
});

const createChat = asyncHandler(async (req, res) => {
    const { chatname, userId } = req.body;

    const chat = await Chat.create({
        chatname,
        members: [req.user._id, userId],
    });

    return res.status(201).json({ msg: "chat created!", chat });
});

const createMessage = asyncHandler(async (req, res) => {
    const { reciever, msg, chat } = req.body;

    console.log(msg, chat);

    const message = await Message.create({
        msg,
        sender: req.user._id,
        reciever,
        chat,
    });

    await Chat.findOneAndUpdate(
        { _id: chat },
        { $set: { latest: message.msg } }
    );

    return res.status(201).json({ msg: "message created!", message });
});

const getChatMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId }).lean().exec();

    return res.status(200).json({ msg: "success!", messages });
});

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Chat.find({ members: { $in: req.user._id } }).lean();

    return res.status(200).json({ msg: "success!", contacts });
});

module.exports = {
    getUserChats,
    createChat,
    createMessage,
    getChatMessages,
    getContacts,
};
