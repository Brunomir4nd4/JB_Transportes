let PRODUTO = {
    id: 0,
    nome: "",
    valor: 0,
    qtd: 0,
    parcelas: 0,
    parcelas_restantes: 0
};

let LISTA_PRODUTOS = [];
const CHAVE_ARMAZEM_DHU7993 = 'C2_armazem';
const TD = "td";
const TR = "tr";
const DATA_ATUAL = new Date();

function CriarNovoProduto() {
    PRODUTO.nome = document.getElementById("nome").value;
    PRODUTO.valor = parseFloat(document.getElementById("valor").value);
    PRODUTO.valor = PRODUTO.valor.toFixed(2);
    PRODUTO.qtd = document.getElementById("qtd").value;
    PRODUTO.parcelas = document.getElementById("parcelas").value;
    PRODUTO.data = `${(DATA_ATUAL.getDate()).toString().padStart(2, '0')}/${(DATA_ATUAL.getMonth() + 1).toString().padStart(2, '0')}/${DATA_ATUAL.getFullYear() - 2000}`;
    PRODUTO.parcelas_restantes = document.getElementById("parcelas").value;
    
    if (!(PRODUTO.nome == '' || PRODUTO.valor == '' || PRODUTO.qtd ==  '' || PRODUTO.parcelas == 0)) {
        // Verificar se a chave CHAVE_ARMAZEM_DHU7993 existe no localStorage
        if (localStorage.getItem(CHAVE_ARMAZEM_DHU7993)) {
            // Se existir, obter a lista de produtos do localStorage
            LISTA_PRODUTOS = JSON.parse(localStorage.getItem(CHAVE_ARMAZEM_DHU7993));
    
            let i;
            for (i=0; i < LISTA_PRODUTOS.length; i++);
            let objectProduct = LISTA_PRODUTOS[i - 1];
            let identificacao = objectProduct.id + 1;
            PRODUTO.id = identificacao;
        }
        
        // Adicionar o novo produto à lista
        LISTA_PRODUTOS.push(PRODUTO);
    
        // Armazenar a lista atualizada no localStorage
        localStorage.setItem(CHAVE_ARMAZEM_DHU7993, JSON.stringify(LISTA_PRODUTOS));
        
        // Recarregar a página
        window.location.reload();

    }  else {
        swal("Falha!", "Todas as áreas devem ser preenchidas e as parcelas tem que ser diferente de 0", "warning")
    }
}

