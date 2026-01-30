import { Client, Account, Avatars, TablesDB } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("697659580036fb279d26")
  .setPlatform("com.checkoutProcess");

const account = new Account(client);
const database = new TablesDB(client);
const avatars = new Avatars(client);

export { client, account, database, avatars };
