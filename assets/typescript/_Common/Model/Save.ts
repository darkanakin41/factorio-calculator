import IdData from '../../_Darkanakin41/ApiPlatform/Model/IdData'
import User from "./User";

export default class Save extends IdData<string> {
    name: string
    public: boolean

    owner: User | null
}


export function newSave(): Save {
    return <Save>{
        name: '',
        public: false,
        owner: null,
    }
}
