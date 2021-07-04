import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType() // for graphql
@Entity()
export class Post {
    @Field(() => Int)
    @PrimaryKey()
    id!:number;
    
    @Field(() => String)
    @Property({type: 'date'})
    createdAt = new Date();

    @Field(() => String)
    @Property({type: 'date', onUpdate: () => new Date()})
    updatedAt = new Date();

    @Field(() => String)
    @Property({type: 'text'})
    title!: string;

}