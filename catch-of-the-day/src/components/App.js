import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import SampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

        // getInitialState
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount() {
        // change state before rendering
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        // check if there is order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if (localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        // release resources
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        // can not use this.setState here
        localStorage.setItem(`order-${this.props.params.storeId}`,
                             JSON.stringify(nextState.order));
    }

    addFish(fish) {
        // 1. update state
        // this.state.fishes.fish1 = fish;
        // copy the existing fishes state
        let fishes = {...this.state.fishes};
        // add new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // 2. set state
        this.setState({fishes: fishes});
    }

    updateFish(key, fish) {
        let fishes = {...this.state.fishes};
        fishes[key] = fish;
        this.setState({fishes: fishes});
    }

    loadSamples() {
        this.setState({
            fishes: SampleFishes
        });
    }

    addToOrder(key) {
        // take a copy of the state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        this.setState({
            order: order
        });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Seabass"/>
                    <ul className="list-of-fishes">
                        {
                            Object.keys(this.state.fishes).map(
                                key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
                            )
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params}/>
                <Inventory addFish={this.addFish} updateFish={this.updateFish} loadSamples={this.loadSamples} fishes={this.state.fishes} />
            </div>
        )
    }
}

export default App;
