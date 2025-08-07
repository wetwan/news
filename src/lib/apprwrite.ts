
import { Client, Account, Databases, ID, Avatars, Storage } from "appwrite";


export const config = {
    database: import.meta.env.VITE_APPWRITE_DATABASE_ID!,
    user: import.meta.env.VITE_APPWRITE_USER_ID!,
    news: import.meta.env.VITE_APPWRITE_NEWS_ID!,
    bucket: import.meta.env.VITE_APPWRITE_BUCKET_ID!,
    comment: import.meta.env.VITE_APPWRITE_COMMENT_ID!,

};



const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);


export const storage = new Storage(client);
export const account = new Account(client);
export const db = new Databases(client);
export const avatar = new Avatars(client);
export { client };


export const createUser = async (email: string, password: string, name: string, role: string) => {
    try {
        const user = await account.create(ID.unique(), email, password, name);

        await db.createDocument(config.database, config.user, ID.unique(), {
            userId: user.$id,
            role: role,
        });
        return user
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        await account.createEmailPasswordSession(email, password);
        const currentUser = await account.get(); // fetches user data
        return currentUser;

    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};



export const signOut = async () => {
    try {
        await account.deleteSession("current");
        return true;
    } catch (e) {
        console.error("Sign-out error:", e);

        return false; // Still returns false for failure
    }
};

export const addNews = async () => {
    try {
        const currentUser = await account.get();
        const userAvatar = avatar.getInitials(currentUser.name);
        await db.createDocument(config.database, config.news, ID.unique(), {
            title: "",
            story: "",
            by: currentUser.name,
            category: '',
            tag: [],
            time: new Date().toISOString(),
            image: "",
            aurthor_image: userAvatar
        });
    } catch (error) {
        console.log("Error adding news:", error);
    }
}