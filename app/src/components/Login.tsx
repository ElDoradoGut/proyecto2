import { Button, Card, CardBody, Container, Form, Row, Col } from "react-bootstrap";

export const Login = () => {
    return(
        <Container>
            <Card>
                <CardBody>
                    <Card.Title>Bienvenido! Inicia Sesión</Card.Title>
                    <Row>
                        <Col>
                            <Form.Control/>
                            <Form.Control/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Button>Ingresa</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    )
}