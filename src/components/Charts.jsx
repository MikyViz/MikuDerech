import { useState } from 'react';
import { Row, Button, Container, Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Charts(props) {

    const [type, setType] = useState("linear");
    const [pieData, setPieData] = useState([]);
    const colors = [
    '#573d64',
    '#643d4c',
    '#3d4364',
    '#3d6462',
    '#463d64',
    '#3d643d',
    '#4e643d',
    '#3d6454',
    '#64513d',
    '#5d643d',
]
    const keys = Object.keys(props.data[0]).filter(key => key !== 'time' && key !== 'date');

    const typeHandler = () => {
        setType((prev) => {
            if (prev === 'linear') {
                const newPieData = keys.map((key, i) => ({
                    name: key,
                    value: props.data.reduce((acc, item) => acc + item[key], 0),
                    color: colors[i]
                }));
                setPieData(newPieData);
                return 'donat';
            } else {
                return 'linear';
            }
        });
    };
    return (
        <Container fluid className="p-3">
            <Card>
                <Card.Header>Performance Percentage <Button className='btn-secondary btn-sm' onClick={typeHandler}>switch</Button></Card.Header>
                <Card.Body>
                    <ResponsiveContainer width="100%" height={300}>
                        {type === 'linear' ? <LineChart data={props.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {keys.map((key, i) => (
                                <Line key={key} type="monotone" dataKey={key} stroke={colors[i]} />
                            ))}
                        </LineChart> :
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        }
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
        </Container>
    );
}
