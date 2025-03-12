import { useState } from 'react';
import { Row, Col, Button, Container, Card, Dropdown, } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, Rectangle } from 'recharts';
import * as XLSX from 'xlsx';

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
    const formatData = props.data.map((item, i) => {
        const date = new Date(item.time || item.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return { ...item, date: `${year}-${month < 10 ? '0' + month : month}` };
    })
    console.log(formatData);

    const typeHandler = (newType) => {

        if (newType === "donat") {
            const newPieData = keys.map((key, i) => ({
                name: key,
                value: props.data.reduce((acc, item) => acc + item[key], 0),
                color: colors[i]
            }));
            setPieData(newPieData);
        }
        setType(newType);
    };
    // Экспорт данных в Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(formatData); // Конвертируем данные в лист Excel
        const workbook = XLSX.utils.book_new(); // Создаем новую книгу Excel
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data"); // Добавляем лист в книгу
        XLSX.writeFile(workbook, "chart_data.xlsx"); // Скачиваем файл
    };

    const chartRender = () => {
        switch (type) {
            case 'linear':
                return (
                    <LineChart data={formatData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={keys.includes('time') ? 'time' : 'date'} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {keys.map((key, i) => (
                            <Line key={key} type="monotone" dataKey={key} stroke={colors[i]} />))}
                    </LineChart>)
            // break;
            case 'donat':
                return (
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )
            // break;
            case 'area':
                return (
                    <AreaChart data={formatData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={keys.includes('time') ? 'time' : 'date'} />
                        <YAxis />
                        <Tooltip />
                        {keys.map((key, i) => (
                            <Area key={i} type="monotone" dataKey={key} stackId={i} stroke={colors[i]} fill={colors[colors.length - i]} />
                        ))
                        }
                    </AreaChart>
                )
            case 'bar':
                return (
                    <BarChart data={formatData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={keys.includes('time') ? 'time' : 'date'} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {keys.map((key, i) => (
                            <Bar key={key} dataKey={key} stroke={colors[i]} fill={colors[colors.length - i]} activeBar={<Rectangle fill={colors[colors.length - i]} stroke={colors[i]} />} />
                        ))
                        }
                    </BarChart>
                )
            // break;
            case 'horizontal-bar':
                return (
                    <BarChart data={formatData} layout="vertical"> {/* Горизонтальная ориентация */}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey={keys.includes('time') ? 'time' : 'date'} type="category" />
                        <Tooltip />
                        <Legend />
                        {keys.map((key, i) => (
                            <Bar key={key} dataKey={key} stroke={colors[i]} fill={colors[colors.length - i]} />
                        ))}
                    </BarChart>
                );
            default:
                return null;
        }
    }
    return (
        <Container fluid className="p-3">
            <Card>
                <Card.Header className='fs-5'>
                            {props.title}
                            <hr/>
                    <Row>
                        <Col>
                            <Dropdown onSelect={typeHandler}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    בחר סוג של גרף
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {props.types ? props.types.map((type, i) => (<Dropdown.Item key={i} eventKey={type}>{type}</Dropdown.Item>))
                                        :
                                        <Dropdown.Item eventKey={'linear'}>linear</Dropdown.Item>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <Button variant="success" onClick={exportToExcel} className="ms-3">
                                הורדה ב- Excel
                            </Button>
                        </Col>
                    </Row>

                </Card.Header>
                <Card.Body>
                    <ResponsiveContainer width="100%" height={300}>
                        {
                            chartRender()
                        }
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
        </Container>
    );
}
