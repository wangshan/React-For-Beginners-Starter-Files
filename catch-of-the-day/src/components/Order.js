import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // store JSX in a variable
        const removeButton = <button onClick={() => this.props.removeOrder(key)}>&times;</button>;

        if (!fish || fish.status === 'unavailable') {
            return <li key={key}>
                     Sorry, {fish ? fish.name : 'fish'} is not available
                     {removeButton}
                   </li>
        }

        return (
            <li key={key}>
            <span>
                <CSSTransitionGroup component="span" className="count"
                    transitionName="count"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}
                    >
                    {/* react will duplicate this span for the timeout period
                        in order for it to know which one to add -enter, -leave,
                        we must add keys to each span
                        */}
                    <span key={count}>{count}</span>
                </CSSTransitionGroup>
                lbs
                {fish.name}
                {removeButton}
            </span>
            <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        )
    }

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price || 0);
            }
            else {
                return prevTotal;
            }
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <CSSTransitionGroup className="order" component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Order;
