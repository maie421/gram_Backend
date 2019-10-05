import { prisma } from "../../../../generated/prisma-client";
export default {
    Mutation: {
        editUser:(_,agrs,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {username,email,firstName,lastName,bio,avatar}=agrs;
            const {user}=request;
            
            return prisma.updateUser({
                where:{id:user.id},
                data:{
                    username,
                    avatar,
                    email,
                    firstName,
                    lastName,
                    bio
                }
            });
        }
    }
};