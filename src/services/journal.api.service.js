import {apiService, BASE_URL} from "./api.service";

const JOURNAL_URL = `${BASE_URL}/journal`;

export class JournalApiService {
    journalEntries = [];

    isLoaded = false;

    constructor(apiService) {
        this.apiService = apiService;
    }

    getList(forceReload = false) {
        if (forceReload) {
            this.isLoaded = false;
        }

        if (this.isLoaded) {
            return Promise.resolve(this.journalEntries);
        }

        return this.apiService.get(JOURNAL_URL)
            .then(({data}) => {

                this.isLoaded = true;
                this.journalEntries = data;

                return data;
            });
    }

    submitBookTake(clientId, bookId) {
        return this.apiService.put(`${JOURNAL_URL}/take`, {
            data: {
                client_id: clientId,
                book_id: bookId,
            }
        });
    }

    submitBookReturn(id) {
        return this.apiService.post(`${JOURNAL_URL}/return`, {
            data: {
                id,
            }
        });
    }
}

export const journalApiService = new JournalApiService(apiService);