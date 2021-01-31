import React, { useRef, useEffect, useState } from "react"
import {Redirect} from 'react-router-dom'
import Api from "./Api"


const ProdutosEditar = (props) =>{

    const [produto, setProduto] = useState({})
    const refCategoria = useRef(null)
    const refProduto = useRef(null)
    const [redirect, setRedirect] = useState('')

    useEffect(()=>{
        const id = props.match.params.id        
        Api.readProduto(id).then(res =>{
            setProduto(res.data)
            refCategoria.current.value = res.data.categoriaId//tag "<select>" marcar valor
        })

    },[])

    const handleEditProduto = () =>{
        const produto = {
            id: props.match.params.id,
            produto: refProduto.current.value,
            categoriaId: refCategoria.current.value
        }
        Api.editProduto(produto)
        .then(res=> {
            setRedirect('/produtos/categoria/'+res.data.categoriaId)
            /*Com a "/" na fente pega o dominio desde a raiz.
              Sem a "/" na frente concatena com o caminha de url atual */
                 
        })    
    }

    if(redirect !== ''){
        return <Redirect to={redirect}/>
    }

    return(
        <div>
            <h2>editar Produto</h2>
            {<select ref={refCategoria}>
                {props.categorias.map((categoria) =>
                    <option key={categoria.id} value={categoria.id}>{categoria.categoria} </option>
                )}
             </select>}
            <input defaultValue={produto.produto} ref={refProduto} type="text" className="form-control" placeholder="nome do produto"/>
            <button onClick={handleEditProduto} className="btn btn-outline-success">
                <span class="fa fa-save"></span>
            </button>
        </div>       
        
    )
}

export default ProdutosEditar