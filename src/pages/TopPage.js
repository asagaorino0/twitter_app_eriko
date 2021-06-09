import React, { useEffect, useContext, useState, } from 'react'
import { fetchGetData } from '../apis/index'
import { Store } from '../store/index'
import { Form, Button } from 'react-bootstrap'
import { ALART, INCREMENT, DECREMENT, RESET, ADD_EVENT, GUU, CHOKI, PAA, GET_DATA } from '../actions/index'
import { useHistory } from 'react-router-dom'

const TopPage = () => {
    const [title, setTitle] = useState('');
    const [isBtnHide, setIsBtnHide] = useState(true)

    const { globalState, setGlobalState } =
        useContext(Store)

    const Click = () => {
        setGlobalState({
            type: ALART,
            title,
        }, [globalState.alart]);
        // });
        alert(globalState.alart)
    };
    const incrment = () => {
        setGlobalState({
            type: INCREMENT,
        });
    };
    const decrment = () => {
        setGlobalState({
            type: DECREMENT
        });
    };
    const reset = () => {
        setGlobalState({
            type: RESET
        });
    };
    const handleClick = () => {
        setIsBtnHide("");
        setGlobalState({
            type: ADD_EVENT,
            title,
        });
    }
    const guu = () => {
        setGlobalState({
            type: GUU,
        });
    }
    const choki = () => {
        setGlobalState({
            type: CHOKI,
        });
    }
    const paa = () => {
        setGlobalState({
            type: PAA,
        });
    }
    useEffect(() => {
        fetchGetData().then(res => {
            setGlobalState({
                type: GET_DATA,
                data: res.data
            })
        })
        // eslint-disable-next-line
    }, [])
    const history = useHistory();
    const secondPage = () => {
        const hello = (globalState.nandemo)
        history.push(`/SecondPage/${hello}`)
    };
    console.log(globalState)

    return (
        <div style={{ marginLeft: '50' }}>
            <p>
                <Button onClick={Click}>押して!</Button>{' '}
            </p>
            <p>
                <button onClick={guu}>ぐー</button>
                <button onClick={choki}>ちょき</button>
                <button onClick={paa}>ぱー</button>
            </p>
            <div >
                <h2>あなた：{globalState.me}</h2>
                <h2>ＣＰＵ：{globalState.cpu}</h2>
                <div style={{ color: 'red', fontSize: '50px', marginTop: 0 }}>
                    <h1>{globalState.syouhai}</h1>
                </div>
            </div>
            <button onClick={incrment}>いいねいいね</button>
            <button onClick={decrment}>よくないね</button>
            <button onClick={reset}>RESET</button>
            <h3>{globalState.count}</h3>
            <Form>
                {/* <Form.Group controlId="formBasicPassword"> */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>なにか文字を入力してください</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="nandemo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Button onClick={handleClick}>o.k.!</Button>{' '}
                {!isBtnHide &&
                    <button onClick={secondPage}>{globalState.nandemo} → </button>
                }
            </Form>
            <h1>{globalState.nandemo}</h1>
            <div style={{ color: 'red' }}>
                <h1>{globalState.error}</h1>
            </div>
            <div style={{}}>
                {
                    globalState.user_data.map(item => (
                        <div key={item.id} style={{ marginTop: '30px', borderTop: '1px solid' }}>
                            <div style={{ margin: '30px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div>
                                        <a href={item.url}>
                                            <img
                                                width={64}
                                                height={64}
                                                borderradius="50%"
                                                alt=""
                                                src={item.user.profile_image_url}
                                            />
                                        </a>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <h4 className="" style={{ marginBottom: '0px' }}>
                                            {item.user.name}
                                        </h4>
                                        <small> {item.updated_at}に更新</small>
                                    </div>
                                </div>
                                <a href={item.url} style={{ textDecoration: 'none', color: '#3e3e3e' }}>
                                    <h3 className="css-cgzq40">{item.title}</h3>
                                </a>
                            </div>
                        </div>
                    ))}
            </div>
        </div >
    );
};

export default TopPage
