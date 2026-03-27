# Copilot Instructions — PokeMMO Builder

> **Estrutura deste arquivo**
>
> | Categoria | Seções | Para quê |
> |---|---|---|
> | ��� **[Essencial](#-essencial)** | Project Overview, Agent Context | Lido automaticamente pelos agentes. Atualizar sempre que o projeto evoluir. |
> | ��� **[Extra](#-extra)** | Environment, Setup, Structure, Workflows... | Contexto específico do projeto: variáveis, comandos, padrões de código. |

---

## ��� Essencial

### Project Overview

**PokeMMO Builder** é um team builder web para o jogo PokeMMO. Permite que jogadores montem, salvem e compartilhem seus times de Pokémon, com base nos dados do jogo consumidos da API externa [pokemmohub.com](https://pokemmohub.com). Os times, favoritos e dados de usuário são persistidos no Supabase.

**Architecture:**
- **Frontend:** Next.js (App Router, React 19, TypeScript 5, Tailwind CSS 3)
- **Backend:** Next.js Route Handlers / Server Actions (Node.js) + Supabase
- **Banco de Dados / Auth:** Supabase (PostgreSQL + Auth)
- **Fonte de Dados do Jogo:** API externa pokemmohub.com — Pokédex, moves, abilities, itens, estatísticas
- **Data Flow:** UI (React) → Server Actions / Route Handlers → Supabase DB e UI → pokemmohub.com API → tratamento → Supabase (cache/persistência)

---

### Agent Context

#### Stack
| Camada | Tecnologia | Versão | Observação |
|---|---|---|---|
| Frontend Framework | Next.js (App Router) | latest | Usar app/ dir, Server Components por padrão |
| UI Library | shadcn/ui + Radix UI | — | Componentes gerados em components/ui/ |
| Linguagem | TypeScript | ^5 | Strict mode |
| Estilização | Tailwind CSS | ^3.4 | Config em tailwind.config.ts |
| Ícones | lucide-react | ^0.511 | — |
| Temas | next-themes | ^0.4 | Dark/light mode |
| Banco de Dados | Supabase (PostgreSQL) | latest | Clientes em lib/supabase/ |
| Autenticação | Supabase Auth + @supabase/ssr | latest | Middleware + cookies |
| Fonte de Dados Pokémon | pokemmohub.com (API externa) | — | Pokédex, moves, items, abilities |
| Linting | ESLint (eslint-config-next) | ^9 | Config em eslint.config.mjs |
| Gerenciador de Pacotes | yarn | — | Usar yarn (não npm/pnpm) |
| Infraestrutura / Deploy | — | — | A definir |

#### Domínio do Projeto

Os dados do jogo PokeMMO **não são armazenados diretamente** — são consumidos em runtime da API do pokemmohub.com. O Supabase armazena apenas:
- Usuários e perfis
- Times customizados criados pelos usuários (referenciando IDs de Pokémon do pokemmohub)
- Times e Pokémon favoritados
- Configurações e preferências do usuário

#### Estrutura de Diretórios
```
pokemmo-builder/
  app/                    ← Rotas Next.js (App Router)
    auth/                 ← Páginas e rotas de autenticação (login, sign-up, etc.)
    box/            ← Rotas que exigem autenticação
    layout.tsx            ← Layout raiz
    page.tsx              ← Home pública
  components/             ← Componentes React reutilizáveis
    ui/                   ← Componentes shadcn/ui (NÃO editar manualmente)
  lib/
    supabase/             ← Clientes Supabase (client.ts, server.ts, proxy.ts)
    pokemmohub/           ← (a criar) Serviços de integração com pokemmohub.com
    utils.ts              ← Utilitários (cn, etc.)
  .copilot/
    context/              ← Contextos temporários entre agentes da pipeline
  .github/
    copilot-instructions.md ← Este arquivo
```

#### Restrições
- NÃO commitar .env ou .env.local
- SEMPRE usar <Image> do Next.js ao invés de <img>
- NÃO editar manualmente arquivos dentro de components/ui/ — usar CLI do shadcn (npx shadcn@latest add)
- SEMPRE usar o cliente Supabase correto: lib/supabase/server.ts em Server Components/Actions, lib/supabase/client.ts em Client Components
- Dados de Pokémon (stats, moves, abilities, itens) vêm do pokemmohub.com — não duplicar no banco
- Encapsular chamadas ao pokemmohub.com em lib/pokemmohub/, nunca inline em componentes
- Usar yarn como gerenciador de pacotes

---

## ��� Extra

### Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | URL do projeto Supabase | Sim |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Chave anon pública do Supabase | Sim |
| POKEMMOHUB_API_BASE_URL | Base URL da API do pokemmohub.com | A definir |

### Padrão de Data Fetching

- **Server Components:** buscar dados diretamente via lib/supabase/server.ts ou fetch com cache
- **Client Components:** usar lib/supabase/client.ts para dados reativos/realtime
- **Dados do pokemmohub.com:** encapsular chamadas em lib/pokemmohub/ (a criar), nunca inline em componentes
- **Mutações:** usar Server Actions para criar/editar/deletar times e favoritar

### Setup do Ambiente de Desenvolvimento

```bash
# Instalar dependências
yarn install

# Rodar em desenvolvimento
yarn dev

# Build de produção
yarn build

# Lint
yarn lint
```

#### Arquivos de configuração críticos

| Arquivo | Função |
|---|---|
| next.config.ts | Configuração do Next.js |
| tailwind.config.ts | Configuração do Tailwind |
| lib/supabase/server.ts | Cliente Supabase para Server Components/Actions |
| lib/supabase/client.ts | Cliente Supabase para Client Components |
| components.json | Configuração do shadcn/ui |

### Key Integration Points

- **Autenticação:** gerenciada pelo Supabase Auth via @supabase/ssr com middleware de cookies
- **Dados do jogo:** consumidos da API pública do pokemmohub.com (Pokédex, moves, abilities, itens)
- **Persistência do usuário:** times, favoritos e preferências salvos no Supabase (tabelas a definir)
- **Referências cruzadas:** times salvos no Supabase referenciam IDs de Pokémon do pokemmohub

### Development Workflows

#### Adicionando uma nova página autenticada
1. Criar o arquivo em app/box/[feature]/page.tsx
2. A rota herda automaticamente o layout protegido de app/box/layout.tsx
3. Usar lib/supabase/server.ts para buscar dados no servidor

#### Adicionando um componente shadcn/ui
1. Rodar npx shadcn@latest add [component]
2. O componente é gerado automaticamente em components/ui/

#### Integrando dados do pokemmohub.com
1. Criar o serviço de fetch em lib/pokemmohub/ (ex: lib/pokemmohub/pokedex.ts)
2. Tipar a resposta com interfaces em lib/pokemmohub/types.ts
3. Consumir via Server Component ou Route Handler

### Common Pitfalls

1. **Usar cliente Supabase errado** — client.ts só funciona em 'use client'; server.ts só no servidor
2. **Editar components/ui/ manualmente** — sempre regenerar via CLI do shadcn
3. **Chamar API do pokemmohub inline em componentes** — encapsular em lib/pokemmohub/
4. **Usar npm ou pnpm** — o projeto usa yarn

### Deployment Notes

- A definir conforme o projeto evoluir
