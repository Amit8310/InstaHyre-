import { request } from '@playwright/test';

export default class BaseAPI {
    constructor(baseURL, token = null) {
        this.baseURL = baseURL;
        this.token = token;
        this.context = null;
    }

    async init() {
        this.context = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                 'x-api-key': 'free_user_3DC7eayigrz9CCIVfQfmN2L9VjO'
            }
        });
    }

    async get(url) {
        return await this.context.get(url);
    }

    async post(url, data) {
        return await this.context.post(url, { data });
    }

    async put(url, data) {
        return await this.context.put(url, { data });
    }

    async delete(url) {
        return await this.context.delete(url);
    }
}