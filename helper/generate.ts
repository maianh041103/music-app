export const generateRandomString = (length) => {
  const charater = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charater[Math.floor(Math.random() * charater.length)];
  }
  return result;
}