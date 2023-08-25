//estilização
import "./style.css";

//Hook
import { useEffect, useState } from "react";

import api from "../../utils/api";

function CadastroServico() {

  const [techs, setTechs] = useState<string[]>(
    [
      "HTML",
      "CSS",
      "JAVASCRIPT"
    ]
  );

  const [titulo, setTitulo] = useState<string>("")
  const [descricao, setDescricao] = useState<string>("")
  const [proposta, setProposta] = useState<string>("")
  const [skill, setSkill] = useState<string>("")

  const [skillsSelecionadas, setSkillsSelecionadas] = useState<string[]>([]);

  const [select, setSelect] = useState<string>("");

  function CadastrarServico(event: any) {

    const formdata = new FormData()

    formdata.append("titulo", titulo)
    formdata.append("descricao", descricao)
    formdata.append("proposta", proposta)
    formdata.append("skill;", skill)

    formdata.append("hardSkills", JSON.stringify(skillsSelecionadas))

    api.post("servicos", formdata).then((response) => {
      console.log(response);
      alert("Serviço cadastrado com sucesso!")

    }).catch((error) => {
      console.log(error);
    })
  }

  function mascaraProposta(event: any) {
    let valorDigitado = event.target.value;

    if (!valorDigitado) return "";

    valorDigitado = valorDigitado.replace(/\D/g, '');
    valorDigitado = valorDigitado.replace(/(\d{5})(\d)/, '$1-$2');

    event.target.value = valorDigitado;
  }

  function adicionarSkill() {

    if (select === "") {

      alert("Selecione uma skill para adicionar");

    } else {

      if (skillsSelecionadas.includes(select)) {
        alert("Essa skill já foi selecionada");
      }
      else {
        let novaListaSkillsSelecionadas = [...skillsSelecionadas];

        novaListaSkillsSelecionadas.push(select);

        setSkillsSelecionadas(novaListaSkillsSelecionadas);
      }
    }
  }

  function excluirSkill(skill: string) {

    const novaListaSkillsSelecionadas = skillsSelecionadas.filter(item => item !== skill);

    setSkillsSelecionadas(novaListaSkillsSelecionadas);
  };

  useEffect(() => {
    //Inserindo o título da guia de endereço da página atual.
    document.title = "VSConnect - Cadastro de Serviços";
  }, []);

  return (
    <main className="main_cad_servico">
      <div className="container container_cad_serv">
        <div className="cad_serv_conteudo">
          <h1>Cadastro de Serviço</h1>
          <hr />
          <form onSubmit={CadastrarServico} className="cad_serv_formulario" method="POST" action="">
            <div className="cad_serv_box_input">
              <label htmlFor="titulo">Titulo do serviço:</label>
              <input
                type="text"
                id="titulo"
                onChange={(event) => { setTitulo(event.target.value) }}
                placeholder="Ex: E-commerce para pizzaria"
              />
            </div>
            <div className="cad_serv_box_input">
              <label htmlFor="descricao">Descrição do serviço:</label>
              <textarea
                name=""
                id="descricao"
                onChange={(event) => { setDescricao(event.target.value) }}
                placeholder="Digite aqui a descrição resumida do que você precisa:"
              ></textarea>
            </div>
            <div className="cad_serv_box_input">
              <label htmlFor="proposta">Proposta:</label>
              <input
                type="text"
                id="proposta"
                onChange={(event) => { setProposta(event.target.value) }}
                onKeyUp={mascaraProposta}
                maxLength={17}
                placeholder="Digite o valor que deseja pagar:"
              />
            </div>

            <span>Tecnologias Desejadas</span>
            <hr />
            <div className="cad_serv_box_skills">
              <span>Selecione uma Skill para adicionar</span>
              <div className="cad_linha_select">
                <select defaultValue={"DEFAULT"} name="" id="cad_select_skill" onChange={(e) => setSelect(e.target.value)}>
                  <option value="DEFAULT" disabled>Selecione</option>
                  {
                    techs.map((tech: any, index: number) => {
                      return <option key={index} value={tech}>{tech}</option>
                    })
                  }
                </select>
                <input
                  type="button"
                  value="Inserir"
                  id="cad_btn_inserir"
                  onClick={adicionarSkill}
                />
              </div>
              <div id="cad_lista_skills">

              </div>
            </div>
            <button type="submit" className="cad_botao">Cadastrar</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CadastroServico;