import { FunctionComponent, forwardRef, useImperativeHandle, useRef } from 'react';

type ChildComponentProps = {
    name: string;
};

type ChildComponentRefProps = {
    focus: () => void;
};

const ChildComponent = forwardRef<ChildComponentRefProps, ChildComponentProps>((props, ref) => {
        
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            console.log('focus called');
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }));

    return (
        <input ref={inputRef} readOnly type="text" value={props.name} />
    );
});

const ParentComponent: FunctionComponent = () => {
    
    const childRef = useRef<ChildComponentRefProps>(null);

    const onPressFocusChild = () => {
        if (childRef.current) {
            childRef.current.focus()
        }
    };

    return (
        <div>
            <h1>Hello World</h1>
            <ChildComponent ref={childRef} name={"John Doe"} />
            <button onClick={() => onPressFocusChild()}>
                Focus input
            </button>
        </div>
    );
};

export default ParentComponent;