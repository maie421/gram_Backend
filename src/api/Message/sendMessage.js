import { prisma } from "../../../generated/prisma-client";
import {ROOM_FRAGMENT} from "../../fragments";

export default {
    Mutation:{
        sendMessage:async (_,args,{request,isAuthenticated })=>{
            isAuthenticated(request);
            const {roomId,toId,message}=args;
            const {user}=request;
            let room;
            if(roomId===undefined){
                if(user.id!==toId){
                room = await prisma
                .createRoom({
                    participants:{
                        connect:[
                            {id:toId},{id:user.id}
                        ]
                    }
                })
                .$fragment(ROOM_FRAGMENT);
                }
            }else{
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            }
            if(!room){
                throw Error("방없음 에러");
            }
            
            const getTo=room.participants.filter(
                participant=>participant.id!==user.id
            )[0];
            console.log(getTo);
            return prisma.createMessage({
                text: message,
                from: {
                    connect:{id:user.id}
                },
                to:{
                    connect:{id: roomId? getTo.id: toId}
                },
                room: {
                    connect:{id:roomId}
                }
            });
            
        }
    }
};
