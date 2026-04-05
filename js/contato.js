document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contato');
    
    // Gerar Código de Pedido/Protocolo automático
    const gerarProtocolo = () => {
        const data = new Date();
        const random = Math.floor(1000 + Math.random() * 9000);
        return `KT-${data.getFullYear()}${(data.getMonth()+1)}-${random}`;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const protocolo = gerarProtocolo();
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const tipoEvento = document.getElementById('tipo-evento').value;
        const dataEvento = document.getElementById('data-evento').value;
        const mensagem = document.getElementById('mensagem').value;

        // Captura itens do checklist
        let itens = [];
        document.querySelectorAll('input[name="item"]:checked').forEach((item) => {
            itens.push(item.value);
        });

        // Montagem do texto para o WhatsApp
        const texto = `*NOVO PEDIDO DE ORÇAMENTO*
-------------------------------
*Protocolo:* ${protocolo}
*Cliente:* ${nome} ${sobrenome}
*WhatsApp:* ${celular}
*E-mail:* ${email}

*Tipo de Evento:* ${tipoEvento}
*Data:* ${dataEvento}
*Necessidades:* ${itens.length > 0 ? itens.join(', ') : 'Não especificado'}

*Observações:* ${mensagem}
-------------------------------`;

        const msgFormatada = encodeURIComponent(texto);
        const urlWhatsapp = `https://api.whatsapp.com/send?phone=5521995805279&text=${msgFormatada}`;

        // Redireciona
        window.open(urlWhatsapp, '_blank');
    });
});
