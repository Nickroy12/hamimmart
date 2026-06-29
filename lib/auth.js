import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("HamimMart");

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  },
  database: mongodbAdapter(db, {
    client
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "consumer",
        input: false, // Prevents client-side manipulation of roles
      },
      phone: {
        type: "string",
        required: true,
        // user needs to pass this, so keep input allowed
      },
      address: {
        type: "string",
        required: true,
      },
    }
  }
});