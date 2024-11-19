import React, { useState, useContext } from "react";
import { Card, Select, Input, Button, DatePicker, Form, message } from "antd";
import { MaterialContext } from "../../../materialContext";

const { Option } = Select;

export const CosechaModalForm = ({siembra, actualizarSiembra,cerrarModal}) => {
    const {empaques} = useContext(MaterialContext);

    const {
        id_siembra,
        id_codigo_barrafk,
        cantidad
      } = siembra;
      console.log(cantidad)

    const [formData, setFormData] = useState({
        id_siembra: "",
        producto: "",
        rendimientoCosecha: "",
        cantidadCosecha: "",
        empaque: "",
        fechaCosecha: null,
    });
    

    // Calcula el rendimiento de cosecha en porcentaje
    const calcularRendimiento = (cantidadCosechada) => {
        if (cantidad > 0) {
            const rendimiento = (cantidadCosechada / cantidad) * 100;
            return rendimiento.toFixed(2); // Redondea a 2 decimales
        }
        return 0;
    };

    // Función para formatear la fecha
    const formatDate = (date) => {
        if (!date) return null; // Retorna null si la fecha es nula
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Agrega cero si es necesario
        const day = String(d.getDate()).padStart(2, '0'); // Agrega cero si es necesario
        return `${year}-${month}-${day}`;
    };

    const handleInputChange = (name, value) => {
        setFormData((prevData) => {
            // Si la cantidad de cosecha cambia, actualiza el rendimiento
            if (name === "cantidadCosecha") {
                const rendimiento = calcularRendimiento(value);
                return {
                    ...prevData,
                    [name]: value,
                    rendimientoCosecha: rendimiento,
                     // Actualiza el rendimiento calculado
                };
            }
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const manejarCosecha = async () => {
        try {
            // Formatea las fechas antes de enviarlas
            const formattedData = {
                ...formData,
                fechaCosecha: formatDate(formData.fechaCosecha),
                id_siembra: id_siembra,
                producto: id_codigo_barrafk,
            };

            console.log(formattedData)

            const response = await fetch("http://localhost:3000/post/cosecha/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            if (response.ok){
                message.success("Operacion exitosa")
            }

            const responseData = await response.text();
            

            setFormData({
                producto: "",
                rendimientoCosecha: "",
                cantidadCosecha: "",
                empaque: "",
                fechaCosecha: null,
            });
            actualizarSiembra(true)
            cerrarModal()
        } catch (error) {
            console.error("Error al enviar datos:", error);
            message.danger(`Algo salio mal`)
        }
    };

    return (
        <div className="m-4 flex flex-col items-center pt-4">
           <div className="flex flex-col items-center justify-center w-full mt-8">
                <Card title="Datos para cosecha" style={{ width: '100%', maxWidth: '600px' }}>
                    <Form layout="vertical" onFinish={manejarCosecha} className="space-y-6">
                       

                        <Form.Item label="Cantidad Cosechada">
                            <Input
                                type="number"
                                value={formData.cantidadCosecha}
                                onChange={(e) => handleInputChange('cantidadCosecha', e.target.value)}
                                placeholder="Introduzca cantidad cosechada"
                            />
                        </Form.Item>

                        <Form.Item label="Rendimiento de la Cosecha (%)">
                            <Input
                                value={formData.rendimientoCosecha}
                                readOnly
                                placeholder="El rendimiento se calculará automáticamente"
                            />
                        </Form.Item>

                        <Form.Item label="Empaque">
                            <Select
                                value={formData.empaque}
                                onChange={(value) => handleInputChange('empaque', value)}
                                placeholder="Seleccione un empaque"
                            >
                                {empaques.map((empaque) => (
                                    <Option key={empaque.id_empaque} value={empaque.id_empaque}>{empaque.nombre_empaque}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Fecha de Cosecha">
                            <DatePicker
                                value={formData.fechaCosecha}
                                onChange={(date) => handleInputChange('fechaCosecha', date)}
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
                                setFormData({
                                    producto: "",
                                    rendimientoCosecha: "",
                                    cantidadCosecha: "",
                                    empaque: "",
                                    fechaCosecha: null,
                                });
                                cerrarModal()
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


