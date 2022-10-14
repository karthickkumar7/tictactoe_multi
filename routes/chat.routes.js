const router = require("express").Router();

const chat = require("../controllers/chat");
const jwtVerify = require("../middlewares/jwtVerify");

router.get("/userChats", jwtVerify, chat.getUserChats);

router.get("/chatMessages/:chatId", jwtVerify, chat.getChatMessages);

router.post("/createChat", jwtVerify, chat.createChat);

router.post("/createMessage", jwtVerify, chat.createMessage);

router.get("/getContacts", jwtVerify, chat.getContacts);

module.exports = router;
