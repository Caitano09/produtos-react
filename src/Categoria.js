import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Api from './Api'

const Categoria = (props) =>{
    
    const [produtos, setProdutos] = useState([])
    const [categoria, setCategoria] = useState({})

    useEffect(()=>{
        const id = props.match.params.catId

        loadProdutos(id)
        Api.readCategoria(id).then(res=>{
                setCategoria(res.data)
            })

    }, [props.match.params.catId])

    const loadProdutos = (categoriaId) =>{
        Api.loadProdutos(categoriaId).then(res =>{  
            setProdutos(res.data)
        })
      } 

    const removeProduto = (produto) =>{
        Api.deleteProduto(produto.id)
        .then(res=> loadProdutos(categoria.id))        
    }

    const renderProduto = (produto) =>{
        return(
            <div key={produto.id} className="card card-body bg-light mb-2">
            <p >
                {produto.produto}
                <button onClick={()=>removeProduto(produto)} className="btn btn-outline-danger ml-2">
                    <span className="fa fa-trash"></span>
                </button>
                <Link className="btn btn-outline-warning ml-1" to={'/produtos/editar/'+produto.id}>
                <span className="fa fa-pencil"></span>
                </Link>
                    
            </p>
            </div>
        )
    }    

    return(
        <div>
             <h1>{categoria.categoria}</h1>
            {produtos.length === 0 && 
                <p className="alert alert-danger">Nenhum Produto</p>
            }
            {produtos.map(renderProduto)}
        </div>
    )
}

export default Categoria