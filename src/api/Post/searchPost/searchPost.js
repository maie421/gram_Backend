import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        searchPost:async(_,args)=>
            prisma.posts({
                where:{
                    OR:[
                        {caption_contains:args.term},
                        {location_starts_with: args.term }
                    ]
                }
        }) 
    }
};

