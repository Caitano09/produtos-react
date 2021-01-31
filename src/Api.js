import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001'
})

const apis = {
    readCategoria: (id) => api.get('/categorias/'+id),
    loadCategorias: ()=> api.get('/categorias'),
    deleteCategoria: (id)=> api.delete('/categorias/'+id),
    createCategoria: (categoria) => api.post('/categorias', {categoria}),
    editCategoria: (id, categoria) => api.put('/categorias/'+id, {id,categoria}),

    readProduto: (id) => api.get('/produtos/'+id),
    loadProdutos: (categoriaId) => api.get('/produtos?categoriaId='+categoriaId),
    deleteProduto: (id) => api.delete('/produtos/'+id),
    createProduto: (produto) => api.post('/produtos', produto),//params mandados como objeto não usa "{}"
    editProduto: (produto) => api.put('/produtos/'+produto.id, produto)
   
}

export default apis