import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId , io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;

        const senderId = req.id;
        const receiverId = req.params.id;

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        };
        await Promise.all([gotConversation.save() , newMessage.save()]);

        //socket.io 
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json({ newMessage });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "error while sending message!" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json({ message: "conversation not found!" });
        };

        console.log(conversation);
        return res.status(200).json({ conversation: conversation });
    } catch (err) {
        console.log(err);
    }
}