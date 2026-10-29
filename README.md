# Felipe França — Treino por frequência cardíaca

Site institucional em HTML/CSS/JS estático para o coach **Felipe França**, em português do Brasil.
Baseado no template "Threshold" (clone standalone), adaptado com:

- Toda a copy em pt-BR, com exemplos brasileiros (R$, endereço em São Paulo, nomes, horários no formato 18h30).
- Acento em amarelo-alaranjado (`#FFA41C`) no lugar do vermelho original; tinta clara `#FFE7BF`.
- Fotografia nova (Magnific), focada em academia, com ~70% de mulheres, closes de corpo definido e bebidas detox.
- Wordmark "Felipe" (pequeno) + "França" (grande) no menu e no rodapé.
- URLs limpas em português (`/aulas`, `/treinadores`, `/planos`, `/estudio`, `/blog`, `/visite`, `/horarios`).

## Estrutura
```
index.html                 # Home com a semana em zonas
horarios.html              # Grade de horários
aulas.html                 # Todas as aulas
aulas/                     # circuito-de-forca, motor-remo-e-bike, intervalado-limiar,
                           # mobilidade-e-respiracao, max-saco-e-treno, clube-de-corrida
treinadores.html           # Equipe
treinadores/               # felipe-franca, bruna-tavares, camila-nogueira, larissa-monteiro
planos.html                # Planos e preços
estudio.html               # O estúdio
blog.html                  # Artigos
blog/                      # zona-2, detox-de-verdade, teste-de-rampa, excesso-de-treino
visite.html                # Como chegar e contato
legal/                     # privacidade, termos (textos de exemplo, revisar com a LGPD)
404.html
assets/                    # fonts, images, js/interactions.js
.htaccess                  # URLs limpas, HTTPS, cache (Hostinger / LiteSpeed)
```

## Dados de exemplo para trocar
Endereço (Rua Wisard, 250), telefone `(11) 99876-0182`, e-mail `contato@felipefranca.com.br`,
preços (R$ 59 / R$ 389 / R$ 499), nomes dos demais treinadores e alunos, links de Instagram/Strava/YouTube
e o domínio no `sitemap.xml`, `llms.txt`, `robots.txt` e nas tags `canonical`/`og:url`.
