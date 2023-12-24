import { Song } from "../types";
import useAuthModel from "./useAuthModel";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";

const useOnPlay = (songs:Song[]) => {
    const player = usePlayer()
    const authModal = useAuthModel()
    const {user} = useUser()
    const onPlay = (id:string)=>{
        if(!user){
            return authModal.onOpen()
        }
        player.setId(id)
        player.setIds(songs.map((sgs)=>(sgs.id)))
    }
    return onPlay
}

export default useOnPlay