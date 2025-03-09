import { useState } from 'react';
import { Container, Card, Button, Dropdown } from 'react-bootstrap';
import { Chart } from "react-google-charts";
import * as XLSX from 'xlsx';

export default function Charts(props) {
    const [type, setType] = useState("LineChart");
    const [pieData, setPieData] = useState([]);
    const colors = [
        '#573d64', '#643d4c', '#3d4364', '#3d6462', '#463d64', '#3d643d', '#4e643d'
    ];

    const keys = Object.keys(props.data[0]).filter(key => key !== 'time' && key !== 'date');
    const formatData = props.data.map((item) => [
        new Date(item.time || item.date),
        ...keys.map(key => item[key])
    ]);
    const chartData = [["Date", ...keys], ...formatData];

    const typeHandler = (newType) => {
        if (newType === "donat") {
            const newPieData = [
                ["Category", "Value"],
                ...keys.map((key) => [
                    key,
                    props.data.reduce((acc, item) => acc + item[key], 0)
                ])
            ];
            setPieData(newPieData);
        }
        setType(newType);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(props.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, "chart_data.xlsx");
    };

    const chartRender = () => {
        switch (type) {
            case 'linear':
                return (
                    <Chart
                        chartType="LineChart"
                        data={chartData}
                        options={{ title: props.title }}
                        width="100%"
                        height="400px"
                    />
                );
            case 'donat':
                return (
                    <Chart
                        chartType="PieChart"
                        data={pieData}
                        options={{
                            title: "Пончиковый график",
                            pieHole: 0.4,
                            slices: pieData.slice(1).map((_, index) => ({ color: colors[index] }))
                        }}
                        width="100%"
                        height="400px"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Container fluid className="p-3">
            <Card>
                <Card.Header className="fs-5 d-flex justify-content-between align-items-center">
                    {props.title || "График"}
                    <div>
                        <Dropdown onSelect={typeHandler} className="me-3">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Выбрать тип графика
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="LineChart">Линейный график</Dropdown.Item>
                                <Dropdown.Item eventKey="donat">Пончиковый график</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="success" onClick={exportToExcel}>
                            Скачать в Excel
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    {chartRender()}
                </Card.Body>
            </Card>
        </Container>
    );
}
