let Product = {
    id: 0,
    nome: "",
    valor: 0,
    qtd: 0,
    parcelas: 0
};

let list_Product = [];
// localStorage.clear()

// é responsável pro imprimir os produtos, caso tenha
if (localStorage.getItem("C1_armazem")) {
    list_Product = JSON.parse(localStorage.getItem("C1_armazem"));

    for (let i=0; i < list_Product.length; i++) {
        let objectProduct = list_Product[i];
        View_Products(objectProduct);

    }
}

function createTableCell(content) {
    let td = document.createElement("td");
    let textNode = document.createTextNode(content);
    td.appendChild(textNode);
    return td;
}

function View_Products(objectProduct) {
    let tr = document.createElement("tr");
    
    tr.appendChild(createTableCell(objectProduct.nome));
    tr.appendChild(createTableCell(objectProduct.valor));
    tr.appendChild(createTableCell(objectProduct.qtd));
    tr.appendChild(createTableCell(objectProduct.parcelas));
    tr.classList.add("Product_item")
    
    let conteudo = document.createTextNode("Alterar")
    let button = document.createElement("button");
    // button.classList.add(`${objectProduct.id}`);
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
    
    // Verificar se a chave "C1_armazem" existe no localStorage
    if (localStorage.getItem("C1_armazem")) {
        // Se existir, obter a lista de produtos do localStorage
        list_Product = JSON.parse(localStorage.getItem("C1_armazem"));

        let i;
        for (i=0; i < list_Product.length; i++);
        let objectProduct = list_Product[i-1];
        let id = objectProduct.id + 1;
        Product.id = id;
    }

    // Adicionar o novo produto à lista
    list_Product.push(Product);

    // Armazenar a lista atualizada no localStorage
    localStorage.setItem("C1_armazem", JSON.stringify(list_Product));
    
    // Recarregar a página
    window.location.reload();
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



// Change Modal 
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}

// Fechar mês Modal
const closeModalButtonFechaMes = document.querySelector("#close-modal");
const modalFechaMes = document.querySelector("#modal-fecha-mes");
const fadeFechaMes = document.querySelector("#fade-fecha-mes");

const toggleModalFechaMes = () => {
    modalFechaMes.classList.toggle("hide");
    fadeFechaMes.classList.toggle("hide");
}