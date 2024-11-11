import React,{useState, useContext} from "react";
import { Card, Select, Input, Button, DatePicker, Form } from "antd";
import { MaterialContext } from "../../../materialContext";



const { Option } = Select;

export const  CosechaModalForm = ({siembraId}) =>{

    const {productos, empaques} = useContext(MaterialContext);
    console.log(productos,empaques)

    const [formData, setFormData] = useState({
        id_siembra: siembraId,
        producto: "",
        rendimientoCosecha: "",
        cantidadCosecha: "",
        empaque: "",
        fechaCosecha: null,
        
    });

    

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

    
    const manejarCosecha = async () => {
        try {
            // Formatea las fechas en el formato 'YYYY-MM-DD'
            console.log(formData)
            const formattedData = {
                ...formData,
                fechaCosecha: formatDate(formData.fechaSiembra),
                
            };
    
            const response = await fetch("http://localhost:3000/post/cosecha/save", {
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
                rendimientoCosecha: "",
                cantidadCosecha: "",
                empaque: "",
                fechaCosecha: "",
            });
        } catch (error) {
            console.error("Error al enviar datos:", error);
        }
    
        
    };
    return (
        <div className="m-4 flex flex-col items-center pt-4">
            <h2 className="text-3xl font-semibold text-white-600 text-center mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(20, 90, 20, 0.6)' }}>
            Edicion de Siembra
            </h2>

            <div className="flex flex-col items-center justify-center w-full mt-8">
                <Card title="Datos para cosecha" style={{ width: '100%', maxWidth: '600px' }}>
                    <Form layout="vertical" onFinish={manejarCosecha} className="space-y-6">
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
                        
                        
                        <Form.Item label="Cantidad Cosechada">
                            <Input
                                type="number"
                                value={formData.cantidadCosecha}
                                onChange={(e) => handleInputChange('cantidadCosecha', e.target.value)}
                                placeholder="Introduzca cantidad de semillas"
                            />


                        </Form.Item>
                        <Form.Item label="Empaque">
                            <Select
                                value={formData.empaque}
                                onChange={(value) => handleInputChange('empaque', value)}
                                placeholder="Seleccione un producto"

                            >
                                {empaques.map((producto) => (
                                    <Option key={producto.id_codigo_barra} value={producto.id_codigo_barra}>{producto.nombre_empaque}</Option>
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
                            }} style={{ width: '100%' }}>
                                Cancelar
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>


        </div>
    );

}

