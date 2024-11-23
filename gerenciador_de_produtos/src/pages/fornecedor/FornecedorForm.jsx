import React, { useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const FornecedorForm = () => {

    const [fornecedor, setFornecedor] = useState({ nome: '', cnpj: '',
        email: ''
    });
    const [tooltipAberto, setTooltipAberto] = useState(false)
    const { id } = useParams();
    
    const toggleToolTip = () => {
      setTooltipAberto(!tooltipAberto)
    }

  return (
    <div className='form-container'>
      <h2 style={{position: 'relative'}}>
          {id ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}
          {'  '}
          <FaQuestionCircle 
              className="tooltip-icon"
              onClick={toggleToolTip}
          />
          {tooltipAberto && (
              <div className="tooltip">
                {id ? 'Nesta tela, você pode editar as informações de um fornecedor existente.'
                : 'Nesta tela, você pode adicionar um novo fornecedor no sistema.'
                }
              </div>
            )}
      </h2>

  

    </div>
  )
}

export default FornecedorForm