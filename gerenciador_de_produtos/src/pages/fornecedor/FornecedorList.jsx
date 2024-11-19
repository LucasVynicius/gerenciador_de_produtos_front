import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../api';

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
    <div>
        <h2>FornecedorList:</h2>
    </div>
  )
}

export default FornecedorList