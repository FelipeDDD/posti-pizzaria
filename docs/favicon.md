# Favicon

Placeholder baseado em `public/images/logo/Logo-Branco-Sombra-sem-fundo.png`,
com apenas o chef e a pizza, sem tipografia nem sombra externa.
Criado com a ferramenta integrada de geração/edição de imagens; não foi usada a API via CLI.
O resultado foi convertido para os tamanhos abaixo, preservando a transparência.

## Arquivos

- `public/favicon-96.png`: PNG de 96 × 96 pixels.
- `public/favicon-512.png`: PNG de 512 × 512 pixels.
- `public/apple-touch-icon.png`: PNG de 180 × 180 pixels.
- `public/favicon.ico`: ICO com imagens de 16, 32 e 48 pixels.

O `index.html` declara os ícones no `<head>`. A configuração do Vercel encaminha
`/favicon.ico` para `/public/favicon.ico`, mantendo os arquivos no conjunto
`public/**/*` já incluído na publicação.

As alterações precisam ser publicadas para serem acessíveis ao Google.
O ícone quadrado e os endereços estáveis seguem a
[orientação do Google](https://developers.google.com/search/docs/appearance/favicon-in-search).
A exibição depende de um novo rastreamento e não é garantida.

## Prompt utilizado

```text
Edit the supplied Parma d'Oro logo into a website favicon asset. Use case: precise-object-edit. Preserve ONLY the existing top illustration: the semicircular golden yellow pizza, orange toppings, central smiling moustached chef face, white chef hat, and tiny bow tie, with their original charcoal outlines and original shapes and colors. Remove ALL typography completely: no Parma d'Oro, no Pizzaria, no letters. Remove the grey/black outer drop shadow and all shadow halos, keeping the crisp dark outlines that define the illustration. Do not invent a new logo. Center the isolated existing chef-and-pizza illustration in a square 1024x1024 transparent canvas with balanced modest padding, as large as possible while keeping the full illustration visible. Flat clean brand artwork, crisp smooth edges, fully opaque white chef hat and fully opaque light cream pizza interior, genuine transparency only outside the illustration, no background rectangle, no gradients, no mockup, no watermark. Final icon must remain recognizable at 32 and 48 pixel sizes.
```
