import {Resolver, Query} from 'type-graphql'

@Resolver()
export class DjerqResolver {
    @Query(() => Number)
    djerq() {
        return 1975
    }
}

