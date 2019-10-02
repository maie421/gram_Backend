import { prisma } from "../../../../generated/prisma-client";
export default {
    Mutation: {
        editUser:(_,agrs,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {username,email,firstName,lastName,bio}=agrs;
            const {user}=request;
            
            return prisma.updateUser({
                where:{id:user.id},
                data:{
                    username,
                    email,
                    firstName,
                    lastName,
                    bio
                }
            });
        }
    }
};