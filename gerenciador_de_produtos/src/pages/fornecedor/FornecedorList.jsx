import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../api';
import { Link } from 'react-router-dom';

const FornecedorList = () => {

    const [forncedore, setForcedores] = useState([]);

    useEffect(() => {
        const buscarForncedores = () => {
            axios
              .get('fornecedores')
              .then(response => {
                setForcedores(response.data);
              })
              .catch(error =>
                console.error("Fornecedores não encontrados!", error)
              );
        }

        buscarForncedores();
    }, [])
    

  return (
    <div className='container mt-5'>
        <h2 className='mb-4'>Lista de Fornecedor</h2>
        <Link to="/add-fornecedores" className="btn btn-primary mb-2">
            <FaPlus className="icon" /> Adicionar Fornecedor
        </Link>
        {
            forncedores.map(fornecedor => {
                <table>
                    <thead>
                        <tr>
                            <th>Id:</th>
                            <th>Nome:</th>
                            <th>Cnpj:</th>
                            <th>Email:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{fornecedor.id}</td>
                            <td>{fornecedor.nome}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.email}</td>
                        </tr>
                    </tbody>
                </table>
            })
        }

    </div>
  )
}

export default FornecedorList