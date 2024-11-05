import React, { useState, useEffect } from "react";
import "./Stockpag.css";
import SiembraCard from "../Component/tarjetas/siembraCard";
import { Card, Select, Input, Button, DatePicker, Form } from "antd";

const { Option } = Select;

export const Siembra = () => {
    const [showForm, setShowForm] = useState(false);
    const [siembras, setSiembras] = useState([]);
    const [productos, setProductos] = useState([]);
    const [semillas, setSemillas] = useState([]);
    const [marcasSemillas, setMarcasSemillas] = useState([]);
    const [fertilizantes, setFertilizantes] = useState([]);
    const [marcasFertilizantes, setMarcasFertilizantes] = useState([]);
    const [estados, setEstados] = useState([]);
    const [riegos, setRiegos] = useState([]);
    const [siembraActualizada, setSiembraActualizado] = useState(false);

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
                const resProductos = await fetch("http://localhost:3000/productos/get");
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

                const resSiembras = await fetch("http://localhost:3000/siembras/get");
                setSiembras(await resSiembras.json());

                setSiembraActualizado(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        setSiembraActualizado(false)
    }, [siembraActualizada]);

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const agregarSiembra = async () => {
        try {
            await fetch("http://localhost:3000/post/siembra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            setSiembraActualizado(true);
            setShowForm(false);
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
            console.error("Error submitting data:", error);
        }
        setSiembraActualizado(true)

    };

    return (
        <div className="m-4 flex flex-col items-center pt-4">
            <div className="bg-gray-100 p-4 shadow-md w-full flex justify-between items-center">
                <h2 className="text-3xl font-semibold text-green-700">Registro de Siembra</h2>
                <button
          className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300"
          onClick={() => {
            setShowForm(true)

          }}
          hidden={showForm ? true : false}
        >
          Agregar
        </button>
            </div>

            {showForm && (
                <div className="flex flex-col items-center justify-center w-full mt-8">
                    <Card title="Formulario de Siembra" style={{ width: '100%', maxWidth: '600px' }}>
                        <Form layout="vertical" onFinish={agregarSiembra} className="space-y-6">
                            <Form.Item label="Producto">
                                <Select
                                    value={formData.producto}
                                    onChange={(value) => handleInputChange('producto', value)}
                                    placeholder="Seleccione un producto"
                                >
                                    {productos.map((producto) => (
                                        <Option key={producto.id} value={producto.id}>{producto.nombre}</Option>
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
                                        <Option key={semilla.id} value={semilla.id}>{semilla.nombre}</Option>
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
                                        <Option key={marca.id} value={marca.id}>{marca.nombre}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Cantidad de semillas usadas">
                                <Input type="number" onChange={(value) => handleInputChange('cantidad', value)}
                                    placeholder="Introduzca cantidad de semillas"></Input>

                            </Form.Item>
                            <Form.Item label="Fertilizante">
                                <Select
                                    value={formData.fertilizante}
                                    onChange={(value) => handleInputChange('fertilizante', value)}
                                    placeholder="Seleccione un fertilizante"
                                >
                                    {fertilizantes.map((fertilizante) => (
                                        <Option key={fertilizante.id} value={fertilizante.id}>{fertilizante.nombre}</Option>
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
                                        <Option key={marca.id} value={marca.id}>{marca.nombre}</Option>
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
                                        <Option key={estado.id} value={estado.id}>{estado.nombre}</Option>
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
                                        <Option key={riego.id} value={riego.id}>{riego.nombre}</Option>
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
                                <Input type="number" onChange={(value) => handleInputChange('volumenSiembra', value)}
                                    placeholder="Introduzca el volumen de siembra en mtrso cuadrados"></Input>

                            </Form.Item>
                            <Form.Item label="Estimación de Cosecha">
                                <DatePicker
                                    value={formData.estimacionCosechaFecha}
                                    onChange={(date) => handleInputChange('estimacionCosechaFecha', date)}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Guardar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            )}

            <div className="w-full mt-6 flex flex-wrap gap-4">
                {siembras.length > 0 ? (
                    siembras.map((siembra) => (
                        <SiembraCard key={siembra.id} siembra={siembra} />
                    ))
                ) : (
                    <p>No hay siembras registradas.</p>
                )}
            </div>
        </div>
    );
};

export default Siembra;






/*import "./Stockpag.css";
import SiembraCard from '../Component/tarjetas/siembraCard'
import { useState, useEffect } from "react";


export const Siembra = () => {
    const [showForm, setShowForm] = useState('')
    const [productos, setProductos] = useState([])
    const [semilla, setSemilla] = useState([])
    const [fertilizante, setFertilizante] = useState([])
    const [estado, setEstado] = useState([])
    const [riego, setRiego] = useState([])
    const [stockActializado, setStockActualizado] = useState(false)



    useEffect(() => {


        fetch('http://localhost:3000/productos/get')
            .then(response => response.json())
            .then(response => {
                setProductos(response)
                console.log(response)
            })
            .catch(error => { console.error(error) })




        fetch('http://localhost:3000/productos/get/id')
            .then(response => response.json())
            .then(response => {
                // Transforma el resultado en un array simple de IDs
                const ids = response.map(item => item.id_codigo_barra);
                setProductosid(ids);
                console.log(ids);
            })
            .catch(error => { console.error(error) });

            fetch('http://localhost:3000/tipo_semilla/get')
            .then(response => response.json())
            .then(response => {
                setSemilla(response)
                console.log(response)
            })
            .catch(error => { console.error(error) })

        fetch('http://localhost:3000/fertilizantes/get')
            .then(response => response.json())
            .then(response => {
                setFertilizante(response)
                console.log(response)
            })
            .catch(error => { console.error(error) })

        fetch('http://localhost:3000/estado/get')
            .then(response => response.json())
            .then(response => {
                setEstado(response)
                console.log(response)
            })
            .catch(error => { console.error(error) })

        fetch('http://localhost:3000/riego/get')
            .then(response => response.json())
            .then(response => {
                setRiego(response)
                console.log(response)
            })
            .catch(error => { console.error(error) })


        setStockActualizado(false)

        

    }, [stockActializado])

    



    const agregarSeimbra = () => {
         if (estanteria < 1 && estanteria > numEstantes) {
           alert(`Debes indicar un estante entre 1 y ${numEstantes} `)
           return
         }

           if (!codigoProducto || !estanteria) {
            alert('Todos los campos deben estar completados')
            return
        }
        if (productosid.includes(parseInt(codigoProducto))) {

             const now = new Date(); // trae la fecha y hora actual
             const fecha = now.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
             const hora = now.toTimeString().split(' ')[0]; // Hora en formato HH:MM:SS

            const data = {
                codigo: productos,
                id_tipo_semillafk: parseInt(semilla),
                cantidad: parseInt(cantidad),
                fecha_siembra: fecha_siembra,//eelgir fecha
                volumen_siembra: volumen_siembra,
                id_marca_fertilizantefk: parseInt(fertilizante),
                id_estado: parseInt(estado),
                fecha_estado: fecha_estado,//elegir fecha
                id_riegofk: parseInt(riego),
                fecha_riego: fecha_riengo,//elegir fecha
                estimacion_cosecha_fecha: fecha_cosecha//elegir fecha
            };

            console.log(data)


            fetch('http://localhost:3000/post/siembra', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(data),
             })
                 .then(resp => {
                     if (!resp.ok) {
                         throw new Error(`HTTP error! status: ${resp.status}`);
                     }
                     return resp.text();
                 })
                 .then(respText => console.log(respText))
                 .catch(error => console.error('Error:', error));
             

            setStockActualizado(true)
            setCodigoProducto('');
            setEstanteria('');
            setShowForm(false)
        }




    }

    return <>

        <div className="m-4 flex flex-col items-center pt-4">
            <div className="bg-gray-100 p-4 shadow-md w-full flex justify-between items-center">
                <h2 className="text-3xl font-semibold text-green-700 text">Entrada de Stock!</h2>
                <button
                    className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300"
                    onClick={() => {
                        setShowForm(true)
                        setCodigoProducto('');
                        setEstanteria('');

                    }}
                    hidden={showForm ? true : false}
                >
                    Agregar
                </button>
            </div>
            {showForm && (
                <div className="flex flex-col items-center justify-center w-full mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                        <form className="space-y-6 w-full">

                            <div>
                                <label htmlFor="codigoProducto" className="block text-sm font-medium text-gray-700 mb-1">
                                    Codigo de producto:
                                </label>
                                <input
                                    id="codigoProducto"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 sm:text-sm"
                                    type="number"
                                    required
                                    value={codigoProducto}
                                    onChange={(e) => setCodigoProducto(e.target.value)}

                                />
                            </div>
                            <div>
                                <label htmlFor="estanteria" className="block text-sm font-medium text-gray-700 mb-1">
                                    Estanteria:
                                </label>
                                <input
                                    id="estanteria"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 sm:text-sm"
                                    type="number"
                                    required
                                    value={estanteria}
                                    onChange={(e) => setEstanteria(e.target.value)}

                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
                                    type="button"
                                    onClick={agregarSeimbra}

                                >
                                    Agregar
                                </button>
                                <button
                                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400 transition duration-300"
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                >
                                    Salir
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    </>
};*/ 