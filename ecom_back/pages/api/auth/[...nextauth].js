import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
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
    session({ session, user }) {
      session.user.role = user.role;
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOption);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOption);

  if (!session?.user?.role == "admin") {
    console.log(session?.user?.role);
    res.status(401);
    res.end();
    throw "not admin" + new Date();
  }
}
