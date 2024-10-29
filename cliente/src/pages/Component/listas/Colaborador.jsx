import "./Colaborador.css"
import {AiFillCloseCircle, AiFillHeart, AiOutlineHeart,} from "react-icons/ai"
import {WechatOutlined} from "@ant-design/icons"
import {  useNavigate } from "react-router-dom"
import Viewer from "../vista/vista"

const Colaborador = (props) => {
    const { nombre, descripcion, foto, equipo ,id , fav} = props.datos
    const { colorPrimario, eliminarColaborador, like } = props
    const navegador=useNavigate()
    return (
    <div className="colaborador">
        <AiFillCloseCircle className="eliminar" onClick={() => eliminarColaborador(id)} />
        <div className="encabezado" style={{ backgroundColor: colorPrimario }}>
            <img src={foto} alt={nombre} />
        </div>
        <div className="info">
            <h4>{nombre}</h4>
            <h5>{equipo}</h5>
            <p>"{descripcion}"</p>
            {fav ? <AiFillHeart color="red" onClick={() => like(id)}/> :<AiOutlineHeart onClick={() => like(id)} />}
            <div style={{marginTop:"5px", marginLeft:"175px"}}>
            <Viewer/>
            </div>
            
        </div>
    </div>
    );
}

export default Colaborador