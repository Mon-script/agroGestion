import { useState } from "react"
import "./Formulario.css"
import CampoTexto from "../listas/CampoTexto"
import ListaPeso from "../listas/ListaPeso"
import ListaCalidad from "../listas/ListaCalidad"
import EscanerComponente from "../codigodebarra/EscanerCodigo"
import {AiFillCloseCircle} from "react-icons/ai"
import { useNavigate } from "react-router-dom"



const Formularios = (props) => {
    const [NombreProducto, actualizarNombreProducto] = useState("")
    const [foto, actualizarFoto] = useState("")
    const [descripcion, actualizarDescripcion] = useState("")
    const [Calidad, actualizarCalidad] = useState("")
    const [Peso, ActualizarPeso] = useState("")

    const navegador = useNavigate()

    const { registrarColaborador, cerrarFormulario  } = props

    const manejarEnvio = (e) => {
        e.preventDefault()
        let datosAEnviar = {
            NombreProducto,
            foto,
            Calidad,
            descripcion,
            Peso
        }
        registrarColaborador(datosAEnviar)
    }

    

    return  <section className="formulario">
        <div className="ubicacion">
        <form onSubmit={manejarEnvio}>
        <button onClick={navegador("/producto")}><AiFillCloseCircle className="eliminar" /></button>
            <h2>Producto</h2>
            <div className="Camp">
            <CampoTexto
                titulo="Nombre Producto"
                placeholder="Ingresar Nombre Producto"
                required
                valor={NombreProducto}
                actualizarValor={actualizarNombreProducto}
            />
            <CampoTexto
                titulo="Foto"
                placeholder="Ingresar enlace de foto"
                required
                valor={foto}
                actualizarValor={actualizarFoto}
            />
            <CampoTexto
                titulo="Descripcion"
                placeholder="Ingresar descripcion breve"
                required
                valor={descripcion}
                actualizarValor={actualizarDescripcion}
            />
            <ListaCalidad
                titulo="Calidad"
                selecOption = {Calidad}
                
            />
            <ListaPeso
                 titulo="Peso"
            />
            </div>
           <div><EscanerComponente Texto = "Crear"></EscanerComponente></div>
        </form>
        </div>
    </section>
}

export default Formularios