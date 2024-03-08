import { createHmac } from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Seu segredo compartilhado
    const secret = 'f3v3bIbhQKuza4tyPpHBToXG';

    // Obter o valor do cabeçalho x-vercel-signature da requisição
    const signature = req.headers['x-vercel-signature'];

    // Gerar a assinatura esperada a partir do corpo da requisição
    const expectedSignature = createHmac('sha256', secret)
                              .update(JSON.stringify(req.body))
                              .digest('hex');

    // Verificar se a assinatura esperada corresponde à assinatura recebida
    if (signature !== expectedSignature) {
      return res.status(401).json({ message: 'Assinatura inválida' });
    }

    // Supondo que o corpo da requisição tem um campo 'type' para indicar o tipo do evento
    const event = req.body;

    // Aqui você pode tratar diferentes tipos de eventos
    switch (event.type) {
      case 'deployment.created':
        console.log('Deployment Created:', event);
        break;
      case 'deployment.error':
        console.log('Deployment Error:', event);
        break;
      // Adicione casos para outros eventos conforme necessário
      default:
        console.log('Outro evento:', event);
    }

    res.status(200).json({ message: 'Evento recebido e verificado' });
  } else {
    // Método não permitido
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
