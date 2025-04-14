import { z } from "zod";

const User = z.object({
  username: z.string(),
  password: z.string().min(6),
});

User.parse({ username: "Ludwig", password: "qtcinderalla" });

// extract the inferred type -> only in typescript
type User = z.infer<typeof User>;
// { username: string, password: string }
