const MongoLib = require("../lib/mongo");

class RegisterService {
  constructor() {
    this.collection = "users";
    this.mongoDB = new MongoLib();
  }

  async getOne({ username }) {
    const [user] = await this.mongoDB.getAll(this.collection, { username });
    return user;
  }

  async createUser({ data }) {
    const username = data.username;
    const userExist = await this.getOne({ username });
    if (!userExist) {
      const createdUserId = await this.mongoDB.create(this.collection, data);
      return createdUserId;
    }
    throw new Error("Username is already in use");
  }

  async deleteUser({ userId }) {
    const deletedUserId = await this.mongoDB.delete(this.collection, userId);
    return deletedUserId;
  }
}

module.exports = RegisterService;
