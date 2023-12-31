import { useState } from "react";
import Cabecalho from "@/components/Cabecalho";
import Form from "@/components/Form";
import Table from "@/components/Table";
import Mensagem from "@/components/Mensage";
import Thead from "@/components/Thead";
import Tbody from "@/components/Tbody";
import Tr from "@/components/Tr";
import Th from "@/components/Th";
import Td from "@/components/Td";

export default function Home() {
  const [mensagem, setMensagem] = useState(false);
  const [mensagemData, setMensagemData] = useState(false);
  const [mensagemErro, setMensagemErro] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [formValues, setFormValues] = useState({
    descricao: "",
    solicitante: "",
    sala: "",
    inicio: "",
    fim: "",
    termos: false,
  });

  const handleDescricaoChange = (e) => {setFormValues({ ...formValues, descricao: e.target.value });};
  const handleSolicitanteChange = (e) => {setFormValues({ ...formValues, solicitante: e.target.value });};
  const handleSalaChange = (e) => {setFormValues({ ...formValues, sala: e.target.value });};
  const handleInicioChange = (e) => {setFormValues({ ...formValues, inicio: e.target.value });};
  const handleFimChange = (e) => {setFormValues({ ...formValues, fim: e.target.value });};
  const handleTermosChange = (e) => {setFormValues({ ...formValues, termos: e.target.checked });};
  const handleFormSubmit = (e) => {e.preventDefault();   
    
    if (!formValues.descricao || !formValues.solicitante || !formValues.termos) {
      setMensagemErro(true);
      setTimeout(() => {
        setMensagemErro(false);
      }, 2000);
      return;
    }

    if (!formValues.descricao || !formValues.solicitante || !formValues.termos || 
      new Date(formValues.fim) <= new Date(formValues.inicio)) {
      setMensagemData(true);
      setTimeout(() => {
        setMensagemData(false);
      }, 2000);
      return;
    }

    const novaReserva = {
      descricao: formValues.descricao,
      solicitante: formValues.solicitante,
      sala: formValues.sala,
      inicio: formValues.inicio,
      fim: formValues.fim,
      termos: formValues.termos,
    };

    setReservas([...reservas, novaReserva]);
    setMensagem(true);
    setTimeout(() => {
      setMensagem(false);}, 2000);
    setFormValues({
      descricao: "",
      solicitante: "",
      sala: "",
      inicio: "",
      fim: "",
      termos: false,
    });
  };

  function formatarData(data) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const dataFormatada = new Date(data).toLocaleDateString('pt-BR', options);
    return dataFormatada.replace(",", "").replace(" ", " às ");
  }

  return (
    <>
      <Cabecalho>Sala Reserva</Cabecalho>
      <div style={{ display: "flex", height: "880px" }}>
        <div
          style={{
            width: "30%",
            backgroundColor: "#E8EAEE",
          }}
        >
          <div style={{ marginBottom: "100px" }}>
            <div
              style={{
                margin: "10px",
                fontWeight: 700,
              }}
            >
              <label>RESERVA DE SALAS</label>
            </div>
            
            {mensagemData && (
              <Mensagem type="data">Data invalida!</Mensagem>
            )}
            
            {mensagemErro && (
              <Mensagem type="error">Preencha todos os campos!</Mensagem>
            )}

            {mensagem && (
              <Mensagem type="success">Agendamento realizado com sucesso!</Mensagem>
            )}
          </div>

          <Form
            onSubmit={handleFormSubmit}
            value={formValues}
            onChange={{
              descricao: handleDescricaoChange,
              solicitante: handleSolicitanteChange,
              sala: handleSalaChange,
              inicio: handleInicioChange,
              fim: handleFimChange,
              termos: handleTermosChange,
            }}
          />
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            width: "70%",
          }}
        >
          <label> 📆 RESERVAS REALIZADAS: {reservas.length}</label>
          <Table>
            <Thead>
              <Tr>
                <Th>Descrição</Th>
                <Th>Solicitante</Th>
                <Th>Sala</Th>
                <Th>Início</Th>
                <Th>Fim</Th>
              </Tr>
            </Thead>
            {reservas?.map((reserva, index) => (
              <Tbody key={index}>
                <Tr>
                  <Td>{reserva.descricao}</Td>
                  <Td>{reserva.solicitante}</Td>
                  <Td>{reserva.sala}</Td>
                  <Td>{formatarData(reserva.inicio)}</Td>
                  <Td>{formatarData(reserva.fim)}</Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </div>
      </div>
    </>
  );
}
