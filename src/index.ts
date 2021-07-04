import 'reflect-metadata';
import {MikroORM} from '@mikro-orm/core'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { __prod__ } from './constants';
// import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';

import { HelloResolver } from './resolvers/hello';
import { DjerqResolver } from './resolvers/djerq';
import { PostResolver } from './resolvers/post';


const main = async () => {
const orm = await MikroORM.init(mikroConfig);
// run migrations first
await orm.getMigrator().up();

const app = express();

const apolloServer = new ApolloServer({
    schema: await buildSchema({
        resolvers:[HelloResolver, DjerqResolver, PostResolver],
        validate: false, //disable built-in validator

    }),
    context: () => ({em:orm.em})
});

apolloServer.applyMiddleware({app})


// check rest API 
// app.get('/', (_,res) => {
//     res.status(200).send('Hello')
// })

app.listen(4000, () => {
    console.log('Server up on PORT:4000')
})

// run sql => create first posts
// const post = orm.em.create(Post, {title: 'My first post'})
// await orm.em.persistAndFlush(post);


// check first posts
// const posts = await orm.em.find(Post, {})
// console.log(posts);

}

main().catch(err => console.error(err));
