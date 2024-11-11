import React, { useState, useEffect } from "react";
import "../../domain/Stockpag.css";
import { Card, Select, Input, Button, DatePicker, Form } from "antd";

const { Option } = Select;

export const SiembraDrawerForm = ({ editar }) => {
    const [productos, setProductos] = useState([]);
    const [semillas, setSemillas] = useState([]);
    const [marcasSemillas, setMarcasSemillas] = useState([]);
    const [fertilizantes, setFertilizantes] = useState([]);
    const [marcasFertilizantes, setMarcasFertilizantes] = useState([]);
    const [estados, setEstados] = useState([]);
    const [riegos, setRiegos] = useState([]);

    const [formData, setFormData] = useState({
        producto: "",
        tipoSemilla: "",
        marcaSemilla: "",
        cantidad: "",
        fertilizante: "",
        marcaFertilizante: "",
        estado: "",
        riego: "",
        fechaSiembra: null,
        fechaEstado: null,
        fechaRiego: null,
        volumenSiembra: "",
        estimacionCosechaFecha: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resProductos = await fetch("http://localhost:3000/productos/get/select");
                setProductos(await resProductos.json());

                const resSemillas = await fetch("http://localhost:3000/tipo_semilla/get");
                setSemillas(await resSemillas.json());

                const resMarcasSemillas = await fetch("http://localhost:3000/marca_semilla/get");
                setMarcasSemillas(await resMarcasSemillas.json());

                const resFertilizantes = await fetch("http://localhost:3000/fertilizantes/get");
                setFertilizantes(await resFertilizantes.json());

                const resMarcasFertilizantes = await fetch("http://localhost:3000/marca_fertilizante/get");
                setMarcasFertilizantes(await resMarcasFertilizantes.json());

                const resEstados = await fetch("http://localhost:3000/estado/get");
                setEstados(await resEstados.json());

                const resRiegos = await fetch("http://localhost:3000/riego/get");
                setRiegos(await resRiegos.json());

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, []);

    const formatDate = (date) => {
        if (!date) return null;  // Retorna null si la fecha es nula
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Agrega cero si es necesario
        const day = String(d.getDate()).padStart(2, '0'); // Agrega cero si es necesario
        return `${year}-${month}-${day}`;
    };


    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const editarSiembra = async () => {
        try {
            // Formatea las fechas en el formato 'YYYY-MM-DD'
            console.log(formData)
            const formattedData = {
                ...formData,
                fechaSiembra: formatDate(formData.fechaSiembra),
                fechaEstado: formatDate(formData.fechaEstado),
                fechaRiego: formatDate(formData.fechaRiego),
                estimacionCosechaFecha: formatDate(formData.estimacionCosechaFecha),
            };

            const response = await fetch("http://localhost:3000/post/siembra/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            })

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            const responseData = await response.text();
            alert("Respuesta del servidor:", responseData);


            setFormData({
                producto: "",
                tipoSemilla: "",
                marcaSemilla: "",
                cantidad: "",
                fertilizante: "",
                marcaFertilizante: "",
                estado: "",
                riego: "",
                fechaSiembra: null,
                fechaEstado: null,
                fechaRiego: null,
                volumenSiembra: "",
                estimacionCosechaFecha: null,
            });
        } catch (error) {
            console.error("Error al enviar datos:", error);
        }

        editar(false)
    };


    return (
        <div className="m-4 flex flex-col items-center pt-4">
            <h2 className="text-3xl font-semibold text-white-600 text-center mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(20, 90, 20, 0.6)' }}>
            Edicion de Siembra
            </h2>

            <div className="flex flex-col items-center justify-center w-full mt-8">
                <Card title="Formulario de Siembra" style={{ width: '100%', maxWidth: '600px' }}>
                    <Form layout="vertical" onFinish={editarSiembra} className="space-y-6">
                        <Form.Item label="Producto">
                            <Select
                                value={formData.producto}
                                onChange={(value) => handleInputChange('producto', value)}
                                placeholder="Seleccione un producto"

                            >
                                {productos.map((producto) => (
                                    <Option key={producto.id_codigo_barra} value={producto.id_codigo_barra}>{producto.nombre}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Tipo de Semilla">
                            <Select
                                value={formData.tipoSemilla}
                                onChange={(value) => handleInputChange('tipoSemilla', value)}
                                placeholder="Seleccione un tipo de semilla"
                            >
                                {semillas.map((semilla) => (
                                    <Option key={semilla.id_tipo_semilla} value={semilla.id_tipo_semilla}>{semilla.nombre_semilla}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Marca de Semilla">
                            <Select
                                value={formData.marcaSemilla}
                                onChange={(value) => handleInputChange('marcaSemilla', value)}
                                placeholder="Seleccione una marca de semilla"
                            >
                                {marcasSemillas.map((marca) => (
                                    <Option key={marca.id_marca_semilla} value={marca.id_marca_semilla}>{marca.nombre_marca}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Cantidad de semillas usadas">
                            <Input
                                type="number"
                                value={formData.cantidad}
                                onChange={(e) => handleInputChange('cantidad', e.target.value)}
                                placeholder="Introduzca cantidad de semillas"
                            />


                        </Form.Item>
                        <Form.Item label="Fertilizante">
                            <Select
                                value={formData.fertilizante}
                                onChange={(value) => handleInputChange('fertilizante', value)}
                                placeholder="Seleccione un fertilizante"
                            >
                                {fertilizantes.map((fertilizante) => (
                                    <Option key={fertilizante.id_fertilizante} value={fertilizante.id_fertilizante}>{fertilizante.nombre_fertilizante}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Marca de Fertilizante">
                            <Select
                                value={formData.marcaFertilizante}
                                onChange={(value) => handleInputChange('marcaFertilizante', value)}
                                placeholder="Seleccione una marca de fertilizante"
                            >
                                {marcasFertilizantes.map((marca) => (
                                    <Option key={marca.id_marca_fertilizante} value={marca.id_marca_fertilizante}>{marca.nombre_marca}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Estado">
                            <Select
                                value={formData.estado}
                                onChange={(value) => handleInputChange('estado', value)}
                                placeholder="Seleccione un estado"
                            >
                                {estados.map((estado) => (
                                    <Option key={estado.id_estado} value={estado.id_estado}>{estado.nombre_estado}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Riego">
                            <Select
                                value={formData.riego}
                                onChange={(value) => handleInputChange('riego', value)}
                                placeholder="Seleccione un riego"
                            >
                                {riegos.map((riego) => (
                                    <Option key={riego.id_riego} value={riego.id_riego}>{riego.nombre_riego}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Fecha de Siembra">
                            <DatePicker
                                value={formData.fechaSiembra}
                                onChange={(date) => handleInputChange('fechaSiembra', date)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item label="Fecha de Estado">
                            <DatePicker
                                value={formData.fechaEstado}
                                onChange={(date) => handleInputChange('fechaEstado', date)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item label="Fecha de Riego">
                            <DatePicker
                                value={formData.fechaRiego}
                                onChange={(date) => handleInputChange('fechaRiego', date)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item label="Volumen de siembra en metros cuadrados">
                            <Input type="number" value={formData.volumenSiembra} onChange={(e) => handleInputChange('volumenSiembra', e.target.value)}
                                placeholder="Introduzca el volumen de siembra en metros cuadrados"></Input>

                        </Form.Item>
                        <Form.Item label="Estimación de Cosecha">
                            <DatePicker
                                value={formData.estimacionCosechaFecha}
                                onChange={(date) => handleInputChange('estimacionCosechaFecha', date)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button ghost type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Guardar
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button danger type="primary" onClick={() => {
                                editar(false);
                                setFormData({
                                    producto: "",
                                    tipoSemilla: "",
                                    marcaSemilla: "",
                                    cantidad: "",
                                    fertilizante: "",
                                    marcaFertilizante: "",
                                    estado: "",
                                    riego: "",
                                    fechaSiembra: null,
                                    fechaEstado: null,
                                    fechaRiego: null,
                                    volumenSiembra: "",
                                    estimacionCosechaFecha: null,
                                });
                            }} style={{ width: '100%' }}>
                                Cancelar
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>


        </div>
    );
};