
import { useEffect, useState } from "react"
import CardServico from "../../components/CardServico"
import "./style.css"

import api from "../../utils/api";

export default function ListaServicos() {
    const [servicos, setServicos] = useState<any[]>([]);


    const [skillDigitada, setSkillDigitada] = useState<string>("");

    const [listaServicosFiltrados, setListaServicosFiltrados] = useState<any[]>(servicos);

    useEffect(() => {
        document.title = "Lista de Serviços | VSConnect"

        listarServicos();
    }, [])

    function buscarPorServicos(event: any) {
        event.preventDefault();

        const servicosFiltrados = servicos.filter((serv: any) => serv.techs.includes(skillDigitada.toLocaleUpperCase()));

        if (servicosFiltrados.length === 0) {
            return alert("Nenhum serviço foi encontrado com essa tecnologia")
        } else {
            setListaServicosFiltrados(servicosFiltrados)
        }
    }

    function retornoServicosGeral(event: any) {
        if (event.target.value === "") {
            listarServicos()
        }
        setSkillDigitada(event.target.value)
    }

    function listarServicos() {
        api.get("servicos").then((response: any) => {
            console.log(response.data)
            setServicos(response.data)
        })
    }


    return (

        <main id="lista-servicos">
            <div className="container container_lista_servicos">
                <div className="lista_servicos_conteudo">
                    <h1>Lista de Serviços</h1>
                    <hr />
                    <form method="post" onSubmit={buscarPorServicos}>
                        <div className="wrapper_form">
                            <label htmlFor="busca">Procurar serviços</label>
                            <div className="campo-label">
                                <input type="search" name="campo-busca" id="busca" placeholder="Buscar serviços por tecnologias..." onChange={retornoServicosGeral}/>
                                <button type="submit">Buscar</button>
                            </div>
                        </div>
                    </form>
                    <div className="wrapper_lista">
                        <ul>
                            <li>
                                <div className="servico">
                                    <div className="topo_servico">
                                        <h3>Desenvolvimento de site institucional - Gateway de Pagamento / Fintech</h3>
                                        <span>R$ 1300,00</span>
                                    </div>
                                    <p>Desenvolver um site responsivo que seja utilizado como uma plataforma de apresentação do nosso gateway de pagamento. O objetivo principal deste projeto é criar um site atraente e informativo, que demonstre as funcionalidades e benefícios do nosso gateway de pagamento para potenciais clientes.</p>
                                    <div className="techs">
                                        <span>HTML</span>
                                        <span>CSS</span>
                                        <span>React</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="servico">
                                    <div className="topo_servico">
                                        <h3>Bot telegram Pagamento</h3>
                                        <span>R$ 2400,00</span>
                                    </div>
                                    <p>Preciso fazer um código em python para um bot do telegram. O bot será para solicitação de pagamento.</p>
                                    <div className="techs">
                                        <span>Python</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="servico">
                                    <div className="topo_servico">
                                        <h3>Caixa Rápido</h3>
                                        <span>R$ 1200,00</span>
                                    </div>
                                    <p>Preciso fazer um  software que permita ao usuário fazer o upload de seu extrato bancário em formato( ofx). Dentro do software o mesmo poderá categorizar todas as suas receitas e despesas, tendo categorias sugeridas pelo software e permitindo também personalizações. Após o lançamento de vários extratos o software irá entender que são lançamentos parecidos e fará a categorização de maneira automática, cabendo ao usuário somente categorizar as receitas e despesas que não se repetem. Após a categorização o software irá emitir gráficos e relatórios baseados na categorização das contas.</p>
                                    <div className="techs">
                                        <span>Python</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>

    )
}
export default ListaServicos