let Product = {
    id: 0,
    nome: "",
    valor: 0,
    qtd: 0,
    parcelas: 0,
    parcelas_restantes: 0
};

let list_Product = [];
// localStorage.clear()

// é responsável pro imprimir os produtos, caso tenha
if (localStorage.getItem("C1_armazem")) {
    list_Product = JSON.parse(localStorage.getItem("C1_armazem"));

    for (let i=0; i < list_Product.length; i++) {
        View_Products(list_Product[i]);

    }

}

function createTableCell(content) {
    let td = document.createElement("td");
    let textNode = document.createTextNode(content);
    td.appendChild(textNode);
    return td;
}

function View_Products(objectProduct) {
    
    // Responsável pro atualizar as parcelas restantes e/ou deleter o produto
    ParcelasRestantes(objectProduct);

    let tr = document.createElement("tr");
    
    tr.appendChild(createTableCell(objectProduct.nome));
    tr.appendChild(createTableCell(objectProduct.valor));
    tr.appendChild(createTableCell(objectProduct.qtd));
    tr.appendChild(createTableCell(objectProduct.parcelas));
    tr.classList.add("Product_item")
    
    let conteudo = document.createTextNode("Alterar")
    let button = document.createElement("button");
    // Abrindo modal
    button.addEventListener("click", () => {
        toggleModal()
        localStorage.setItem("changeProduct", JSON.stringify(objectProduct));
        let nomeModal = document.getElementById("nome-modal");
        let valorModal = document.getElementById("valor-modal");
        let qtdModal = document.getElementById("qtd-modal");
        let parcelasModal = document.getElementById("parcelas-modal");

        nomeModal.value = objectProduct.nome;
        valorModal.value = objectProduct.valor;
        qtdModal.value = objectProduct.qtd;
        parcelasModal.value = objectProduct.parcelas;

        let p = document.getElementById('p-modal-header');
        p.innerText =`Parcelas Restantes: ${objectProduct.parcelas_restantes}`;
    })
    button.appendChild(conteudo)

    let td1 = document.createElement("td");
    td1.classList.add("changeButton");
    td1.appendChild(button);
    
    tr.appendChild(td1);
    let tbody = document.getElementById("tbody");
    tbody.appendChild(tr);
    
}

function create_Product() {
    Product.nome = document.getElementById("nome").value;
    Product.valor = document.getElementById("valor").value;
    Product.qtd = document.getElementById("qtd").value;
    Product.parcelas = document.getElementById("parcelas").value;
    Product.parcelas_restantes = document.getElementById("parcelas").value;
    
    // Verificar se a chave "C1_armazem" existe no localStorage
    if (localStorage.getItem("C1_armazem")) {
        // Se existir, obter a lista de produtos do localStorage
        list_Product = JSON.parse(localStorage.getItem("C1_armazem"));

        let i;
        for (i=0; i < list_Product.length; i++);
        let objectProduct = list_Product[i - 1];
        let identificacao = objectProduct.id + 1;
        Product.id = identificacao;
    }
    
    // Adicionar o novo produto à lista
    list_Product.push(Product);

    // Armazenar a lista atualizada no localStorage
    localStorage.setItem("C1_armazem", JSON.stringify(list_Product));
    
    // Recarregar a página
    window.location.reload();
}

function ParcelasRestantes(Product) {
    // Obter a data e hora atual
    var dataAtual = new Date();

    // Obter o dia do mês atual
    var diaAtual = dataAtual.getDate();

    // Verificar se já é ou passou do dia 25
    if (30 >= 25) {
        Product.parcelas_restantes -= 1;
        console.log("oi")
        let list_Product = JSON.parse(localStorage.getItem("C1_armazem"));
        let size = list_Product.length;
        for (let i=0; i < size; i++) {
            if (list_Product[i].id === Product.id) {
                list_Product[i] = Product;
                
                if (list_Product[i].parcelas_restantes <= 0) {
                    list_Product.splice(i, 1);
                }
                break;
            }
        }
        console.log(list_Product.length)
        if (list_Product.length == 0) {
            localStorage.removeItem("C1_armazem");
        } else {
            localStorage.setItem("C1_armazem", JSON.stringify(list_Product));
        }
        window.location.reload();
    }
}

