import { LightningElement, track } from 'lwc';

const QUERY_URL = 'https://mmock.meteorsoft.rs/mtd';

export default class MonthToDate extends LightningElement {
    @track lastStyle = '';
    @track actualStyle = '';
    @track spaceStyle = 'width: 33%';
    loaded = false;

    data = {
        last: 0,
        actual: 0,
        goal: 100
    };

    async x() {
        if (this.loaded) {
            return;
        }
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

            this.lastPercent = (100 * this.data.last) / this.data.goal;
            this.actualPercent =
                ((100 * this.data.actual) / this.data.goal) *
                (1 / (this.data.last / this.data.goal));
            this.actualPercent = (100 * this.data.actual) / this.data.last;
            this.spacePercent =
                97 - Math.max(this.lastPercent, this.actualPercent);

            console.log(
                'width:' +
                    this.lastPercent +
                    '%  width:' +
                    this.actualPercent +
                    '%'
            );

            this.lastStyle = 'width:' + this.lastPercent + '%';
            this.actualStyle = 'width:' + this.actualPercent + '%';
            this.spaceStyle = 'width:' + this.spacePercent + '%';
        } catch (error) {
            this.error = error;
            this.data = {};
        } finally {
            // Remove spinner once we're done regardless of whether the operation succeeded or not
            this.isLoading = false;
            this.loaded = true;
        }
    }

    connectedCallback() {
        this.x();
    }
}
