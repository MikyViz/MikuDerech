import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { GlobalStateContext } from '../GlobalStateProvider';

function Filters() {
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const url = import.meta.env.VITE_URL;
    const userId = import.meta.env.VITE_USERID;
    const user = import.meta.env.VITE_USER;
    const password = import.meta.env.VITE_PASSWORD;
    const currentDate = new Date(); // Текущая дата
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3); // Текущая дата минус 3 месяца
    const [filterOptions, setFilterOptions] = useState({});
    const reqData = {
        UserId: userId,
        SelectChoice: ''
    };

    const body = {
        userName: user,
        password: password,
        data: reqData
    };

    const [filters, setFilters] = useState({
        Agency: '',
        Cluster: '',
        SubCluster: '',
        City: '',
        LineID: '',
        LineType: '',
        linegroup: '',
        StartDate: threeMonthsAgo.toISOString().split('T')[0],
        EndDate: currentDate.toISOString().split('T')[0]
    });

    const handleFiltersChange = (e) => {
        const { id, value } = e.target;
        // if (id === 'StartDate') {
        //     reqData.StartDate = value;
        //     getFilterOptions();
        // }
        switch (id) {
            case 'StartDate':
                reqData.StartDate = value;
                getFilterOptions();
                console.log(filterOptions);

                break;
            case 'EndDate':
                reqData.EndDate = value;
                getFilterOptions();
                console.log(filterOptions);

                break;
            case 'Agency':
                reqData.AgencyId = value;
                getFilterOptions();
                console.log(filterOptions);

                break;
            case 'Cluster':
                reqData.ClusterId = value.Clusterid;
                getFilterOptions();
                console.log(filterOptions);
                break;

            case 'City':
                reqData.City = value;
                getFilterOptions();
                console.log(filterOptions);
                break;
            case 'LineId':
                reqData.LineID = value;
                getFilterOptions();
                console.log(filterOptions);

                break;
            case 'LineType':
                reqData.LineType = value;
                getFilterOptions();
                console.log(filterOptions);

                break;
            case 'linegroup':
                reqData.linegroup = value.id;
                getFilterOptions();
                console.log(filterOptions);
                break;
            default:
                break;
        }
        setFilters(prevFilters => ({
            ...prevFilters,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(filters).every(value => value === '')) {
            console.warn('Форма пуста, фильтры не добавлены');
            return;
        }
        setGlobalState(prev => ({
            ...prev,
            filters: [
                ...prev.filters,
                filters
            ],
            currentFilter: filters
        }));

        console.log('Фильтры:', filters);
        console.log('currentFilter:', filters);
    };

    const getFilterOptions = async () => {
        // const reqData = {
        //     UserId: userId,
        //     SelectChoice: 'Cities'
        // };

        // const body = {
        //     userName: user,
        //     password: password,
        //     data: reqData
        // };
        reqData.SelectChoice = 'Cities';

        console.log('URL:', `${url}/UserChoice`);
        console.log('Тело запроса:', body);

        try {
            const response_cities = await axios.post(`${url}/UsersChoice`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setFilterOptions((prev) => ({
                ...prev,
                City: response_cities.data.ResData
            }));

            reqData.SelectChoice = 'Agency';
            const response_agency = await axios.post(`${url}/UsersChoice`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setFilterOptions((prev) => ({
                ...prev,
                Agency: response_agency.data.ResData
            }));

            reqData.SelectChoice = 'Cluster';
            const response_cluster = await axios.post(`${url}/UsersChoice`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setFilterOptions((prev) => ({
                ...prev,
                Cluster: response_cluster.data.ResData
            }));

            reqData.SelectChoice = 'SubCluster';
            const response_subcluster = await axios.post(`${url}/UsersChoice`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setFilterOptions((prev) => ({
                ...prev,
                SubCluster: response_subcluster.data.ResData
            }));

            reqData.SelectChoice = 'LineType';
            const response_linetype = await axios.post(`${url}/UsersChoice`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setFilterOptions((prev) => ({
                ...prev,
                LineType: response_linetype.data.ResData
            }));

            reqData.SelectChoice = 'LineID';
            const response_lineid = await axios.post(`${url}/UsersChoice`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setFilterOptions((prev) => ({
                ...prev,
                LineID: response_lineid.data.ResData
            }));

            reqData.SelectChoice = 'linegroup';
            const response_linegroup = await axios.post(`${url}/UsersChoice`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setFilterOptions((prev) => ({
                ...prev,
                linegroup: response_linegroup.data.ResData
            }));
        } catch (error) {
            console.error('Ошибка при запросе:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getFilterOptions();
        console.log('filterOptions:', filterOptions);

    }, [url, userId, user, password]);

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
                <Form.Group as={Col} controlId="Agency">
                    <Form.Label>מפעיל:</Form.Label>
                    <Form.Select value={filters.Agency} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        {filterOptions.Agency?.map((option, index) => (
                            <option key={index} value={option.agency_id}>{option.agency_name}</option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="Cluster">
                    <Form.Label>אשכול (אזורים):</Form.Label>
                    <Form.Select value={filters.Cluster} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        {filterOptions.Cluster?.map((option, index) => (
                            <option key={index} value={option.Clusterid}>{option.ClusterName}</option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="City">
                    <Form.Label>עיר:</Form.Label>
                    <Form.Select value={filters.City} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        {filterOptions.City?.map((option, index) => (
                            <option key={index} value={option.CityName}>{option.CityName}</option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="LineID">
                    <Form.Label>קו:</Form.Label>
                    <Form.Select value={filters.LineID} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        {filterOptions.LineID?.map((option, index) => (
                            <option key={index} value={option.LineID}>{option.RouteNumber}</option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="LineType">
                    <Form.Label>סוג קו:</Form.Label>
                    <Form.Select value={filters.LineType} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        {/* 
                        סוג קו:  
                        1 –  עירוני  
                        2 – אזורי  
                        3 – בינעירוני 
                        */}
                        {filterOptions.LineType?.map((option, index) => (
                            <option key={index} value={option.LineType}>{option.LineType}</option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="lineGroup">
                    <Form.Label>קבוצת קווים:</Form.Label>
                    <Form.Select value={filters.linegroup} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        {filterOptions.linegroup?.map((option, index) => (
                            <option key={index} value={option.id}>{option.descrip}</option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="StartDate">
                    <Form.Label>מתאריך:</Form.Label>
                    <Form.Control type="date" value={filters.StartDate} onChange={handleFiltersChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="EndDate">
                    <Form.Label>עד תאריך:</Form.Label>
                    <Form.Control type="date" value={filters.EndDate} onChange={handleFiltersChange} />
                </Form.Group>

                <Col>
                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-4"
                        disabled={Object.values(filters).every(value => value === '')}
                    >
                        סנן
                    </Button>
                </Col>
            </Row>
            <hr />
        </Form>
    );
}

export default Filters;
