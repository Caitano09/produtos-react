import React, {useEffect, useState} from 'react'
import {Route, Link} from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import ProdutosNovo from './ProdutosNovo'
import ProdutosEditar from './ProdutosEditar'
import Api from './Api'

const Produtos = (props) =>{

    const [categorias, setCategorias] = useState([])
    const [editingCategoria, setEditingCategoria] = useState('')

    useEffect(()=>{
        loadCategorias()
    },[]);
    
    const loadCategorias = () =>{
        Api.loadCategorias()
        .then(res =>{  
            setCategorias(res.data)
        })
      } 

    const handleNewCategoria = (key) =>{
        if(key.keyCode === 13){
            const categoria = key.target.value
            Api.createCategoria(categoria)
            .then(res=> {
                loadCategorias()
                key.target.value = ''
            })
        }
    }

    const handleEditCategoria = (key) =>{
        if(key.keyCode === 13){
            const id = editingCategoria 
            const categoria = key.target.value
            Api.editCategoria(id, categoria)
            .then(res=> {
                loadCategorias()
                setEditingCategoria('')
            })
        }
    }

    const removeCategoria = (categoria) =>{        
        Api.deleteCategoria(categoria.id)
        .then(res=> loadCategorias())        
    }

    const editCategoria = (categoria) =>{
        setEditingCategoria(categoria.id)
    }

    const cancelEditing = () =>{
        setEditingCategoria('')        
    }

    const renderCategoria = (categoria) =>{
        return(
            <li key={categoria.id}>

                {editingCategoria === categoria.id && 
                    <div className="input-group">
                        <div className="input-group-btn">
                            <input onKeyUp={handleEditCategoria} className="form-control" type="text" defaultValue={categoria.categoria}/>
                            <button className="btn btn-outline-secondary" onClick={cancelEditing}>
                                <span class="fa fa-remove"></span> 
                            </button>
                        </div>
                        
                    </div>}
                {editingCategoria !== categoria.id && 
                    <div>
                        <button className="btn btn-outline-danger" onClick={()=> removeCategoria(categoria) }>
                            <span class="fa fa-trash"></span>    
                        </button>
                        <button className="btn btn-outline-warning" onClick={()=> editCategoria(categoria) }>
                            <span class="fa fa-pencil"></span>    
                        </button>

                        <Link to={`/produtos/categoria/${categoria.id}`}>{categoria.categoria}</Link>
                    </div>}
                
            </li>
        )
    }


    return(
        <div className='row'> 
            <div className='col-md-3'> 
                <h3>Categorias</h3>
                <ul style={{listStyle: 'none', padding: '0'}}>
                    {categorias.map(renderCategoria)}            
                </ul>  
                <div className="card-header">
                    <input className="form-control" type="text" placeholder="Nova Categoria" onKeyUp={handleNewCategoria}/>
                </div> 
                <Link to='/produtos/novo'>Novo Produto</Link> 
            </div>

            <div className='col-md-9'> 
                <h1>Produtos</h1>
                <Route exact path={props.match.url} component={ProdutosHome}/>
                <Route exact path={props.match.url+'/novo'} component={(props)=> <ProdutosNovo {...props} categorias={categorias}/> }/>
                <Route exact path={props.match.url+'/categoria/:catId'} component={Categoria} />  
                <Route exact path={props.match.url+'/editar/:id'} component={(props)=> <ProdutosEditar categorias={categorias} {...props} /> } />              
            </div>
        </div>
    )
}

export default Produtos