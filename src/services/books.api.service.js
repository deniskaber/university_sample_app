import {apiService, BASE_URL} from "./api.service";

const BOOKS_API = `${BASE_URL}/books`;

export class BooksApiService {
    books = [];

    isLoaded = false;

    constructor(apiService) {
        this.apiService = apiService;
    }

    getList(forceReload = false) {
        if (forceReload) {
            this.isLoaded = false;
        }

        if (this.isLoaded) {
            return Promise.resolve(this.books);
        }

        return this.apiService.get(BOOKS_API)
            .then(({data}) => {

                this.isLoaded = true;
                this.books = data;

                return data;
            });
    }
}

export const booksApiService = new BooksApiService(apiService);