import { Account, Client, ID } from "appwrite";
import { config } from "../config/config";
class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async signUp(email, password, name) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async logIn(email, password) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        }
        catch (error) {
            throw error;
        }
    }
    async logOut() {
        try {
            return await this.account.deleteSessions();
        }
        catch (error) {
            return error;
        }
    }
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async isAuthor() {
        let result = await this.getCurrentUser();
        return result.$id === config.appwriteAuthorId
    }
}
const authService = new AuthService();
export default authService;