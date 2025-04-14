"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const User = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
User.parse({ username: "Ludwig", password: "qtcinderalla" });
// { username: string, password: string }
