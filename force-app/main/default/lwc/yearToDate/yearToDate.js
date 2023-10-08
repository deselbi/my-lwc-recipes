import { LightningElement } from 'lwc';

const QUERY_URL = 'https://mmock.meteorsoft.rs/ytd';

export default class YearToDate extends LightningElement {
    data = {
        ytd: '',
        daily: ''
    };

    async x() {
        try {
            this.isLoading = true;
            const response = await fetch(QUERY_URL);
            // fetch isn't throwing an error if the request fails.
            // Therefore we have to check the ok property.
            // The thrown error will be caught on the catch() method
            if (!response.ok) {
                throw Error(response);
            }
            this.data = await response.json();
        } catch (error) {
            this.error = error;
            this.data = {};
        } finally {
            // Remove spinner once we're done regardless of whether the operation succeeded or not
            this.isLoading = false;
        }
    }

    connectedCallback() {
        this.x();
    }
}