let LISTA_PRODUTOS_DJE9J97 = [];
let LISTA_PRODUTOS_DHU7993 = [];
function CriarNovaFechamentoMes() {
    let litros_DJE9J97 = document.getElementById('litros-modal-DJE9J97').value;
    let km_DJE9J97 = document.getElementById('Km-modal-DJE9J97').value;
    let preco_km_DJE9J97 = document.getElementById('Preco-Km-modal-DJE9J97').value;
    let valor_bruto_DJE9J97 = document.getElementById('Valor-Bruto-modal-DJE9J97').value;

    let litros_DHU7993= document.getElementById('litros-modal-DHU7993').value;
    let km_DHU7993 = document.getElementById('Km-modal-DHU7993').value;
    let preco_km_DHU7993 = document.getElementById('Preco-Km-modal-DHU7993').value;
    let valor_bruto_DHU7993 = document.getElementById('Valor-Bruto-modal-DHU7993').value;

    if (!(litros_DJE9J97 == '' || km_DJE9J97 == '' || preco_km_DJE9J97 == '' || valor_bruto_DJE9J97 == '' || 
    litros_DHU7993 == '' || km_DHU7993 == '' || preco_km_DHU7993 == '' || valor_bruto_DHU7993 == '')) {

        // Obter a data e hora atual
        var dataAtual = new Date();
    
        // Obter o dia do mês atual
        var diaAtual = `${(dataAtual.getDate()).toString().padStart(2, '0')}/${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}/${dataAtual.getFullYear() - 2000}`;
        let objetoFechaMesDJE9J97 = {
            litros: litros_DJE9J97,
            km: km_DJE9J97,
            preco_km: preco_km_DJE9J97,
            valor_bruto: valor_bruto_DJE9J97,
            data: diaAtual
        };
    
        let objetoFechaMesDHU7993 = {
            litros: litros_DHU7993,
            km: km_DHU7993,
            preco_km: preco_km_DHU7993,
            valor_bruto: valor_bruto_DHU7993,
            data: diaAtual
        };
    
        if (localStorage.getItem("fechamento-mes-DJE9J97")) {
            LISTA_PRODUTOS_DJE9J97 = JSON.parse(localStorage.getItem("fechamento-mes-DJE9J97"));
            LISTA_PRODUTOS_DHU7993 = JSON.parse(localStorage.getItem("fechamento-mes-DHU7993"));
            LISTA_PRODUTOS_DJE9J97.push(objetoFechaMesDJE9J97);
            LISTA_PRODUTOS_DHU7993.push(objetoFechaMesDHU7993);
    
        } else {
            LISTA_PRODUTOS_DHU7993[0] = objetoFechaMesDHU7993;
            LISTA_PRODUTOS_DJE9J97[0] = objetoFechaMesDJE9J97;
        }
    
        localStorage.setItem("fechamento-mes-DJE9J97", JSON.stringify(LISTA_PRODUTOS_DJE9J97));
        localStorage.setItem("fechamento-mes-DHU7993", JSON.stringify(LISTA_PRODUTOS_DHU7993));
        document.getElementById('litros-modal-DJE9J97').value = '';
        document.getElementById('Km-modal-DJE9J97').value = '';
        document.getElementById('Preco-Km-modal-DJE9J97').value = '';
        document.getElementById('Valor-Bruto-modal-DJE9J97').value = '';

        document.getElementById('litros-modal-DHU7993').value = '';
        document.getElementById('Km-modal-DHU7993').value = '';
        document.getElementById('Preco-Km-modal-DHU7993').value = '';
        document.getElementById('Valor-Bruto-modal-DHU7993').value = '';
        swal("Secesso!", "Fechamento de mês salvo!", "success");
    } else {
        swal("Falha!", "Todas as áreas devem ser preenchidas", "warning")
    }

}

// é responsável pro imprimir os produtos, caso tenha
function PaginaCaminhaoCarregada() {
    let somaTotalMes = 0;
    if (localStorage.getItem(CHAVE_ARMAZEM_DHU7993)) {
        LISTA_PRODUTOS = JSON.parse(localStorage.getItem(CHAVE_ARMAZEM_DHU7993));
    
        for (let i=0; i < LISTA_PRODUTOS.length; i++) {
            somaTotalMes += ImprimirProdutos(LISTA_PRODUTOS[i]);
    
        }
    }
    let pValorTotal = document.getElementById("p-total-mes");
    pValorTotal.innerText = `Valor a pagar este mês: R$${somaTotalMes.toFixed(2)}`;
}

function AlterarProduto(produtoAlterado) {
    let nomeModal = document.getElementById("nome-modal");
    let valorModal = document.getElementById("valor-modal");
    let qtdModal = document.getElementById("qtd-modal");
    let parcelasModal = document.getElementById("parcelas-modal");

    if (!(nomeModal == '' || valorModal == '' || qtdModal == '' || parcelasModal == 0)) {
        produtoAlterado.nome = nomeModal;
        produtoAlterado.valor = valorModal;
        produtoAlterado.qtd = qtdModal;
        produtoAlterado.parcelas = parcelasModal;
    
        AtualizarLista (LISTA_PRODUTOS, produtoAlterado, 1);
    }
}

