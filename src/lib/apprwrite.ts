
import { Client, Account, Databases, ID } from "appwrite";


export const config = {
    database: import.meta.env.VITE_APPWRITE_DATABASE_ID!,
    user: import.meta.env.VITE_APPWRITE_USER_ID!,
};



const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);



export const account = new Account(client);
export const db = new Databases(client);

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