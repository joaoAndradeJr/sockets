const chatModel = require('../models/webchat');

const onlineUsers = {};

const getAll = async () => {
  const messages = await chatModel.getAll();
  return messages;
};

const getNickname = async (onlineUsersObj, userId) => {
  const online = Object.entries(onlineUsersObj);
  const search = online.find((e) => (e[0] === userId ? e[1] : false));
  return search ? search[1] : false;
};

const create = async (messagee) => {
  const { message, nickname, timestamps } = await chatModel.create(messagee);
  return `${timestamps} - ${nickname}: ${message}`;
};

module.exports = {
  onlineUsers,
  getAll,
  getNickname,
  create,
};
