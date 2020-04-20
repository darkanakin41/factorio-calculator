import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import Mod from '../Model/Mod'
import AxiosResponseExt from "../../_Darkanakin41/ApiPlatform/Model/AxiosResponseExt";

export default class ModResource extends AbstractApiResource<Mod> {
    readonly prefix: string = 'mods'

    private readFileAsync(file:File):Promise<string>{
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = () => {
                resolve(btoa(reader.result as string));
            };

            reader.onerror = reject;

            reader.readAsBinaryString(file);
        })
    }

    async uploadFile(id: number | string, files: { recipesFile: File | null, itemsFile: File | null }) {
        let path = `${this.prefix}/${id}/upload-file`

        const payload: { recipesFile: string | null, itemsFile: string | null } = {
            recipesFile: null,
            itemsFile: null,
        }
        if(files.itemsFile){
            payload.itemsFile = await this.readFileAsync(files.itemsFile) as string
        }
        if(files.recipesFile){
            payload.recipesFile = await this.readFileAsync(files.recipesFile) as string
        }

        let promise = this.wrapPromise(this.axios.put(path, payload))
        return promise as Promise<Mod & AxiosResponseExt>
    }
}
