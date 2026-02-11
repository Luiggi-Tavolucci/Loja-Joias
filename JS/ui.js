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


// Seleciona TODOS os botões que tenham o atributo data-filter
// (Tanto os do menu principal quanto os dos submenus)
const botoesFiltro = document.querySelectorAll('button[data-filter]');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', (e) => {
        // Remove a classe 'ativo' de todos para limpar o visual
        botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
        
        // Adiciona visual de ativo apenas no clicado (opcional)
        e.target.classList.add('ativo');

        // Pega o valor do filtro
        const filtro = botao.getAttribute('data-filter');
        console.log("Filtro Clicado:", filtro);

        let produtosFiltrados = [];

        // CASO 1: Mostrar Tudo
        if (filtro === 'todos') {
            produtosFiltrados = listaProdutos;
        }
        
        // CASO 2: Mais Vendidas (Ex: best-aneis)
        else if (filtro.startsWith('best-')) {
            const categoriaAlvo = filtro.split('-')[1]; // pega 'aneis'
            produtosFiltrados = listaProdutos.filter(p => 
                p.tags.includes('best') && p.categoria === categoriaAlvo
            );
        }
        
        // CASO 3: Subcategorias Específicas (Ex: aneis-ajustaveis)
        else if (filtro.includes('-')) {
            // Se tem hífen, mas não é 'best', assumimos que é Categoria-Subcategoria
            // Ex: brincos-argolas -> categoria: brincos, subcategoria: argolas
            const partes = filtro.split('-');
            const cat = partes[0];
            const sub = partes[1];
            
            produtosFiltrados = listaProdutos.filter(p => 
                p.categoria === cat && p.subcategoria === sub
            );
        }
        
        // CASO 4: Categorias Simples (Ex: aneis, colares)
        else {
            produtosFiltrados = listaProdutos.filter(p => 
                p.categoria === filtro || p.tags.includes(filtro)
            );
        }

        exibirProdutos(produtosFiltrados);
    });
});