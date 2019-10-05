import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        seeRoom:(_,__,{request})=>{
            const {user}=request;
            return prisma.rooms({
                where:{
                    participants_some:{id:user.id}
                }
            });
        }
    }
};