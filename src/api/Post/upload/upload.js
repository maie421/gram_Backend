import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        upload:async (_,agrs,{request,isAuthenticated })=>{
            isAuthenticated(request);
            const {user}=request;
            const {caption,files}=agrs;

            const post=await prisma.createPost({
                caption,
                user:{connect: {id:user.id}}
            });
            files.forEach(async file => {
               await prisma.createFile({
                    url:file,
                    post:{
                        connect:{
                            id:post.id
                        }
                    }
                })
            });
            return post;
        }
    }
}