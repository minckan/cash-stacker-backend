import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const createDynamicLink = async (
  email: string,
  token: string
): Promise<string> => {
  try {
    const dynamicLinkDomain = "https://stacker.page.link";
    const deepLink = `https://cash-stacker.com/invite?token=${token}&email=${encodeURIComponent(email)}`;

    const response = await axios.post(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_API_KEY}`,
      {
        dynamicLinkInfo: {
          domainUriPrefix: dynamicLinkDomain,
          link: deepLink,
          androidInfo: {
            androidPackageName: "com.cash.stacker.app",
          },
          iosInfo: {
            iosBundleId: "com.cash.stacker.app",
          },
          socialMetaTagInfo: {
            socialTitle: "You've been invited!",
            socialDescription:
              "Click the link to accept your invitation and join us.",
            socialImageLink:
              "https://k.kakaocdn.net/14/dn/btsHquLIC9P/vJ4LCiGjejVbjbeToWlVm0/o.jpg",
          },
        },
      }
    );

    return response.data.shortLink;
  } catch (error) {
    console.log(error);
    throw new Error("deepLink 생성중 문제가 발생했습니다.");
  }
};
