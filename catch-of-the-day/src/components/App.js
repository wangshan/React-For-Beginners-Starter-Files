import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import SampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);

        // getInitialState
        this.state = {
            fishes: {},
            order: {}
        };
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

    loadSamples() {
        this.setState({
            fishes: SampleFishes
        });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Seabass"/>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        )
    }
}

export default App;
