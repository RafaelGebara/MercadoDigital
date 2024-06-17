const items = [
    {
        id: 0,
        nome: 'CAMISETA PACE | CHLADNI OVERSIZED',
        img: 'imagens/camiseta-pace.png',
        preco: 150.00,
        quantidade: 0,
    },
    {
        id : 1,
        nome:  'Calça High Corduroy Cargo Black',
        img: 'imagens/calça-black.png',
        preco: 250.00,
        quantidade: 0,
    },
    {
        id : 2,
        nome:  'Moletom High Company Anorak Hoodie Black',
        img: 'imagens/moletom-black.png',
        preco: 350.00,
        quantidade: 0,
    },
    {
        id : 3,
        nome:  'Boné High 5 Panel Paradise Preto',
        img: 'imagens/bone.png',
        preco: 255.00,
        quantidade: 0,
    },
    {
        id : 4,
        nome:  'Pochete High Company Resistente a Água Preto',
        img: 'imagens/bag.png',
        preco: 200.00,
        quantidade: 0,
    },
    {
        id : 5,
        nome:  'Jaqueta Sufgang Suf4',
        img: 'imagens/jacket.png',
        preco: 299.99,
        quantidade: 0,
    },
    {
        id : 6,
        nome:  'Anel High Summer',
        img: 'imagens/ring.png',
        preco: 550.00,
        quantidade: 0,
    },
    {
        id : 7,
        nome:  'Touca High Company Glitch Black',
        img: 'imagens/touca.png',
        preco: 189.00,
        quantidade: 0,
    },
    {
        id : 8,
        nome:  'CAMISETA HIGH COMPANY TEE THINK',
        img: 'imagens/camiseta-laranja.png',
        preco: 139.00,
        quantidade: 0,
    },
    {
        id : 9,
        nome:  'Meia Arabic Joker',
        img: 'imagens/meia.png',
        preco: 79.99,
        quantidade: 0,
    },
    

];
const obterItemsDoLocalStorage = () => {
    const itemsString = localStorage.getItem('items');
    return itemsString ? JSON.parse(itemsString) : [];
};

const salvarItemsNoLocalStorage = (items) => {
    localStorage.setItem('items', JSON.stringify(items));
};

let itens = obterItemsDoLocalStorage();

const inicializarLoja = () => {
    var containerProdutos = document.getElementById('produtos');
    containerProdutos.innerHTML = "";
    const isAdmin = localStorage.getItem('admin') === 'true';

    items.forEach((value, index) => {
        containerProdutos.innerHTML += `
            <div class="produto-single">
                <img src="${value.img}" />
                <p>${value.nome}</p>
                <p><strong>R$${value.preco.toFixed(2)}</strong></p>
                <a class="carrinho" key="${index}" href="#">Adicionar ao carrinho!</a>
                <br>
                ${isAdmin ? `<button id="remover-${index}" style="display:block;" onclick="removerProduto(${index})">Remover Produto</button>` : ''}
               <br>
                ${isAdmin ? `<button id="editar-${index}" style="display:block;" onclick="abrirEditarProduto(${index})">Editar</button>` : ''}
            </div>
        `;
    });
};

const atualizarCarrinho = () => {
    var containerCarrinho = document.getElementById('carrinho-items');
    containerCarrinho.innerHTML = "";
    let totalPreco = 0;
    let totalItems = 0;
    items.forEach((item, index) => {
        if (item.quantidade > 0) {
            const precoItem = item.preco * item.quantidade;
            totalPreco += precoItem;
            totalItems += item.quantidade;
            containerCarrinho.innerHTML += `
                <div class="carrinho-item">
                    <span>${item.nome} - Quantidade: ${item.quantidade} - Preço: R$ ${precoItem.toFixed(2)}</span>
                    <button onclick="removerItem(${index})">Remover</button>
                </div>
                <hr>
            `;
        }
    });

    if (totalPreco > 0) {
        containerCarrinho.innerHTML += `
            <div>Total: R$ ${totalPreco.toFixed(2)}</div>
            <button class="finalizar-compra-button" id="pagamento" onclick="finalizarCompra()">Finalizar Compra</button>
            <button class="clear-button" onclick="limparCarrinho()">Limpar Carrinho</button>
        `;
    }
};

