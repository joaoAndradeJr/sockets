module.exports = () => {
  const now = new Date();
  const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
  const hour = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  const msgTime = `${date} ${hour}`;
  return msgTime;
};
