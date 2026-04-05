document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Verifica se os elementos existem na página atual antes de prosseguir
    if (menuToggle && navMenu) {
        
        // 1. Abrir/Fechar ao clicar no botão
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        // 2. Fechar ao clicar fora (Click Outside)
        document.addEventListener('click', (e) => {
            // Se o menu estiver aberto E o clique NÃO for dentro do menu E NÃO for no botão
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        // 3. Fechar ao clicar em um link (útil para links de âncora na mesma página)
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});
