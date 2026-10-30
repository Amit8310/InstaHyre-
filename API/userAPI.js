import baseAPI from './baseAPI.js';
import {ENDPOINTS} from './endpoints.js'

export default class userAPI extends baseAPI {
    constructor() {
        super('https://reqres.in');
    }

    async createUser(payload) {
        return await this.post(ENDPOINTS.CREATE_USER, payload);
    }

    async getUser(userId) {
        return await this.get(ENDPOINTS.GET_USER(userId));
    }

    async updateUser(userId, payload) {
        return await this.put(ENDPOINTS.UPDATE_USER(userId), payload);
    }
}