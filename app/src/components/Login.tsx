import { Button, Card, CardBody, Container, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const onChange = (e: any) => {
        e.preventDefault();
        const tempData: any = data;
        tempData[e.target.name] = e.target.value;
        setData(tempData);
    }

    const onSubmit = async () => {
        try {
            Swal.fire("Guardando Datos");
            Swal.showLoading();
            await axios.post("http://localhost:4000/user/login", data);
            Swal.fire("Datos guardados con exito", "", "success");
        } catch (error: any) {
            console.log(error)
            Swal.fire("Algo salio mal ", error.response.data.message, "error");
        }

    }

    return (
        <Container>
            <Card style={{ width: "30rem", margin: "auto" }}
                className="mt-3">
                <CardBody>
                    <Card.Title className="text-center">Bienvenido! Inicia Sesión</Card.Title>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Correo:</Form.Label>
                                <Form.Control className="mb-3" name="mail" onChange={onChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control className="mb-3" name="password" onChange={onChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <Button className="m-3" onClick={() => onSubmit()}>Ingresar</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            ¿Perdiste tu Contraseña? Recuperala <a>aquí.</a>
                        </Col>
                        <Col>
                            ¿Todavia no tienes cuenta? Crea una <a>aquí.</a>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    )
}