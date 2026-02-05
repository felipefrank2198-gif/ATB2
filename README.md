# Guia ATB — SaaS (Next.js + NextAuth + Stripe)

Projeto pronto para deploy (Vercel/Netlify) com:
- Landing + Pricing + FAQ (público)
- App logado (demo + premium)
- Paywall **Stripe only**
- Busca global (Fuse.js)
- Checklist de cobertura
- PWA (next-pwa)

> **Fonte clínica**: `data/guide.private.json` e `data/guide.public.json` foram gerados a partir do PDF `GUIA ATB - FINAL 2.pdf`.  
> **Regra**: não inventar/omitir condutas — manter fidelidade ao texto do guia.

---

## 1) Rodar local

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Acesse:
- http://localhost:3000 (landing)
- http://localhost:3000/app (app)
- http://localhost:3000/app/coverage (checklist)

---

## 2) Configurar login (Magic Link)

No `.env`:
- `EMAIL_SERVER` (SMTP)
- `EMAIL_FROM`

NextAuth usa provider de e-mail (sem senha).

---

## 3) Configurar Stripe (assinatura)

No Stripe, crie 2 preços (mensal/anual) e coloque no `.env`:
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_MONTHLY`
- `STRIPE_PRICE_YEARLY`
- `STRIPE_WEBHOOK_SECRET`

### Webhook
Crie endpoint:  
`/api/stripe/webhook`

Eventos necessários:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

---

## 4) Deploy

### Vercel
- Importar repo
- Setar variáveis de ambiente (.env)
- Build command: `npm run build`
- Output: default (Next.js)

### Banco
Por padrão é SQLite (bom para MVP). Para produção, troque datasource para Postgres e ajuste `DATABASE_URL`.

---

## 5) Onde fica o conteúdo do guia

- **Premium**: `data/guide.private.json` (server-only; servido apenas via API com assinatura ativa)
- **Demo**: `data/guide.public.json` (mesmos nós, mas `rawText=null` quando premium)

O endpoint `/api/guide/node` entrega:
- demo: libera `rawText`
- premium: exige login + assinatura ativa

---

## 6) Observações (Compliance)

- O app exibe disclaimers e reforça checagens (alergias, função renal/hepática, gestação, interações, resistência local).
- Se houver ambiguidade no texto do guia: sinalizar como **“conferir no guia”**.

---

## 7) Próximos upgrades (se quiser)

- Melhorar parsing do PDF para separar seções internas (Patógenos / Tratamento / Falha etc.) em blocos estruturados.
- Adicionar “Favoritos” e “Recentes” persistidos no banco.
- Adicionar “Imprimir” com layout dedicado (print CSS já incluído).
- Adicionar Termos/Privacidade e telas institucionais.
