
const getUserId = (req) => {
  const { userData } = req;
  if (userData) {
    return userData.id;
  }
  return null;
};


//module.exports = { getUserId };
export default {getUserId};
