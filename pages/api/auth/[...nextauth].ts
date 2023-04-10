import NextAuth, { Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const ALLOWED_EMAILS = process.env.EMAIL_ALLOWLIST?.split(',') || [];

export const authOptions = {
  callbacks: {
    async signIn({ profile }: { profile?: Profile }) {
      // Only allow signin from certain users (me).
      if (profile && profile.email && ALLOWED_EMAILS.includes(profile.email)) {
        return true;
      }

      return false;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
