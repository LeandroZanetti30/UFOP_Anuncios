# Arquitetura do Sistema — UFOP Anúncios

## 1. Visão Geral

O sistema UFOP Anúncios é uma plataforma web para compra e venda de itens usados entre estudantes universitários. A arquitetura segue o modelo **BaaS (Backend as a Service)**: o frontend gerencia toda a lógica de apresentação e regras de negócio no lado do cliente, enquanto o Firebase fornece autenticação e banco de dados sem necessidade de um servidor próprio.

---

## 2. Componentes do Sistema

### 2.1 Frontend — Next.js 16

Camada de interface com a qual o usuário interage diretamente.

#### Páginas (App Router)

| Rota | Função |
|---|---|
| `/` | Home com listagem de anúncios e barra de busca |
| `/login` | Autenticação com email e senha |
| `/cadastro` | Criação de nova conta |
| `/anunciar` | Formulário para publicar novo anúncio (protegida) |
| `/anuncio/[id]` | Detalhe do anúncio com opções de editar/remover para o dono |
| `/anuncio/[id]/editar` | Formulário de edição do anúncio (protegida) |
| `/buscar` | Resultados de busca por título, descrição ou categoria |

#### Componentes

| Componente | Função |
|---|---|
| `SiteHeader` | Navegação principal; exibe "Entrar/Cadastrar" ou nome do usuário + "Sair" conforme o estado de autenticação |
| `SiteFooter` | Rodapé do site |
| `ListingsGrid` | Grade de cards com todos os anúncios cadastrados |
| `ProductCard` | Card individual de um anúncio com imagem, título, preço e cidade |

#### Módulos de Lógica (`app/lib/`)

| Arquivo | Função |
|---|---|
| `firebase.ts` | Inicializa a conexão com o Firebase usando variáveis de ambiente; exporta `auth` e `db` |
| `auth-context.tsx` | Contexto React global (`AuthProvider` + `useAuth()`); monitora em tempo real o estado de autenticação via `onAuthStateChanged` |
| `products.ts` | Camada de acesso a dados; contém todas as operações com o Firestore: `getAllProducts`, `getProduct`, `saveProduct`, `updateProduct` e `deleteProduct` |

---

### 2.2 Backend — Firebase (BaaS)

#### Firebase Authentication

Responsável pelo controle de identidade dos usuários:

- Cadastro e login com email e senha
- Geração e validação de tokens JWT
- Manutenção da sessão do usuário no navegador
- Armazenamento do nome (`displayName`) no perfil

#### Firestore Database

Banco de dados NoSQL orientado a documentos. Os anúncios são armazenados na coleção `products`, com os seguintes campos por documento:

| Campo | Tipo | Descrição |
|---|---|---|
| `title` | string | Título do anúncio |
| `category` | string | Categoria do produto |
| `description` | string | Descrição detalhada |
| `condition` | string | Estado de conservação |
| `price` | number | Preço em reais |
| `contact` | string | Contato do anunciante |
| `city` | string | Cidade |
| `images` | array | Fotos em formato base64 |
| `userId` | string | ID do usuário dono do anúncio |
| `userEmail` | string | Email do anunciante |
| `createdAt` | timestamp | Data de publicação |

---

## 3. Comunicação entre Componentes

- O frontend se comunica com o Firebase exclusivamente via **SDK oficial do Firebase** (`firebase/auth` e `firebase/firestore`), sem chamadas REST manuais.
- O `AuthProvider` envolve o app inteiro no `layout.tsx`, garantindo que o estado de autenticação esteja disponível em todas as páginas via `useAuth()`.
- Páginas protegidas (`/anunciar`, `/anuncio/[id]/editar`) verificam o usuário logado e redirecionam para `/login` caso não haja sessão ativa.
- A busca é realizada no **lado do cliente**: todos os produtos são buscados do Firestore e filtrados localmente por título, descrição e categoria.
- O controle de permissão de edição/remoção é feito comparando o `userId` do anúncio com o `uid` do usuário autenticado.

---

## 4. Fluxo de Dados

```
Usuário (Navegador)
       │
       ▼
  Next.js (Frontend)
  ├── Páginas e Componentes (React)
  ├── auth-context.tsx  ──────────────►  Firebase Authentication
  └── products.ts       ──────────────►  Firestore Database
```

**Fluxo de autenticação:**
1. Usuário preenche email e senha na página `/login`
2. `signInWithEmailAndPassword` envia credenciais ao Firebase Auth
3. Firebase retorna token JWT e persiste a sessão
4. `onAuthStateChanged` no `AuthProvider` detecta o login e atualiza o estado global
5. Header e páginas reagem ao novo estado

**Fluxo de publicação de anúncio:**
1. Usuário acessa `/anunciar` (redirecionado para login se não autenticado)
2. Preenche o formulário e envia
3. `saveProduct()` chama `addDoc()` no Firestore com os dados + `userId` do usuário logado
4. Firestore salva o documento e retorna o ID gerado
5. Usuário é redirecionado para a página do anúncio criado

---

## 5. Tecnologias Utilizadas

| Categoria | Tecnologia | Versão |
|---|---|---|
| Linguagem | TypeScript | 5.x |
| Framework | Next.js | 16.2 |
| Biblioteca UI | React | 19.x |
| Estilização | Tailwind CSS | 4.x |
| Autenticação | Firebase Authentication | 12.x |
| Banco de Dados | Firebase Firestore | 12.x |
| SDK Firebase | Firebase JS SDK | 12.x |
| Gerenciador de pacotes | npm | — |
| Controle de versão | Git + GitHub | — |
