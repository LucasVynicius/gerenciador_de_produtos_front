import React, { useEffect, useState } from 'react'
import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask'
import axios from '../../api'
import Modal from 'react-modal';


Modal.setAppElement('#root');

const FornecedorForm = () => {

    const [fornecedor, setFornecedor] = useState({ nome: '', cnpj: '',
        email: ''
    });
    const [tooltipAberto, setTooltipAberto] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      if (id) {
        //Se tiver id, é que precisa fazer o get (edição)
        axios.get(`/fornecedores/${id}`, fornecedor)
        .then(response => {
          setFornecedor(response.data)
        })
        .catch(error => console.error("Ocorreu um erro", error))
      }
      
    }, [id]);
    
    
    const toggleToolTip = () => {
      setTooltipAberto(!tooltipAberto)
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      if(id){
        //Se tiver id, então é edição
        axios.put(`/fornecedores/${id}`, fornecedor)
        .then(() => {
          setModalAberto(true);
        })
        .catch(error => console.error("Ocorreu um erro", error));
      } else{
        axios.post(`/fornecedores`, fornecedor)
        .then(() => {
          setModalAberto(true);
        })
        .catch(error => console.error("Ocorreu um error", error))
      }
    }

    const fecharModal = () => {
      setModalAberto(false);
      navigate("/listar-fornecedores");
    }

    const adicionarOutroFornecedor = () => {
      setModalAberto(false);
      setFornecedor({ nome: '', cnpj: '', email: ''});
    }

  return (
    <div className="form-container">
      <h2 style={{ position: "relative" }}>
        {id ? "Editar Fornecedor" : "Adicionar Fornecedor"}
        {"  "}
        <FaQuestionCircle className="tooltip-icon" onClick={toggleToolTip} />
        {tooltipAberto && (
          <div className="tooltip">
            {id
              ? "Nesta tela, você pode editar as informações de um fornecedor existente."
              : "Nesta tela, você pode adicionar um novo fornecedor no sistema."}
          </div>
        )}
      </h2>

      <form className="fornecedor-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Fornecedor:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={fornecedor.nome}
            onChange={(e) =>
              setFornecedor({ ...fornecedor, nome: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cnpj">CNPJ do Fornecedor:</label>
          <InputMask
            mask="99.999.999/9999-99"
            className="form-control"
            id="cnpj"
            name="cnpj"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            value={fornecedor.cnpj}
            onChange={(e) =>
              setFornecedor({ ...fornecedor, cnpj: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email do Fornecedor:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            title="Digite um email válido."
            value={fornecedor.email}
            onChange={(e) =>
              setFornecedor({ ...fornecedor, email: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn-success">
          {id ? "Editar" : "Adicionar"}
        </button>
      </form>

      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        className="modal"
        overlayClasseName="overlay"
      >
        <div className="modalContent">
          <FaCheckCircle className="icon successIcon" />
          <h2>{id ? 'Fornecedor atualizado com sucesso!' : 
          'Fornecedor adicionado com sucesso!'}</h2>
          <button onClick={fecharModal} className="btn btn-success">Fechar</button>
          {!id && <button onClick={adicionarOutroFornecedor} className='btn-secondary'>
            Adicionar outro fornecedor</button>}
        </div>
      </Modal>
    </div>
  );
}

export default FornecedorForm