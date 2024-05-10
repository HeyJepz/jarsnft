import {
  ThirdwebAuthAppRouter,
  ThirdwebAuthUser,
} from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { jars } from "@/lib/core/api";
import { env } from "@/lib/env.mjs";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuthAppRouter({
  domain: env.NEXT_PUBLIC_APP_URL,
  wallet: new PrivateKeyWallet(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY as string,
    "sepolia",
  ),
  authOptions: {
    //Check in database if nonce exists
    validateNonce: async (nonce: string) => {
      if(await jars.nonceExists(nonce)) {
        throw new Error("Nonce already used!");
      }

      await jars.saveNonce(nonce);
    },
    tokenDurationInSeconds: 60 * 60 * 24 * 3, // 3 days
    refreshIntervalInSeconds: 60 * 60 * 3, // 3 hours
  },
  callbacks: {
    onLogin: async (address: string) => {
      const isUser = await jars.isUserExists(address);
      if (!isUser) {
        await jars.createUser(address);
      }

      const user = await jars.getUser(address);
      console.log("onLogin", user);
      const session = {
        email: user.email,
        name: user.name,
        is_listed: user.is_listed,
        role: user.role,
        create_at: user.created_at,
      };
      
      return session;
    },
    onUser: async (user: ThirdwebAuthUser<any, { is_listed: boolean }>) => {
      const apiUser = await jars.getUser(user.address);
      console.log("onUser", apiUser);
      const rewriteUser = {
        ...user,
        session: { ...user.session, is_listed: apiUser.is_listed },
      };

      return rewriteUser;
    },
  },
});
