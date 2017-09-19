import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    constructor() {
        super();
        // need to do this for every method
        this.goToStore = this.goToStore.bind(this);
    }

    goToStore(event) {
        event.preventDefault();
        // grab text from box
        // change url
        console.log("You changed the URL");
        console.log(this.storeInput.value);
        const storeId = this.storeInput.value;
        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                {/* onSubmit = {(e) => {this.goToStore(e)}} */}
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder="Store Name"
                    defaultValue={getFunName()}
                    ref={(input) => {this.storeInput = input}}
                />
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

// react made this hard to use because context is usually discoveraged
StorePicker.contextTypes = {
    router: React.PropTypes.object
};

export default StorePicker;
