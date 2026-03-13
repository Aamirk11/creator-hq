import { PlatformConnection } from "./platform";

export interface Creator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  niche: string;
  platforms: PlatformConnection[];
  joinedAt: string;
}
