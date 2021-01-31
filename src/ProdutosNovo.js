import Api from './Api'
import React, {useRef, useState} from 'react'
import {Redirect} from 'react-router-dom'
const ProdutosNovo = (props) =>{

    const refCategoria = useRef(null)
    const refProduto = useRef(null)
    const [redirect, setRedirect] = useState('')

    const handleNewProduto = () =>{    
        const produto = {
            produto: refProduto.current.value,
            categoriaId: refCategoria.current.value
        }
        Api.createProduto(produto)
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
            <h2>Novo Produto</h2>
            <select ref={refCategoria}>
                {props.categorias.map((categoria) =>
                    <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
                )}
            </select>
            <input ref={refProduto} type="text" className="form-control" placeholder="nome do novo produto"/>
            <button onClick={handleNewProduto} className="btn btn-outline-success">
                <span class="fa fa-save"></span>
            </button>
        </div>
        
    )
}

export default ProdutosNovo