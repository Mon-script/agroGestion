import React, { createContext, useState, useEffect } from 'react';

export const MaterialContext = createContext();

export const MaterialProvider = ({children}) => {


    const [siembras, setSiembras] = useState([]);
    const [productos, setProductos] = useState([]);
    const [semillas, setSemillas] = useState([]);
    const [marcasSemillas, setMarcasSemillas] = useState([]);
    const [fertilizantes, setFertilizantes] = useState([]);
    const [marcasFertilizantes, setMarcasFertilizantes] = useState([]);
    const [estados, setEstados] = useState([]);
    const [riegos, setRiegos] = useState([]);
    const [empaques, setEmpaques] = useState([]);
    const[actualizarMateriales, setActualizarMateriales]= useState(false)

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

                const resSiembras = await fetch("http://localhost:3000/siembras/get");
                setSiembras(await resSiembras.json());

                const resEmpaques = await fetch("http://localhost:3000/empaque/get");
                setEmpaques(await resEmpaques.json());


                setSiembraActualizado(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        
    }, [actualizarMateriales])

    return(
        <MaterialContext.Provider value={{siembras, productos,semillas, marcasSemillas,fertilizantes,marcasFertilizantes, estados, riegos, empaques, setActualizarMateriales }}>
            
            {children}
        </MaterialContext.Provider>
    )

}