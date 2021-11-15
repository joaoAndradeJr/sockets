const chatModel = require('../models/webchat');

const onlineUsers = {};

const getAll = async () => {
  const messages = await chatModel.getAll();
  return messages;
};

const getNickname = (arr, userId) => {
  const online = Object.entries(arr);
  const search = online.map((e) => (e[0] === userId ? e[1] : false));
  return search[0];
};

const create = async (message) => {
  const newMessages = await chatModel.create(message);
  return newMessages;
};

module.exports = {
  onlineUsers,
  getAll,
  getNickname,
  create,
};
