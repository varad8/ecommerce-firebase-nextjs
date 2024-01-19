import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          role: profile.role ?? "user",
          id: "001",
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    // jwt({ token, user }) {
    //   if (user) token.role = user.role;
    //   console.log(token);
    //   return token;
    // },
    session({ session, user }) {
      session.user.role = user.role;
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOption);