function ExcluirProduto (produtoExcluido) {
    swal({
        title: "Tem certeza?",
        text: "Se você deletar esse produto não poderá acessá-lo novamente!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Poof! Seu produto foi deletado!", {
                icon: "success",
            })
            .then(() => {
                AtualizarLista(LISTA_PRODUTOS, produtoExcluido, 2);
                
                if (JSON.parse(localStorage.getItem(CHAVE_ARMAZEM_DHU7993)).length == 0) {
                    localStorage.removeItem(CHAVE_ARMAZEM_DHU7993);
                }
            });
        } 
    });
}

function ImprimirProdutos(objetoProduto) {
    
    // Responsável pro atualizar as parcelas restantes e/ou deleter o produto
    CalculaParcelasRestantes(objetoProduto);

    let tr = document.createElement(TR);
    
    tr.appendChild(CriarTd(objetoProduto.nome));
    tr.appendChild(CriarTd(objetoProduto.valor));
    tr.appendChild(CriarTd(objetoProduto.qtd));
    tr.appendChild(CriarTd(objetoProduto.parcelas));
    tr.appendChild(CalculaValorMensal(objetoProduto.parcelas, objetoProduto.valor, objetoProduto.qtd));
    tr.appendChild(CriarTd(objetoProduto.data));
    tr.classList.add("Product_item")
    
    let conteudo = document.createTextNode("Alterar")
    let botao = document.createElement("button");
    // Abrindo modal
    botao.addEventListener("click", () => {
        AbreFechaModal()
        localStorage.setItem("changeProduct", JSON.stringify(objetoProduto));

        document.getElementById("nome-modal").value = objetoProduto.nome;
        document.getElementById("valor-modal").value = objetoProduto.valor;
        document.getElementById("qtd-modal").value = objetoProduto.qtd;
        document.getElementById("parcelas-modal").value = objetoProduto.parcelas;

        let p = document.getElementById('p-modal-header');
        p.innerText =`Parcelas Restantes: ${objetoProduto.parcelas_restantes}`;
    })
    botao.appendChild(conteudo)

    let td = document.createElement(TD);
    td.classList.add("changeButton");
    td.appendChild(botao);
    
    tr.appendChild(td);
    let tbodyControleCaminhao = document.getElementById("tbody-controle");
    tbodyControleCaminhao.appendChild(tr);
    return (objetoProduto.valor * objetoProduto.qtd)/objetoProduto.parcelas;
}

function AtualizarLista (LISTA_PRODUTOS, produtoAlterado, acao) {

    for (let i=0; i < LISTA_PRODUTOS.length; i++) {
        if (LISTA_PRODUTOS[i].id == produtoAlterado.id && acao == 1) {
            LISTA_PRODUTOS[i] = produtoAlterado;
            break;
        }

        if (LISTA_PRODUTOS[i].id == produtoAlterado.id && acao == 2) {
            LISTA_PRODUTOS.splice(i, 1);

            for (let j=0; j < LISTA_PRODUTOS.length; j++) {

                if (LISTA_PRODUTOS[j].id - 1 < 0) {

                    LISTA_PRODUTOS[j].id = 0;
                } else {

                    LISTA_PRODUTOS[j].id -= 1;
                }
            }
            break;
        }
    }

    localStorage.setItem(CHAVE_ARMAZEM_DHU7993, JSON.stringify(LISTA_PRODUTOS));
    AbreFechaModal();
    window.location.reload();
}

function CriarTd(content) {
    let td = document.createElement("TD");
    let textNode = document.createTextNode(content);
    td.appendChild(textNode);
    return td;
}

function CalculaValorMensal(parcelas, valor, qtd) {
    let td = document.createElement("TD");
    let valorMensal = (valor*qtd)/parcelas;
    let textNode = document.createTextNode(valorMensal.toFixed(2));
    td.appendChild(textNode);
    return td;
}

