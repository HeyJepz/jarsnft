import Image from "next/image";

export default function ProtectAccPage() {
  const tips = [
    "Educate Yourself: Understand the basics of blockchain, cryptocurrencies, smart contracts, and decentralized applications (dApps). Knowing how these technologies work will help you make informed decisions and identify potential risks.",
    "Secure Your Private Keys: Your private keys are the keys to your crypto assets. Keep them secure and never share them with anyone. Consider using hardware wallets or reputable software wallets with strong security features.",
    "Use Reputable Platforms: When trading or interacting with cryptocurrencies, use reputable and well-established platforms. Research exchanges, wallets, and dApps before using them, and be cautious of new or unknown platforms.",
    "Beware of Scams: Be vigilant against phishing scams, fraudulent ICOs, fake airdrops, and other scams prevalent in the crypto space. Verify the authenticity of websites, projects, and communication channels before providing any personal or financial information.",
    "Enable Two-Factor Authentication (2FA): Enable 2FA wherever possible to add an extra layer of security to your accounts. This typically involves receiving a code on your phone or email in addition to your password when logging in.",
    "Update Software Regularly: Keep your wallets, software, and devices updated with the latest security patches and fixes. Outdated software may contain vulnerabilities that could be exploited by attackers.",
    "Use Strong Passwords: Create strong, unique passwords for your accounts and avoid using the same password across multiple platforms. Consider using a password manager to generate and store complex passwords securely.",
    "Be Cautious with Smart Contracts: Review smart contracts carefully before interacting with them, especially if they involve financial transactions or investments. Understand the code and potential risks associated with it.",
  ];

  const images = [
    "/assets/InsightsAsset/educate.jpg",
    "/assets/InsightsAsset/protectKey.jpg",
    "/assets/InsightsAsset/deceptiveSite.jpg",
    "/assets/InsightsAsset/scammer.jpg",
    "/assets/InsightsAsset/2FA.jpg",
    "/assets/InsightsAsset/softwareUpdate.jpg",
    "/assets/InsightsAsset/strongPassword.jpg",
    "/assets/InsightsAsset/smartContract.jpg",
  ];

  return (
    <>
      <h1 className="text-2xl font-bold">How to Stay Protected in Web3</h1>
      <div className="max-w-598 grid max-h-full grid-flow-col grid-rows-8 content-center gap-5">
        {tips.map((tip, index) => (
          <div className="self-center" key={index}>
            {index + 1}. {tip}
          </div>
        ))}

        {images.map((image, index) => (
          <div className="self-center" key={index}>
            <Image
              src={image}
              width={600}
              height={400}
              alt="Insights Image"
              className="rounded-lg"
              style={{ minHeight: 400, minWidth: 600 }}
              quality={80}
            />
          </div>
        ))}
      </div>
    </>
  );
}
