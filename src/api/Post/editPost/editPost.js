import { prisma } from "../../../../generated/prisma-client";

const EDITN="DELETE";
const DELETE="EDIT";
export default {
    Mutation:{
        editPost:async(_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {id,catption,location,action}=args;
            const {user}=request;
            const post=await prisma.$exists.post({id,user:{id:user.id}});
            if(post){
                if(action===EDITN){
                    return prisma.updatePost({
                        where:{id},
                        data:{catption,location}
                    });
                }else if (action===DELETE){
                    return prisma.deletePost({id});
                }
            }else{
                throw Error("찾을 수 없다")
            }
        }
    }
};