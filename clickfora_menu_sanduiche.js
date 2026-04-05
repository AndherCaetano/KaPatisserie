document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav-list');

    // Garantimos que o código só rode se os elementos existirem na página atual
    if (btn && nav) {
        
        // FUNÇÃO 1: Abre e Fecha ao clicar no botão (Substitui o antigo btn.onclick)
        btn.addEventListener('click', (e) => {
            // e.stopPropagation impede que o clique no botão 
            // seja interpretado como um "clique fora" pelo document imediatamente
            e.stopPropagation(); 
            nav.classList.toggle('active');
        });

        // FUNÇÃO 2: Fecha ao clicar em qualquer lugar fora (Click Outside)
        document.addEventListener('click', (e) => {
            const clicouDentroDoMenu = nav.contains(e.target);
            const clicouNoBotao = btn.contains(e.target);
            const menuEstaAberto = nav.classList.contains('active');

            // Se o menu estiver aberto e o clique não foi nele nem no botão, ele fecha
            if (!clicouDentroDoMenu && !clicouNoBotao && menuEstaAberto) {
                nav.classList.remove('active');
            }
        });

        // FUNÇÃO 3: Fecha ao clicar em qualquer link dentro do menu
        const links = nav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }
});
