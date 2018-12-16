import {apiService, BASE_URL} from "./api.service";

const CLIENTS_API = `${BASE_URL}/clients`;

export class ClientsApiService {
    clients = [];

    isLoaded = false;

    constructor(apiService) {
        this.apiService = apiService;
    }

    getList(forceReload = false) {
        if (forceReload) {
            this.isLoaded = false;
        }

        if (this.isLoaded) {
            return Promise.resolve(this.clients);
        }

        return this.apiService.get(CLIENTS_API)
            .then(({data}) => {

                this.isLoaded = true;
                this.clients = data;

                return data;
            });
    }

    getClientsHashObject() {
        return this.getList().then(data => {
            return data.reduce((result, item) => {
                result[item.id] = `${item.first_name} ${item.last_name}`;
                return result;
            }, {});
        })
    }
}

export const clientsApiService = new ClientsApiService(apiService);