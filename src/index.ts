import {MikroORM} from '@mikro-orm/core'
import express from 'express'
import { __prod__ } from './constants';
// import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';


const main = async () => {
const orm = await MikroORM.init(mikroConfig);
// run migrations first
await orm.getMigrator().up();

const app = express();


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
