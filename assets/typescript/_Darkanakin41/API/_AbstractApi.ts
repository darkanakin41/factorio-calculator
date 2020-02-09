import axios, {AxiosRequestConfig, CancelTokenSource} from "axios";
import _AbstractType from "../Type/_AbstractType";

export default class _AbstractApi<T extends _AbstractType> {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Search on the server
     */
    getAll(payload: any = {}, source?: CancelTokenSource) {
        let config: AxiosRequestConfig = {};
        if (source !== undefined) {
            config['cancelToken'] = source.token;
        }
        return axios.post(this.baseUrl + 'all', payload, config);
    }

    /**
     * Search on the server
     */
    getPaginated(payload: any, source?: CancelTokenSource) {
        let config: AxiosRequestConfig = {};
        if (source !== undefined) {
            config['cancelToken'] = source.token;
        }
        return axios.post(this.baseUrl + 'paginated', payload, config);
    }

    /**
     * Search on the server
     */
    retrieve(payload: any, source?: CancelTokenSource) {
        let config: AxiosRequestConfig = {};
        if (source !== undefined) {
            config['cancelToken'] = source.token;
        }
        return axios.post(this.baseUrl + 'retrieve', payload, config);
    }

    /**
     * Save the given entity
     */
    save(payload: T|any, source?: CancelTokenSource) {
        let config: AxiosRequestConfig = {};
        if (source !== undefined) {
            config['cancelToken'] = source.token;
        }

        let data: FormData | T = payload;
        let fileAttributes = this.getFileAttributes(payload);
        if(fileAttributes.length > 0){
            data = new FormData();
            Object.keys(payload).forEach((attribute:string) => {
                if(fileAttributes.indexOf(attribute) === -1){
                    let attributeValue:any = (payload as any)[attribute];
                    if(['array','object'].indexOf(typeof attributeValue) !== -1){
                        // @ts-ignore
                        data.append(attribute, JSON.stringify(attributeValue));
                    }else{
                        // @ts-ignore
                        data.append(attribute, attributeValue);
                    }
                }
            });

            config['headers'] = {
                'Content-Type': 'multipart/form-data'
            };
            fileAttributes.forEach((attribute:string) => {
                // @ts-ignore
                data.append(attribute, <any> payload[attribute]);
            });
        }

        return axios.post(this.baseUrl + 'save', data, config);
    }

    /**
     * Allow to remove the Entity
     */
    delete(payload: T, source?: CancelTokenSource) {
        let config: AxiosRequestConfig = {};
        if (source !== undefined) {
            config['cancelToken'] = source.token;
        }

        return axios.post(this.baseUrl + 'delete', {id: payload.id}, config);
    }

    /**
     * Retrieve files fields from the given entity
     * @param entity
     */
    private getFileAttributes(entity: T): string[] {
        let fileAttributes: string[] = [];
        Object.keys(entity).forEach((field:string) => {
            let value:any = (entity as any)[field];
            if(value !== undefined && value instanceof File){
                fileAttributes.push(field);
            }
        });
        return fileAttributes;
    }
}
