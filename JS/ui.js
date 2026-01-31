// 1. SELEÇÃO DE ELEMENTOS
const vitrine = document.getElementById('vitrine-produtos');
const campoBusca = document.getElementById('campoBusca');
const header = document.getElementById('main-header');
const btnAbrirCarrinho = document.getElementById('abrirCarrinho');
const btnFecharCarrinho = document.getElementById('fecharCarrinho');
const menuCarrinho = document.getElementById('carrinhoLateral');
const overlay = document.getElementById('overlay');

// 2. FUNÇÃO PARA EXIBIR OS PRODUTOS
// Esta função aceita uma lista (para podermos usar no filtro depois)
function exibirProdutos(lista) {
    vitrine.innerHTML = ""; // Limpa a vitrine antes de renderizar

    lista.forEach(produto => {
        vitrine.innerHTML += `
            <div class="card-produto">
                <img src="${produto.img}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
            </div>
        `;
    });
}

// 3. LÓGICA DE BUSCA (FILTRO)
campoBusca.addEventListener('input', () => {
    const termo = campoBusca.value.toLowerCase();
    const filtrados = listaProdutos.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.categoria.toLowerCase().includes(termo)
    );
    exibirProdutos(filtrados);
});

// 4. EFEITO DE SCROLL NO HEADER
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('rolagem');
    } else {
        header.classList.remove('rolagem');
    }
});

// 5. CONTROLE DO MENU LATERAL (ABRIR/FECHAR)
function toggleCarrinho() {
    menuCarrinho.classList.toggle('aberto');
    overlay.classList.toggle('ativo');
}

btnAbrirCarrinho.addEventListener('click', toggleCarrinho);
btnFecharCarrinho.addEventListener('click', toggleCarrinho);
overlay.addEventListener('click', toggleCarrinho);

// 6. INICIALIZAÇÃO
// Quando o site abre, mostramos todos os produtos
exibirProdutos(listaProdutos);

function filtrarPorCategoria(categoria) {
    if (categoria === 'todos') {
        exibirProdutos(listaProdutos);
    } else {
        const filtrados = listaProdutos.filter(p => p.categoria === categoria);
        exibirProdutos(filtrados);
    }
}

// Seleciona todos os botões da navbar
const botoesCategoria = document.querySelectorAll('.nav-btn');

botoesCategoria.forEach(botao => {
    botao.addEventListener('click', (e) => {
        // 1. Remove a classe 'ativo' de todos e adiciona no clicado
        botoesCategoria.forEach(btn => btn.classList.remove('ativo'));
        e.target.classList.add('ativo');

        // 2. Pega o valor do filtro (ex: 'aneis', 'lancamento')
        const filtro = e.target.getAttribute('data-filter');

        // 3. Executa a filtragem
        if (filtro === 'todos') {
            exibirProdutos(listaProdutos);
        } else {
            const filtrados = listaProdutos.filter(produto => {
                // Verifica se é a categoria principal OU se está nas tags (lancamento/presente)
                return produto.categoria === filtro || produto.tags.includes(filtro);
            });
            exibirProdutos(filtrados);
        }
    });
});