import { useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, Container, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { IEvent, ITeams } from "../Types";



export const CreateTeam = () => {
    const emptyGrade = {
        id_metric:"",
        grade:0,
        id_judge:""
    }
    const emptyGrades = {
        id_group: "",
        round: 0,
        id_event: "",
        grades: [emptyGrade]
    }
    const [data, setData] = useState<ITeams>({
        name: "",
        memberID: [""],
        leaderID: "",
        round: 0,
        grades: [emptyGrades]
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
            await axios.post("http://localhost:4000/user/registerUser", data);
            Swal.fire("Datos guardados con exito", "", "success");
        } catch (error: any) {
            Swal.fire("Algo salio mal ", error.response.data.message, "error");
        }

    }

    return (
        <Container>
            <Card style={{ width: "30rem", margin: "auto" }}
                className="mt-3">
                <CardBody>
                    <Card.Title className="text-center">Registro de participantes</Card.Title>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control className="mb-3" name="name" onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control className="mb-3" name="mail" onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CURP:</Form.Label>
                            <Form.Control className="mb-3" name="curp" onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control className="mb-3" name="password" onChange={onChange} />
                        </Form.Group>
                        <Button className="m-3" onClick={() => onSubmit()}>Ingresar</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}