import React from "react";

type TestLifeCycleProps = {
    name: string;
};

type TestLifeCycleState = {
    name: string;
    changed: boolean;
};


export class TestLifeCycleComponent extends React.Component<TestLifeCycleProps, TestLifeCycleState> {

    constructor(props: TestLifeCycleProps) {
        super(props);
        this.state = {
            name: props.name ?? 'John',
            changed: false
        };
        console.log('Constructor called');
    }

    componentDidMount() {
        console.log('Component mounted');
      }
    
    componentWillUnmount() {
        console.log('Component unmounted');
    }

    static getDerivedStateFromProps(props: TestLifeCycleProps, state: TestLifeCycleState) {
        console.log('getDerivedStateFromProps called');
        console.log('props', props);
        console.log('state', state);
        return null;
    }

    shouldComponentUpdate(nextProps: TestLifeCycleProps, nextState: TestLifeCycleState) {
        console.log('shouldComponentUpdate called');
        console.log('nextProps', nextProps);
        console.log('nextState', nextState);
        return true;
    }

    getSnapshotBeforeUpdate(nextProps: TestLifeCycleProps, nextState: TestLifeCycleState) {
        console.log('getSnapshotBeforeUpdate called');
        console.log('nextProps', nextProps);
        console.log('nextState', nextState);
        return null;
    }

    componentDidUpdate(prevProps: TestLifeCycleProps, prevState: TestLifeCycleState) {
        console.log('componentDidUpdate called');
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
    }

    changeName = () => {
        console.log('changeName called');
        this.setState({
            name: 'Jane',
            changed: true
        });
    };

    render() {
        console.log('render called');
        return (
            <div>
                <h2>Lifecycle component</h2>
                <div>Name {this.state.changed ? <h3>{this.state.name}</h3>: <p>{this.state.name}</p>}</div>
                <button onClick={this.changeName}>Change Name</button>
            </div>
        );
    }
}