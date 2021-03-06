import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        seeRoom:async(_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {id}=args;
            const {user}=request;

            const cansee =await prisma.$exists.room({
                participants_some:{
                    id: user.id
                }
            });
            if(cansee){
                return prisma.room({id});
            }else{
                throw Error("못찾음");
            }
        }
    }
}