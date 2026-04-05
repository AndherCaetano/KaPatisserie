document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav-list');

    if (btn && nav) {
        // Abre e fecha o menu ao clicar no botão hambúrguer
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // ESSENCIAL: impede que o 'document' receba o clique agora
            nav.classList.toggle('active');
        });

        // Fecha o menu ao clicar em qualquer lugar fora dele
        document.addEventListener('click', (e) => {
            const clicouNoMenu = nav.contains(e.target);
            const clicouNoBotao = btn.contains(e.target);
            const menuAberto = nav.classList.contains('active');

            // Se o menu está aberto e o clique não foi no menu nem no botão: FECHA
            if (!clicouNoMenu && !clicouNoBotao && menuAberto) {
                nav.classList.remove('active');
            }
        });

        // Impede que cliques dentro da lista do menu fechem o menu (opcional)
        nav.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Fecha o menu se o usuário clicar em um link (navegação)
        const links = nav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }
});
