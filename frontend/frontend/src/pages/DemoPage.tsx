import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Input } from "react-aria-components";
import ImperativeHandleHookParentComponent from "../components/test/TestUseImperativeHandleComponent";
import TestFormComponent from "../components/forms/TestFormComponent";
import { useLocation, useParams } from "react-router-dom";
import { useGetHelloQuery, useLazyGetHelloQuery } from "../store/api/hello-world.api";
import { useAppDispatch, useAppSelector } from "../store/redux.hooks";
import { changeTest } from "../store/slices/test.slice";
import { addToast } from "../store/slices/toast.slice";
import { uid } from "radash";


const DemoPage: FunctionComponent = () => {

    const dispatch = useAppDispatch();

    const { state } = useLocation();
    const params = useParams();
    const { test } = useAppSelector(state => state.test);

    const [localTestState, setLocalTestState] = useState(test);

    const { data: getHelloWorldData, error } = useGetHelloQuery();

    const [getHelloWorld] = useLazyGetHelloQuery();

    const getHelloWorldCb = useCallback(async () => {
        try {
            const result = await getHelloWorld();
            console.log('Result:', result.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [getHelloWorld]);


    const getHelloWorld2 = useCallback(async () => {
        await getHelloWorld()
            .unwrap()
            .then((result) => {
                console.log('Result:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {

            });

    }, [getHelloWorld]);

    const changeTestCb = useCallback(() => {
        dispatch(changeTest(localTestState));
    }, [localTestState, dispatch]);

    useEffect(() => {
        console.log('DemoPage mounted :', state);
        console.log('Params:', params);
        if (state.from) {
            console.log(`From: ${state.from}`);
        }
    }, [state, params]);


    const [counter, incrementCounter] = useState(0);
    const [counter2, incrementCounter2] = useState(0);

    const counterMemo = useMemo(() => {
        return counter + counter2;
    }, [counter, counter2]);

    const resetCounters = () => {
        incrementCounter(0);
        incrementCounter2(0);
    };

    return (
        <div className="demo-page">
            <h1>This is DemoPage</h1>

            <div style={{display: 'flex', flexDirection: 'column', border: '1px solid var(--gray-dark)', margin: '2rem'}}>
                <span>Manage Local State</span>
                <br/>
                <div>
                    <Button onPress={() => incrementCounter(counter + 1)}>Increment Counter 1</Button>
                    <Button onPress={() => incrementCounter2(counter2 + 1)}>Increment Counter 2</Button>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>Counter 1: {counter}</span>
                    <span>Counter 2: {counter2}</span>
                    <span>Counter memo addition: {counterMemo}</span>
                    <Button onPress={resetCounters}>Reset Counters</Button>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', border: '1px solid var(--gray-dark)', margin: '2rem'}}>
                <h1>useRef</h1>
                <br/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ImperativeHandleHookParentComponent />
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', border: '1px solid var(--gray-dark)', margin: '2rem'}}>
                <h1>React-Hook-Form & Zod</h1>
                <br/>
                <TestFormComponent />
            </div>

            <div style={{display: 'flex', flexDirection: 'column', border: '1px solid var(--gray-dark)', margin: '2rem'}}>
                <h1>Redux state</h1>
                <br/>
                <div>
                    <span>Global State: {test}</span>
                    <br/>
                    <span>Local State: {localTestState}</span>
                    <br/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                    <Input value={localTestState} onChange={(e) => setLocalTestState(e.target.value)} />
                    <Button onPress={changeTestCb}>Change global state</Button>
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', border: '1px solid var(--gray-dark)', margin: '2rem'}}>
                <h1>Async call to /hello-world</h1>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                    {getHelloWorldData && <div>Data: {getHelloWorldData.response ?? undefined}</div>}
                    {error && 'status' in error && error.status} {error && 'data' in error && JSON.stringify(error.data)}
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', border: '1px solid var(--gray-dark)', margin: '2rem'}}>
                <h1>Async call to /hello-world controlled</h1>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                    <Button onPress={getHelloWorldCb}>Get Hello World</Button>
                    <Button onPress={getHelloWorld2}>Get Hello World 2</Button>
                </div>
            </div>

            <div>
                <Button onPress={() => dispatch(addToast({ id: uid(7), message: 'Test', type: 'success'}))}>Show toast</Button>
            </div>

        </div>
    );

};

export default DemoPage;