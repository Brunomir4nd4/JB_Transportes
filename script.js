let Product = {
    id: 0,
    nome: "",
    valor: 0,
    qtd: 0,
    parcelas: 0
};

let list_Product = [];
// localStorage.clear()


function create_Product() {
    Product.nome = document.getElementById("nome").value;
    Product.valor = document.getElementById("valor").value;
    Product.qtd = document.getElementById("qtd").value;
    Product.parcelas = document.getElementById("parcelas").value;
    
    // Verificar se a chave "C1_armazem" existe no localStorage
    if (localStorage.getItem("C1_armazem")) {
        // Se existir, obter a lista de produtos do localStorage
        list_Product = JSON.parse(localStorage.getItem("C1_armazem"));
        let id = list_Product.length;
        Product.id = id;
    }

    // Adicionar o novo produto à lista
    list_Product.push(Product);

    // Armazenar a lista atualizada no localStorage
    localStorage.setItem("C1_armazem", JSON.stringify(list_Product));
    
    // Recarregar a página
    window.location.reload();
}

function View_Products(nome, valor, qtd, parcelas) {
    let tr = document.createElement("tr");
    
    tr.appendChild(createTableCell(nome));
    tr.appendChild(createTableCell(valor));
    tr.appendChild(createTableCell(qtd));
    tr.appendChild(createTableCell(parcelas));
    tr.classList.add("Product_item")
    
    let conteudo = document.createTextNode("Alterar")
    let button = document.createElement("button");

    // Abrindo modal
    button.addEventListener("click", () => toggleModal())
    button.appendChild(conteudo)

    let td1 = document.createElement("td");
    td1.classList.add("changeButton");
    td1.appendChild(button);
    
    tr.appendChild(td1);
    
    
    let tbody = document.getElementById("tbody");
    tbody.appendChild(tr);
}

function createTableCell(content) {
    let td = document.createElement("td");
    let textNode = document.createTextNode(content);
    td.appendChild(textNode);
    return td;
}

// é responsável pro imprimir os produtos, caso tenha
if (localStorage.getItem("C1_armazem")) {
    list_Product = JSON.parse(localStorage.getItem("C1_armazem"));

    for (let i=0; i < list_Product.length; i++) {
        let objectProduct = list_Product[i];
        View_Products(objectProduct.nome, objectProduct.valor, objectProduct.qtd, objectProduct.parcelas);

    }
}


// Change Modal 
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = (nome, valor, qtd, parcelas) => {
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