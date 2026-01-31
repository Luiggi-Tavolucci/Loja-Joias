// 1. INICIALIZAÇÃO DO CARRINHO
// Tenta buscar dados salvos ou começa com uma lista vazia
let carrinho = JSON.parse(localStorage.getItem('carrinhoJoias')) || [];

// 2. FUNÇÃO PARA ADICIONAR
function adicionarAoCarrinho(id) {
    const produto = listaProdutos.find(p => p.id === id);
    
    if (produto) {
        carrinho.push(produto);
        salvarERenderizar();
        
        // Pequeno feedback visual (opcional)
        alert(`${produto.nome} adicionado com sucesso!`);
    }
}

// 3. FUNÇÃO PARA REMOVER
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarERenderizar();
}

// 4. SALVAR NO LOCALSTORAGE E ATUALIZAR TELA
function salvarERenderizar() {
    // Salva a lista atualizada no navegador
    localStorage.setItem('carrinhoJoias', JSON.stringify(carrinho));
    
    // Atualiza os elementos da interface
    renderizarItensCarrinho();
    atualizarContador();
}

// 5. DESENHAR OS ITENS NO MENU LATERAL
function renderizarItensCarrinho() {
    const container = document.getElementById('itens-carrinho');
    const totalDisplay = document.getElementById('valor-total');
    let total = 0;

    container.innerHTML = "";

    carrinho.forEach((item, index) => {
        total += item.preco;
        container.innerHTML += `
            <div class="item-carrinho" style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <img src="${item.img}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px;">
                <div style="flex-grow: 1;">
                    <h4 style="font-size: 0.9rem;">${item.nome}</h4>
                    <p style="color: var(--ouro-escuro); font-weight: 600;">R$ ${item.preco.toFixed(2)}</p>
                </div>
                <button onclick="removerDoCarrinho(${index})" style="background: none; border: none; cursor: pointer; font-size: 1.2rem;">&times;</button>
            </div>
        `;
    });

    totalDisplay.innerText = total.toLocaleString('pt-br', {minimumFractionDigits: 2});
}

// 6. ATUALIZAR O NÚMERO NO ÍCONE DO HEADER
function atualizarContador() {
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
        contador.innerText = carrinho.length;
    }
}

// Executa ao carregar a página para mostrar o que já estava salvo
document.addEventListener('DOMContentLoaded', () => {
    renderizarItensCarrinho();
    atualizarContador();
});