import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: 'D:/Projekte A/clients/fanny2/.tina/__generated__/.cache/1755265932189', url: 'https://content.tinajs.io/1.6/content/your-client-id/github/main', token: 'your-token', queries,  });
export default client;
  