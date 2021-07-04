
// Not working check why for the future refs.

import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path'


export default {
    migrations: {
    path: path.join(__dirname, './migrations'), // path to folder with migration files
    pattern: /^[\w-]+\d+\.[jt]s$/, // how to match migration files
    disableForeignKeys: false,
    },
    entities: [Post],
    dbName: 'long',
    type: 'postgresql',
    user: 'cinek',
    password:'password',
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];

