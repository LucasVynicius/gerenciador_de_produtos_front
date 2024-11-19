import { useState, useEffect } from 'react';
import axios from '../../api';
import { Link } from 'react-router-dom';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const FornecedorList = () => {

    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const buscarForncedores = () => {
            axios
              .get("/fornecedores")
              .then(response => {
                console.log(response.data);
                setFornecedores(response.data);
              })
              .catch((error) =>
                console.error("Fornecedores não encontrados!", error)
              );
        }

        buscarForncedores();
    }, []);

    const abrirModal = (fornecedor) => {
        setFornecedorSelecionado(fornecedor);
        setModalAberto(true);
    }

    const fecharModal = () => {
        setModalAberto(false);
        setFornecedorSelecionado(null);
    }
    

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Fornecedor</h2>
      <Link to="/add-fornecedores" className="btn btn-primary mb-2">
        <FaPlus className="icon" /> Adicionar Fornecedor
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nome:</th>
            <th>CNPJ:</th>
            <th>Email:</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody>
          {
            fornecedores.map(fornecedor => (
                <tr key={fornecedor.id}>
                    <td>{fornecedor.nome}</td>
                    <td>{fornecedor.cnpj}</td>
                    <td>{fornecedor.email}</td>
                    <td>
                        <Link to={`/edit-fornecedores/${fornecedor.id}`} className=" btn btn-sm btn-warning">
                            <FaEdit className="icon icon-btn" /> Editar
                        </Link>

                        <button onClick={() => abrirModal(fornecedor)} className="btn btn-sm btn-danger">
                            <FaTrash className="icon icon-btn" /> Excluir
                        </button>
                    </td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default FornecedorList