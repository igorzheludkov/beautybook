import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'

export default NextAuth({
  secret: 'd339ab14c0829f1e4ecf94196f2a743d',
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly',
    }),
  ],
  // jwt: {
  //   // The maximum age of the NextAuth.js issued JWT in seconds.
  //   // Defaults to `session.maxAge`.
  //   maxAge: 60 * 60 * 24 * 30,
  //   // You can define your own encode/decode functions for signing and encryption
  //   async encode() {},
  //   async decode() {},
  // }
  // jwt: {
  //   encryption: true,
  // },
  // secret: 'd339ab14c0829f1e4ecf94196f2a743d',

  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      console.log(user)
      return token
    },
  },
})
