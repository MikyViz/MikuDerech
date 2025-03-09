import { Row, Col, Container, Card } from 'react-bootstrap';
import Charts from '../components/Charts';
import planed_act from '../../json/planed_act.json';
import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { GlobalStateContext } from '../GlobalStateProvider';

const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];


export default function Dashboard() {
    const url = import.meta.env.VITE_URL;
    const userId = import.meta.env.VITE_USERID;
    const user = import.meta.env.VITE_USER;
    const password = import.meta.env.VITE_PASSWORD;
    const { globalState, setGlobalState } = useContext(GlobalStateContext);

    
    const fetchTripsPlannedVSPerformed = async () => {
        const url = 'https://mdapi.kolkasher.co.il/api/md/TripsPlannedVSPerformed';
        console.log('Запрос на:', url);
        const reqData = {
            UserId: userId,
            StartDate: globalState.currentFilter.StartDate,
            EndDate: globalState.currentFilter.currentDate,
            City: globalState.currentFilter.City
        };
        const body = {
            userName: user,
            password: password,
            data: reqData
        };

        try {
            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });

            const result = response.data;
            console.log(result);

            if (result.result === 0) {
                console.log('Операция выполнена успешно:', result.ResData);
            } else {
                console.error('💩Ошибка выполнения операции:', result.Msg);
            }
        } catch (error) {
            console.error('💩Произошла ошибка при выполнении запроса:', error);
        }
    };

    // Вызов функции
    // fetchTripsPlannedVSPerformed();
    return (
        <Container fluid>
            <Row>
                <Col x={6}><Charts data={planed_act} types={['linear', 'donat', 'area', 'bar', 'horizontal-bar']} title='תכנון / ביצוע(זמן אמת)' /></Col>
                <Col x={6}><Charts data={data} /></Col>
            </Row>
            <Row>
                <Col x={6}><Charts data={data} /></Col>
                <Col x={6}><Charts data={data} /></Col>
            </Row>
        </Container>
    );
}
