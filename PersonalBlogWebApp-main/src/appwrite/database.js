import { config } from "../config/config";
import { Client, Databases, Storage, Query } from "appwrite";

class DBServies {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost(title, slug, content, status, userId, date, imageId) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {
                title,
                content,
                status,
                userid: userId,
                date,
                imageId
            })
        }
        catch (error) {
            console.log("Appwrite createPost error", error);
        }
    }
    async updatePost(title, slug, content, status, imageId) {
        try {
            console.log("updating data post..");
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {
                title,
                content,
                status,
                imageId
            })
        }
        catch (error) {
            console.log("Appwrite updatePost error", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
            return true;
        }
        catch (error) {
            console.log("Appwrite deletePost error:", error);
        }
        return false;
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
        }
        catch (error) {
            console.log("Appwrite getPost error:", error);
        }
        return false;
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries);
        }
        catch (error) {
            console.log("Appwrite getPosts error:", error);
        }
        return false;
    }
    async uploadFile(file, imageId) {
        try {
            return await this.storage.createFile(config.appwriteBucketId, imageId, file);
        }
        catch (error) {
            console.log("Appwrite uploadFile error:", error);
        }
        return false;
    }
    async deleteFile(imageId) {
        try {
            await this.storage.deleteFile(config.appwriteBucketId, imageId);
            return true;
        }
        catch (error) {
            console.log("Appwrite deleteFile error:", error);
        }
        return false;
    }
    getFilePreview(imageId) {
        return this.storage.getFilePreview(config.appwriteBucketId, imageId);
    }
    async getFile(imageId) {
        return await this.storage.getFileDownload(config.appwriteBucketId, imageId);
    }
}
const dbService = new DBServies();
export default dbService;