
import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";


@Resolver()
export class PostResolver {
    // get all posts
    @Query(() => [Post])
    posts(
        @Ctx() ctx:MyContext
    ):Promise<Post[]>{
        return ctx.em.find(Post, {})
    }
    //get one post by id
    @Query(() => Post, {nullable: true})
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() ctx:MyContext
    ):Promise<Post | null>{
        return ctx.em.findOne(Post, {id})
    }

    //create new post
    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() ctx:MyContext
    ):Promise<Post>{
        const post = ctx.em.create(Post, {title})
        await ctx.em.persistAndFlush(post)
        return post
    }

    //update post
    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg('id') id: number,
        @Arg('title', () => String, {nullable: true}) title: string,
        @Ctx() ctx:MyContext
    ):Promise<Post | null>{
        const post = await ctx.em.findOne(Post, {id})
        if (!post) {
            return null
        }

        if (typeof title !=='undefined') {
            post.title = title
            await ctx.em.persistAndFlush(post)
        }
        
        return post
    }



}