function CalculaParcelasRestantes(Product) {
    // Obter a data e hora atual
    var dataAtual = new Date();

    // Obter o dia do mês atual
    var diaAtual = dataAtual.getDate();

    // Verificar se já é ou passou do dia 25
    if (diaAtual >= 25 && JSON.parse(localStorage.getItem("verificador-desconta-parcela")) == false) {
        Product.parcelas_restantes -= 1;
        LISTA_PRODUTOS = JSON.parse(localStorage.getItem(CHAVE_ARMAZEM_DHU7993));
        let size = LISTA_PRODUTOS.length;
        for (let i=0; i < size; i++) {
            if (LISTA_PRODUTOS[i].id === Product.id) {
                LISTA_PRODUTOS[i] = Product;
                
                if (LISTA_PRODUTOS[i].parcelas_restantes <= 0) {
                    LISTA_PRODUTOS.splice(i, 1);
                }
                break;
            }
        }
        
        if (list_Product.length == 0) {
            localStorage.removeItem(CHAVE_ARMAZEM_DHU7993);
        } else {
            localStorage.setItem(CHAVE_ARMAZEM_DHU7993, JSON.stringify(list_Product));
        }
        // window.location.reload();

        localStorage.setItem("verificador-desconta-parcela", JSON.stringify(true));
    } 

    if (diaAtual < 25) {
        localStorage.setItem("verificador-desconta-parcela", JSON.stringify(false));
    }
}

// Página do histórico do fechamento do mes

function PaginaHistoricaCarregada() {
    if (localStorage.getItem("fechamento-mes-DJE9J97")) {
        LISTA_PRODUTOS_DJE9J97 = JSON.parse(localStorage.getItem("fechamento-mes-DJE9J97"));
        LISTA_PRODUTOS_DHU7993 = JSON.parse(localStorage.getItem("fechamento-mes-DHU7993"));
        for (let i=0; i < LISTA_PRODUTOS_DJE9J97.length; i++) {
            ImprimirHistoricaFechamentoMesDJE9J97(LISTA_PRODUTOS_DJE9J97[i]);
            ImprimirHitoricoFechamentoMesDHU7993(LISTA_PRODUTOS_DHU7993[i]);
        }
    }
}

function ImprimirHistoricaFechamentoMesDJE9J97(objetoFechaMes) {
    let tbody_DJE9J97 = document.getElementById('tbody-historico-fecha-mes-DJE9J97');
    let tr = document.createElement(TR);

    tr.appendChild(CriarTd(objetoFechaMes.litros));
    tr.appendChild(CriarTd(objetoFechaMes.km));

    let pd_preco_km = CriarTd(objetoFechaMes.preco_km);
    pd_preco_km.classList.add("pd-preco-km"); 
    tr.appendChild(pd_preco_km);

    tr.appendChild(CriarTd(objetoFechaMes.valor_bruto));
    tr.appendChild(CriarTd(objetoFechaMes.data));
    tr.classList.add("Product_item");
    
    tbody_DJE9J97.appendChild(tr);
}

function ImprimirHitoricoFechamentoMesDHU7993(objetoFechaMes) {
    let tbody_DHU7993 = document.getElementById('tbody-historico-fecha-mes-DHU7993');
    let tr = document.createElement(TR);

    tr.appendChild(CriarTd(objetoFechaMes.litros));
    tr.appendChild(CriarTd(objetoFechaMes.km));
    
    let pd_preco_km = CriarTd(objetoFechaMes.preco_km);
    pd_preco_km.classList.add("pd-preco-km"); 
    tr.appendChild(pd_preco_km);

    tr.appendChild(CriarTd(objetoFechaMes.valor_bruto));
    tr.appendChild(CriarTd(objetoFechaMes.data));
    tr.classList.add("Product_item");

    tbody_DHU7993.appendChild(tr);
}

// Modal de alteração do Produto 
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const AbreFechaModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}

// Modal de fechamento do mes
const modalFechaMes = document.querySelector("#modal-fecha-mes");
const fadeFechaMes = document.querySelector("#fade-fecha-mes");

const AbreFechaModalFechaMes = () => {
    modalFechaMes.classList.toggle("hide");
    fadeFechaMes.classList.toggle("hide");
}