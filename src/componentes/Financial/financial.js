import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
const Financial = () => {
    const navigate = useNavigate ();
    const [dados, setDados] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [importancia, setImportancia] = useState('');
    const nomeUsuario = localStorage.getItem('name');
    
    const [filtroImportancia, setFiltroImportancia] = useState('');
    const [filtroValorMin, setFiltroValorMin] = useState('');
    const [filtroValorMax, setFiltroValorMax] = useState('');
    
    const handleImportanciaChange = (e) => {
        setFiltroImportancia(e.target.value);
    };

    const handleValorMinChange = (e) => {
        setFiltroValorMin(e.target.value);
    };

    const handleValorMaxChange = (e) => {
        setFiltroValorMax(e.target.value);
    };

    const filteredDados = dados.filter(item => {
        // Aplicar filtros de importância e valor
        const importanciaMatch = filtroImportancia === '' || item.importancia === filtroImportancia;
        const valorMinMatch = filtroValorMin === '' || parseFloat(item.valor) >= parseFloat(filtroValorMin);
        const valorMaxMatch = filtroValorMax === '' || parseFloat(item.valor) <= parseFloat(filtroValorMax);
        return importanciaMatch && valorMinMatch && valorMaxMatch;
    });

    useEffect(() => {
        //Checando se o usuário está logado para entrar na página
        if(!localStorage.getItem('token')){
            
            navigate('/login');
            
        }
        const buscaFinancas= async () =>{
            const token = localStorage.getItem('token');
            if (token) {
                try{
                    const financas = await fetch(`http://localhost:8080/financials/${nomeUsuario}`)
                    const dados = await financas.json();
                    console.log(dados)
                    setDados(dados);
                }         
                catch (error) {
                    console.error(error, "Erro ao buscar dados");
                }
            }
        }
        buscaFinancas();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Usuário não autenticado');
            return;
        }

        const novoDado = { descricao, valor, importancia, nomeUsuario };

        fetch('http://localhost:8080/financials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoDado)
        })
        .then(response => response.json())
        .then(data => {
            setDados([...dados, data]);
            setDescricao('');
            setValor('');
            setImportancia('Alto');
        })
        .catch(error => console.error('Erro ao adicionar dado:', error));
        navigate(0);
    };
    const handleDelete = (descricao, importancia, valor, nomeUsuario) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Usuário não autenticado');
            return;
        }
        const dadosToDelete = {
            descricao: descricao,
            importancia: importancia,
            valor: valor,
            nomeUsuario: nomeUsuario
        };
        fetch(`http://localhost:8080/financials`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosToDelete)
        })
        .then(response => {
            if (response.ok) {
                alert("Dados excluidos com sucesso");
            } else {
                console.error('Erro ao excluir dado');
            }
        })
        .catch(error => console.error('Erro ao excluir dado:', error));
        
        navigate(0);
    };
    const handleUpdate = (descricaoAntiga, importanciaAntiga, valorAntiga) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Usuário não autenticado');
            return;
        }
    
        const target = { descricao: descricaoAntiga, importancia: importanciaAntiga, valor: valorAntiga, nomeUsuario: nomeUsuario };
        let newData = {};
        if (descricao) newData.descricao = descricao;
        if (importancia) newData.importancia = importancia;
        if (valor) newData.valor = valor;
    
        fetch('http://localhost:8080/financials', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target, newData })
        })
        .then(response => {
            if (response.ok) {
                alert('Dados atualizado com sucesso');
                // Atualizar o estado com os dados atualizados
                setDados(dados.map(dado => {
                    if (dado.descricao === descricaoAntiga && dado.importancia === importanciaAntiga && dado.valor === valorAntiga) {
                        return { ...dado, ...newData };
                    }
                    return dado;
                }));
            } else {
                console.error('Erro ao atualizar dado');
            }
        })
        .catch(error => console.error('Erro ao atualizar dado:', error));
    };
    const calculaTotal = dadosFiltrados => {
        const valorTotal = dadosFiltrados.reduce((acc, curr) => acc + parseFloat(curr.valor), 0).toFixed(2);
        localStorage.setItem('valorTotal', valorTotal);
        return valorTotal;

    }
    return (
        <div>
            <h2>Finanças</h2>

            
                <label style={{marginRight:'10px'}}>Filtrar por Nível de Importância:</label>
                <select value={filtroImportancia} onChange={handleImportanciaChange} style={{marginRight:'10px'}}>
                    <option value="">Todos</option>
                    <option value="Alto">Alto</option>
                    <option value="Médio">Médio</option>
                    <option value="Baixo">Baixo</option>
                </select>
            

           
                <label style={{marginRight:'10px'}}>Filtrar por Valor Mínimo:</label>
                <input type="number" value={filtroValorMin} onChange={handleValorMinChange} style={{marginRight:'10px'}}/>
            
            
            
                <label style={{marginRight:'10px'}}>Filtrar por Valor Máximo:</label>
                <input type="number" value={filtroValorMax} onChange={handleValorMaxChange} style={{marginRight:'10px'}}/>
            
                <p>*** Para atualizar os dados, por favor escreva nos dados que quer alterar e clique em atualizar na linha que deseja atualizar ***</p>
            <table style={{ width: '50%', borderCollapse: 'collapse', margin: '30px auto' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#d2d2d2' }}>Descrição</th>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#d2d2d2' }}>Valor</th>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#d2d2d2' }}>Nível de Importância</th>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#f2f2f2' }}>Excluir</th>
                        <th style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#f2f2f2' }}>Atualizar</th>
                    </tr>
                </thead>
                
                <tbody>
                    {filteredDados.map((item, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>{item.descricao}</td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>{item.valor}</td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>{item.importancia}</td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>
                                <button onClick={() => handleDelete(item.descricao, item.importancia, item.valor, item.nomeUsuario)}>Excluir</button>
                            </td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>
                                <button onClick={() => handleUpdate(item.descricao, item.importancia, item.valor, item.nomeUsuario)}>Atualizar</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right' }} colSpan="2">
                            Total: {calculaTotal(filteredDados)}
                        </td>
                    </tr>
                </tbody>

            </table>
            
            <form onSubmit={handleSubmit}>
                <div style ={{margin: '10px 0'}}>
                    <label style={{marginRight:'10px'}}>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div style ={{margin: '10px 0'}}>
                    <label style={{marginRight:'10px'}}>Valor: </label>
                    <input
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                    />
                </div>
                <div style ={{margin: '10px 0'}}>
                    <label style={{marginRight:'10px'}}>Nível de Importância:</label>
                    <select
                        value={importancia}
                        onChange={(e) => setImportancia(e.target.value)}
                        required
                    >
                        <option value="">-----</option>
                        <option value="Alto">Alto</option>
                        <option value="Médio">Médio</option>
                        <option value="Baixo">Baixo</option>
                    </select>
                </div>
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );

}

export default Financial;