const adicionarProduto = () => {
    const nome = document.getElementById('produto-nome').value.trim();
    const img = document.getElementById('produto-img').value.trim();
    const preco = parseFloat(document.getElementById('produto-preco').value);

    if (nome && img && !isNaN(preco)) {
        const novoProduto = {
            id: items.length,
            nome,
            img,
            preco,
            quantidade: 0
        };
        items.push(novoProduto);
        salvarItemsNoLocalStorage(items);
        inicializarLoja();
        document.getElementById('produto-nome').value = '';
        document.getElementById('produto-img').value = '';
        document.getElementById('produto-preco').value = '';
    } else {
        alert('Preencha todos os campos corretamente!');
    }
};

const removerProduto = (index) => {
    items.splice(index, 1);
    salvarItemsNoLocalStorage(items);
    inicializarLoja();
};

const removerItem = (index) => {
    items[index].quantidade = 0;
    salvarItemsNoLocalStorage(items);
    atualizarCarrinho();
};

const limparCarrinho = () => {
    items.forEach(item => item.quantidade = 0);
    salvarItemsNoLocalStorage(items);
    atualizarCarrinho();
};

document.addEventListener('DOMContentLoaded', (event) => {
    inicializarLoja();

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('carrinho')) {
            event.preventDefault();
            let key = event.target.getAttribute('key');
            items[key].quantidade++;
            salvarItemsNoLocalStorage(items);
            atualizarCarrinho();
        }
    });

    const editCatalogButton = document.getElementById('edit-catalog-button');
    const crudModal = document.getElementById('crud-modal');
    const closeCrudModal = document.getElementById('close-crud-modal');

    editCatalogButton.addEventListener('click', () => {
        crudModal.showModal();
    });

    closeCrudModal.addEventListener('click', () => {
        crudModal.close();
    });

    const isAdmin = localStorage.getItem('admin') === 'true';
    const editButton = document.querySelector("#edit-catalog-button");
    const logoutButton = document.querySelector("#logout-button");

    if (isAdmin) {
        editButton.style.display = "block";
        logoutButton.style.display = "block";
    }
});

const paymentModal = document.getElementById('modal-pagamento');

function finalizarCompra() {
    const produtosPagamento = document.getElementById('produtos-pagamento');
    produtosPagamento.innerHTML = "";

    items.forEach(item => {
        if (item.quantidade > 0) {
            produtosPagamento.innerHTML += `
                <div>
                    <span>${item.nome} - Quantidade: ${item.quantidade} - Preço: R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
                <hr>
            `;
        }
    });
    paymentModal.showModal();
}

function Fechar() {
    paymentModal.close();
}

function logout() {
    localStorage.removeItem('admin');
    window.location.href = 'index.html';
}
const abrirEditarProduto = (index) => {
    const produto = items[index];
    document.getElementById('editar-produto-index').value = index;
    document.getElementById('editar-produto-nome').value = produto.nome;
    document.getElementById('editar-produto-img').value = produto.img;
    document.getElementById('editar-produto-preco').value = produto.preco;
    const editModal = document.getElementById('edit-modal');
    editModal.showModal();
};

const salvarEdicaoProduto = () => {
    const index = document.getElementById('editar-produto-index').value;
    const nome = document.getElementById('editar-produto-nome').value.trim();
    const img = document.getElementById('editar-produto-img').value.trim();
    const preco = parseFloat(document.getElementById('editar-produto-preco').value);

    if (nome && img && !isNaN(preco)) {
        items[index].nome = nome;
        items[index].img = img;
        items[index].preco = preco;
        salvarItemsNoLocalStorage(items);
        inicializarLoja();
        const editModal = document.getElementById('edit-modal');
        editModal.close();
    } else {
        alert('Preencha todos os campos corretamente!');
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    const closeEditModal = document.getElementById('close-edit-modal');

    closeEditModal.addEventListener('click', () => {
        const editModal = document.getElementById('edit-modal');
        editModal.close();
    });
});
