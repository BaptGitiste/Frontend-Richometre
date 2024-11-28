import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';

const MyContext = React.createContext<{name: string, setName: Dispatch<SetStateAction<string>>}>({name: 'John Doe', setName: () => {}});

const ChildComponent: FunctionComponent = () => {
    const myContext = useContext(MyContext);

    return (
        <>
            <h1>Hello {myContext.name} ! , from child component</h1>
            <input type="text" value={myContext.name} onChange={(e) => myContext.setName(e.target.value)} />
        </>
    );
};

const ParentComponent: FunctionComponent = () => {

    const [name, setName] = useState('John Doe');

    return (
        <div>
            <h1>Hello {name}</h1>
            <MyContext.Provider value={{name, setName}}>
                <ChildComponent />
            </MyContext.Provider>
        </div>
    );
};

export default ParentComponent;