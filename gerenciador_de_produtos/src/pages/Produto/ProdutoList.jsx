import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from '../../api';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaPlus, FaExclamationTriangle, FaCheckCircle, FaEdit, FaTrash   } from 'react-icons/fa'

const ProdutoList = () => {

    const [produtos, setProdutos] = useState([]);
    const [produtosSelecionado, setProdutosSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [modalAbertoSucesso, setModalAbertoSucesso] = useState(false);
    const [tooltipAberto, setTooltipAberto] = useState(false);

    useEffect(() => {
        const buscarProdutos = () => {
            axios.get("/produtos")
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => console.error("Produtos não escontrados.", error));
        }

        buscarProdutos();

    }, [])

    const abrirModal = (produtos) => {
        setProdutosSelecionado(produtos);
        setModalAberto(true)
    }

    const fecharModal = () => {
        setModalAberto(false);
        setProdutosSelecionado(null);
    }

    const abrirModalSucesso = () => {
        setModalAbertoSucesso(true);
        setTimeout(() => setModalAbertoSucesso(false), 2000);
    }

    const removerProduto = () => {
        axios.delete(`/produtos/${produtosSelecionado.id}`)
        .then(() => {
            setProdutos(prevProdutos => prevProdutos.filter(produto => produto.id !== produtosSelecionado.id));
            fecharModal();
            abrirModalSucesso();
        })
    }

    const toggleToolTip = () => {
        setTooltipAberto(!tooltipAberto);
    }

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ position: "relative" }}>
        Lista de Produtos {""}
        <FaQuestionCircle className="tooltip-icon" onClick={toggleToolTip} />
        {tooltipAberto && (
          <div className="tooltip">
            Aqui você pode ver, editar ou excluir produtos cadastrados no
            sistema.
          </div>
        )}
      </h2>
      <Link to="/add-produtos" className="btn btn-primary mb-2">
        <FaPlus className="icon" /> Adicionar Produto
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Preço:</th>
            <th>Descrição:</th>
            <th>Quantidade em Estoque:</th>
            <th>Ações:</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidadeEstoque}</td>
              <td>
                <Link
                  to={`/edit-produtos/${produto.id}`}
                  className="btn btn-sm btn-warning"
                >
                  <FaEdit className="icon icon-btn" /> Editar
                </Link>

                <button
                  onClick={() => abrirModal(produto)}
                  className="btn btn-sm btn-danger"
                >
                  <FaTrash className="icon icon-btn" /> Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modalContent">
          <FaExclamationTriangle className="icon" />
          <h2>Confirmar Exclusão</h2>
          <p>
            Tem certeza que desaja excluir o produto
            {produtosSelecionado && produtosSelecionado.nome} ?
          </p>

          <div className="modalButtons">
            <button onClick={fecharModal} className="btn btn-secondary">
              Cancelar
            </button>
            <button onClick={removerProduto} className="btn btn-danger">
              Excluir
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalAbertoSucesso}
        onRequestClose={() => setModalAbertoSucesso(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modalContent">
          <FaCheckCircle className="icon successIcon" />
          <h2>Produto Excluído com sucesso!</h2>
        </div>
      </Modal>
    </div>
  );
}

export default ProdutoList