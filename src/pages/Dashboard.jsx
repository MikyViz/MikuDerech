import { Row, Col, Container, Card } from 'react-bootstrap';
import Charts from '../components/Charts';
import planed_act from '../../json/planed_act.json';

const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];
console.log(planed_act);

const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

export default function Dashboard() {
    return (
        <Container fluid>
            <Row>
                <Col x={6}><Charts data={planed_act} /></Col>
                <Col x={6}><Charts data={data} /></Col>
            </Row>
            <Row>
                <Col x={6}><Charts data={data} /></Col>
                <Col x={6}><Charts data={data} /></Col>
            </Row>
        </Container>
    );
}