function UpdateList (list_Product, changeProduct, action) {

    for (let i=0; i < list_Product.length; i++) {
        if (list_Product[i].id == changeProduct.id && action == 1) {
            list_Product[i] = changeProduct;
            break;
        }

        if (list_Product[i].id == changeProduct.id && action == 2) {
            list_Product.splice(i, 1);

            for (let j=0; j < list_Product.length; j++) {

                if (list_Product[j].id - 1 < 0) {

                    list_Product[j].id = 0;
                } else {

                    list_Product[j].id -= 1;
                }
            }
            break;
        }
    }

    localStorage.setItem("C1_armazem", JSON.stringify(list_Product));
    toggleModal();
    window.location.reload();
}

function changeProduct(changeProduct) {
    let nomeModal = document.getElementById("nome-modal");
    let valorModal = document.getElementById("valor-modal");
    let qtdModal = document.getElementById("qtd-modal");
    let parcelasModal = document.getElementById("parcelas-modal");

    changeProduct.nome = nomeModal.value;
    changeProduct.valor = valorModal.value;
    changeProduct.qtd = qtdModal.value;
    changeProduct.parcelas = parcelasModal.value;

    UpdateList (list_Product, changeProduct, 1);
}

function dellProduct (dellProduct) {
    UpdateList(list_Product, dellProduct, 2);

    if (JSON.parse(localStorage.getItem("C1_armazem")).length == 0) {
        localStorage.removeItem("C1_armazem");
    }
}

function SalvarAlteracaoFechaMes() {
    let litros_DJE9J97 = document.getElementById('litros-modal-DJE9J97').value;
    let km_DJE9J97 = document.getElementById('Km-modal-DJE9J97').value;
    let preco_km_DJE9J97 = document.getElementById('Preco-Km-modal-DJE9J97').value;
    let valor_bruto_DJE9J97 = document.getElementById('Valor-Bruto-modal-DJE9J97').value;

    let litros_DHU7993= document.getElementById('litros-modal-DHU7993').value;
    let km_DHU7993 = document.getElementById('Km-modal-DHU7993').value;
    let preco_km_DHU7993 = document.getElementById('Preco-Km-modal-DHU7993').value;
    let valor_bruto_DHU7993 = document.getElementById('Valor-Bruto-modal-DHU7993').value;

    let objetoFechaMesDJE9J97 = {
        litros: litros_DJE9J97,
        km: km_DJE9J97,
        preco_km: preco_km_DJE9J97,
        valor_bruto: valor_bruto_DJE9J97
    };

    let objetoFechaMesDHU7993 = {
        litros: litros_DHU7993,
        km: km_DHU7993,
        preco_km: preco_km_DHU7993,
        valor_bruto: valor_bruto_DHU7993
    };

    localStorage.setItem("novo-fechamento-mes-DJE9J97", JSON.stringify(objetoFechaMesDJE9J97));
    localStorage.setItem("novo-fechamento-mes-DHU7993", JSON.stringify(objetoFechaMesDHU7993));
}


// Página do histórico do fechamento do mes
function ViewhistoricoFechaMes() {
    let tbody_DJE9J97 = document.getElementById('tbody-historico-fecha-mes-DJE9J97');
    let tbody_DHU7993 = document.getElementById('tbody-historico-fecha-mes-DHU7993');
    let tr1  = document.createElement('tr');
    let tr2  = document.createElement('tr');
    let objetoFechaMesDJE9J97 = JSON.parse(localStorage.getItem("novo-fechamento-mes-DJE9J97"))
    let objetoFechaMesDHU7993 = JSON.parse(localStorage.getItem("novo-fechamento-mes-DHU7993"))

    tr1.appendChild(createTableCell(objetoFechaMesDJE9J97.litros));
    tr1.appendChild(createTableCell(objetoFechaMesDJE9J97.km));
    tr1.appendChild(createTableCell(objetoFechaMesDJE9J97.preco_km));
    tr1.appendChild(createTableCell(objetoFechaMesDJE9J97.valor_bruto));
    tbody_DJE9J97.appendChild(tr1);

    tr2.appendChild(createTableCell(objetoFechaMesDHU7993.litros));
    tr2.appendChild(createTableCell(objetoFechaMesDHU7993.km));
    tr2.appendChild(createTableCell(objetoFechaMesDHU7993.preco_km));
    tr2.appendChild(createTableCell(objetoFechaMesDHU7993.valor_bruto));
    tbody_DHU7993.appendChild(tr2);
}


// Change Modal 
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}

// Fechar mês Modal
const modalFechaMes = document.querySelector("#modal-fecha-mes");
const fadeFechaMes = document.querySelector("#fade-fecha-mes");

const toggleModalFechaMes = () => {
    modalFechaMes.classList.toggle("hide");
    fadeFechaMes.classList.toggle("hide");
}
