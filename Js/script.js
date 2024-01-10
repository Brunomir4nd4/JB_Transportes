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
function Controle() {
    let somaTotalMes = 0;
    if (localStorage.getItem("C1_armazem")) {
        list_Product = JSON.parse(localStorage.getItem("C1_armazem"));
    
        for (let i=0; i < list_Product.length; i++) {
            somaTotalMes += View_Products(list_Product[i]);
    
        }
    }
    let pValorTotal = document.getElementById("p-totala-mes");
    pValorTotal.innerText = `Valor a pagar este mês: $${somaTotalMes.toFixed(2)}`;
}

function createTD(content) {
    let td = document.createElement("td");
    let textNode = document.createTextNode(content);
    td.appendChild(textNode);
    return td;
}

function ValorMensal(parcelas, valor, qtd) {
    let td = document.createElement("td");
    let valorMensal = (valor*qtd)/parcelas;
    let textNode = document.createTextNode(valorMensal.toFixed(2));
    td.appendChild(textNode);
    return td;
}

function View_Products(objectProduct) {
    
    // Responsável pro atualizar as parcelas restantes e/ou deleter o produto
    ParcelasRestantes(objectProduct);
    let pTotalMes = document.getElementById("p-totala-mes");
    pTotalMes.innerText = ``

    let tr = document.createElement("tr");
    
    tr.appendChild(createTD(objectProduct.nome));
    tr.appendChild(createTD(objectProduct.valor));
    tr.appendChild(createTD(objectProduct.qtd));
    tr.appendChild(createTD(objectProduct.parcelas));
    tr.appendChild(ValorMensal(objectProduct.parcelas, objectProduct.valor, objectProduct.qtd));
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
    let tbody = document.getElementById("tbody-controle");
    tbody.appendChild(tr);
    return (objectProduct.valor * objectProduct.qtd)/objectProduct.parcelas;
}

function create_Product() {
    Product.nome = document.getElementById("nome").value;
    Product.valor = document.getElementById("valor").value;
    Product.qtd = document.getElementById("qtd").value;
    Product.parcelas = document.getElementById("parcelas").value;
    Product.parcelas_restantes = document.getElementById("parcelas").value;

    if (!(Product.nome == '' || Product.valor == '' || Product.qtd ==  '' || Product.parcelas == 0)) {
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
    
}

function ParcelasRestantes(Product) {
    // Obter a data e hora atual
    var dataAtual = new Date();

    // Obter o dia do mês atual
    var diaAtual = dataAtual.getDate();

    // Verificar se já é ou passou do dia 25
    if (diaAtual >= 25 && JSON.parse(localStorage.getItem("verificador-desconta-parcela")) == false) {
        Product.parcelas_restantes -= 1;
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
        
        if (list_Product.length == 0) {
            localStorage.removeItem("C1_armazem");
        } else {
            localStorage.setItem("C1_armazem", JSON.stringify(list_Product));
        }
        // window.location.reload();

        localStorage.setItem("verificador-desconta-parcela", JSON.stringify(true));
    } 

    if (diaAtual < 25) {
        localStorage.setItem("verificador-desconta-parcela", JSON.stringify(false));
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
    let nomeModal = document.getElementById("nome-modal").value;
    let valorModal = document.getElementById("valor-modal").value;
    let qtdModal = document.getElementById("qtd-modal").value;
    let parcelasModal = document.getElementById("parcelas-modal").value;

    if (!(nomeModal == '' || valorModal == '' || qtdModal == '' || parcelasModal == 0)) {
        changeProduct.nome = nomeModal;
        changeProduct.valor = valorModal;
        changeProduct.qtd = qtdModal;
        changeProduct.parcelas = parcelasModal;
    
        UpdateList (list_Product, changeProduct, 1);
    }

}

function dellProduct (dellProduct) {
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
                UpdateList(list_Product, dellProduct, 2);
                
                if (JSON.parse(localStorage.getItem("C1_armazem")).length == 0) {
                    localStorage.removeItem("C1_armazem");
                }
            });
            
        } 
    });
}

let list_DJE9J97 = [];
let list_DHU7993 = [];
function SalvarAlteracaoFechaMes() {
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
            list_DJE9J97 = JSON.parse(localStorage.getItem("fechamento-mes-DJE9J97"));
            list_DHU7993 = JSON.parse(localStorage.getItem("fechamento-mes-DHU7993"));
            list_DJE9J97.push(objetoFechaMesDJE9J97);
            list_DHU7993.push(objetoFechaMesDHU7993);
    
        } else {
            list_DHU7993[0] = objetoFechaMesDHU7993;
            list_DJE9J97[0] = objetoFechaMesDJE9J97;
        }
    
        localStorage.setItem("fechamento-mes-DJE9J97", JSON.stringify(list_DJE9J97));
        localStorage.setItem("fechamento-mes-DHU7993", JSON.stringify(list_DHU7993));
        document.getElementById('litros-modal-DJE9J97').value = '';
        document.getElementById('Km-modal-DJE9J97').value = '';
        document.getElementById('Preco-Km-modal-DJE9J97').value = '';
        document.getElementById('Valor-Bruto-modal-DJE9J97').value = '';

        document.getElementById('litros-modal-DHU7993').value = '';
        document.getElementById('Km-modal-DHU7993').value = '';
        document.getElementById('Preco-Km-modal-DHU7993').value = '';
        document.getElementById('Valor-Bruto-modal-DHU7993').value = '';
        swal("Secesso!", "Fechamento de mês salvo!", "success");
    }

}

// Página do histórico do fechamento do mes

function Historico() {
    if (localStorage.getItem("fechamento-mes-DJE9J97")) {
        list_DJE9J97 = JSON.parse(localStorage.getItem("fechamento-mes-DJE9J97"));
        list_DHU7993 = JSON.parse(localStorage.getItem("fechamento-mes-DHU7993"));
        for (let i=0; i < list_DJE9J97.length; i++) {
            ViewhistoricoFechaMesDJE9J97(list_DJE9J97[i]);
            ViewhistoricoFechaMesDHU7993(list_DHU7993[i]);
        }
    }
}

function ViewhistoricoFechaMesDJE9J97(object) {
    let tbody_DJE9J97 = document.getElementById('tbody-historico-fecha-mes-DJE9J97');
    let tr = document.createElement("tr");

    tr.appendChild(createTD(object.litros));
    tr.appendChild(createTD(object.km));

    let pd_preco_km = createTD(object.preco_km);
    pd_preco_km.classList.add("pd-preco-km"); 
    tr.appendChild(pd_preco_km);

    tr.appendChild(createTD(object.valor_bruto));
    tr.appendChild(createTD(object.data));
    tr.classList.add("Product_item");
    
    tbody_DJE9J97.appendChild(tr);
}

function ViewhistoricoFechaMesDHU7993(object) {
    let tbody_DHU7993 = document.getElementById('tbody-historico-fecha-mes-DHU7993');
    let tr = document.createElement("tr");

    tr.appendChild(createTD(object.litros));
    tr.appendChild(createTD(object.km));
    
    let pd_preco_km = createTD(object.preco_km);
    pd_preco_km.classList.add("pd-preco-km"); 
    tr.appendChild(pd_preco_km);

    tr.appendChild(createTD(object.valor_bruto));
    tr.appendChild(createTD(object.data));
    tr.classList.add("Product_item");

    tbody_DHU7993.appendChild(tr);
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
