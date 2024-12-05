import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { IEvent } from '../Types';

export const CreateEvent = () => {
    const emptyMetric = {
        description: "",
        maxpoints: 0
    }
    const [event, setEvent] = useState<IEvent>({
        name: "",
        maxrounds: 0,
        round: 1,
        state: "pending",
        metrics: [emptyMetric]
    })
    const onChangeBasicFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data: any = event;
        data[e.target.name] = e.target.value;
        setEvent({ ...data });

    }
    const onChangeMetric = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        e.preventDefault();
        const data: any = event;
        data.metrics[i][e.target.name] = e.target.value;
        setEvent({ ...data });
    }
    const addMetric = () => {
        const data = event;
        data.metrics.push(emptyMetric);
        setEvent({ ...data });
    }
    const removeMetric = (iM: number) => {
        const data = event;
        const metricFiltered = data.metrics.filter((_, i) => i != iM);
        data.metrics = metricFiltered;
        setEvent({ ...data });
    }
    const onSubmit = async () => {
        try {
            Swal.fire("Guardando datos...");
            Swal.showLoading();
            await axios.post("http://localhost:4000/event/createEvent", event);
            Swal.fire("Evento registrado con exito", "", "success");
        } catch (e) {
            console.log(e);
            Swal.fire("Ocurrio un error", "", "error");
        }
    }
    return (
        <Container>
            <Card className='m-3'>
                <Card.Body>
                    <Card.Title>Crear evento</Card.Title>
                    <Form>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Titulo del evento</Form.Label>
                                    <Form.Control onChange={onChangeBasicFields} name="name" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Numero de rondas</Form.Label>
                                    <Form.Control onChange={onChangeBasicFields} name="maxrounds" type='number' />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className='text-center'>
                                <Form.Label>Metricas:</Form.Label>
                                {
                                    event.metrics.map((metrics, i) => (
                                        <Row className='mb-3'>
                                            <Col>
                                                <Form.Label>Descripción:</Form.Label>
                                                <Form.Control onChange={(e: any) => onChangeMetric(e, i)} name="description" />
                                            </Col>
                                            <Col>
                                                <Form.Label>Calificación maxima:</Form.Label>
                                                <Form.Control onChange={(e: any) => onChangeMetric(e, i)} type='number' name="maxpoints" />
                                            </Col>
                                            <Col>
                                                <Button variant='danger' onClick={() => removeMetric(i)}>Quitar metrica</Button>
                                            </Col>
                                        </Row>
                                    ))
                                }
                                <div className='text-center'>
                                    <Button variant='info' onClick={() => addMetric()}>Agregar metrica</Button>
                                </div>
                            </Form.Group>
                        </Row>
                        <hr></hr>
                        <div className='text-center'>
                            <Button onClick={() => onSubmit()}>Guardar evento</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}