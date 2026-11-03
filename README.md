# 🎭 Playwright QA Automation — UI & API Testing

[![Playwright](https://img.shields.io/badge/Playwright-Automation-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Project-In%20Progress-orange)](#-roadmap)

Projeto prático de **Quality Assurance, Test Automation e Quality Engineering**, desenvolvido com Playwright e JavaScript. A suíte está evoluindo de testes funcionais de interface para uma arquitetura que também contempla testes de API, validação de contratos e integração contínua.

## 📌 Sobre o projeto

O objetivo é desenvolver uma suíte de testes automatizados organizada, reutilizável e de fácil manutenção, aplicando boas práticas de automação e conceitos utilizados em projetos reais de QA.

O projeto utiliza duas frentes de estudo:

- **UI Testing:** testes funcionais na aplicação SauceDemo.
- **API Testing:** validação de endpoints REST utilizando a API pública JSONPlaceholder.

A implementação faz parte de uma jornada prática de aprendizado, com evolução progressiva da arquitetura, da cobertura dos testes e das estratégias de validação.

### 🎯 Objetivos

- Desenvolver testes automatizados de interface e API.
- Aplicar boas práticas com Playwright Test.
- Implementar cenários positivos e negativos.
- Organizar o código com funções reutilizáveis e módulos CommonJS.
- Aplicar Programação Orientada a Objetos (POO).
- Utilizar Page Object Model (POM) nos testes de interface.
- Criar um cliente HTTP reutilizável para testes de API.
- Validar status HTTP, estrutura JSON, tipos e conteúdo das respostas.
- Evoluir para Contract Testing com JSON Schema.
- Preparar a suíte para execução em CI/CD.
- Desenvolver relatórios e indicadores de qualidade.

---

## 🛠️ Tecnologias e ferramentas

| Tecnologia | Aplicação no projeto |
|---|---|
| JavaScript ES6+ | Implementação dos testes e componentes reutilizáveis |
| Node.js | Ambiente de execução JavaScript |
| Playwright Test | Execução dos testes, assertions e suporte a API Testing |
| POO | Encapsulamento de comportamentos em classes |
| Page Object Model (POM) | Organização das interações com as páginas |
| API Client | Centralização e reutilização de requisições HTTP |
| REST / HTTP | Comunicação com endpoints da API |
| JSON | Formato de dados utilizado nas respostas da API |
| Git | Controle de versão |
| GitHub | Hospedagem do código e portfólio |

---

## 🏗️ Arquitetura do projeto

A arquitetura separa os testes de interface, os testes de API, as funções auxiliares e os componentes responsáveis pela interação com as aplicações.

```text
projeto02/
├── tests/
│   ├── ui/
│   │   └── checkout.spec.js
│   └── api/
│       └── users.spec.js
│
├── helpers/
│   ├── login.js
│   ├── produtos.js
│   ├── iniciarCheckout.js
│   └── prepararCheckout.js
│
├── pages/
│   └── CheckoutPage.js
│
├── clients/
│   └── ApiClient.js
│
├── schemas/
│   └── user.schema.json        # Planejado para Contract Testing
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

> **Nota:** a estrutura acima é uma referência baseada nos arquivos compartilhados durante o desenvolvimento. Ajuste os caminhos para que correspondam exatamente às pastas existentes no repositório. O schema JSON permanece planejado até sua implementação.

### 📁 `tests/ui/`

Contém os testes funcionais de interface.

O arquivo `checkout.spec.js` reúne os cenários de checkout, incluindo validações do resumo do pedido, dos produtos, dos valores calculados e dos campos obrigatórios.

### 📁 `tests/api/`

Contém os testes de API.

O arquivo `users.spec.js` realiza uma requisição para consultar usuários e verifica o status HTTP, a estrutura da resposta e as propriedades dos registros retornados.

### 📁 `helpers/`

Contém funções reutilizáveis que reduzem a duplicação e centralizam operações comuns nos testes de interface.

| Arquivo | Responsabilidade |
|---|---|
| `login.js` | Realizar o login na aplicação |
| `produtos.js` | Adicionar produtos ao carrinho |
| `iniciarCheckout.js` | Abrir o carrinho, validar a quantidade de produtos e iniciar o checkout |
| `prepararCheckout.js` | Preparar o estado inicial para os testes de checkout |

### 📁 `pages/`

Contém classes que encapsulam as interações com as páginas da aplicação.

A classe `CheckoutPage.js` centraliza operações como preenchimento dos campos, interação com botões e validação de mensagens de erro.

### 📁 `clients/`

Contém componentes reutilizáveis para comunicação com APIs.

A classe `ApiClient.js` encapsula a criação do contexto HTTP e disponibiliza métodos para executar requisições.

Responsabilidades implementadas na versão atual:

- Armazenar a URL base da API.
- Inicializar um contexto com `request.newContext()`.
- Executar requisições GET.
- Encerrar o contexto com `dispose()`.

A evolução prevista inclui outros métodos HTTP e melhorias no gerenciamento do ciclo de vida do cliente.

### 📁 `schemas/`

Pasta planejada para armazenar os schemas utilizados na validação dos contratos das APIs.

---

## 🧪 Testes de interface — UI Testing

Os testes de interface utilizam o [SauceDemo](https://www.saucedemo.com/) como aplicação de estudo.

### Cenários implementados

#### Teste positivo

| ID | Cenário | Principais validações |
|---|---|---|
| CT-POS-01 | Checkout com dois produtos | Produtos, subtotal, imposto, total e confirmação do pedido |

#### Testes negativos

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT-NEG-01 | Checkout com todos os campos vazios | Mensagem de obrigatoriedade de First Name |
| CT-NEG-02 | Checkout sem Last Name | Mensagem de obrigatoriedade de Last Name |
| CT-NEG-03 | Checkout sem Postal Code | Mensagem de obrigatoriedade de Postal Code |

### 💰 Validação dos valores do pedido

O teste positivo utiliza dois produtos:

| Produto | Preço |
|---|---:|
| Sauce Labs Backpack | $29.99 |
| Sauce Labs Bolt T-Shirt | $15.99 |
| **Subtotal esperado** | **$45.98** |
| Imposto esperado (8%) | $3.68 |
| **Total esperado** | **$49.66** |

O subtotal é calculado dinamicamente com `reduce()`, a partir dos dados dos produtos.

Os valores esperados são comparados com os apresentados pela aplicação, verificando a consistência dos cálculos e a confirmação do pedido.

---

## 🌐 Testes de API — API Testing

Os testes de API utilizam o [JSONPlaceholder](https://jsonplaceholder.typicode.com/), um serviço público para experimentação com APIs REST.

### API-001 — Consultar usuários

**Endpoint:** `GET /users`

O teste implementado valida:

- Status HTTP `200`.
- Resposta em formato de array.
- Quantidade de registros retornados.
- Tipo numérico do campo `id`.
- Identificadores positivos.
- Tipo e preenchimento do campo `name`.
- Tipo e preenchimento do campo `email`.
- Formato básico do endereço de e-mail.
- Presença das propriedades obrigatórias `id`, `name` e `email`.

Essas verificações exercitam diferentes dimensões da validação de respostas HTTP e JSON.

**Importante:** as validações atuais representam API Testing. Para caracterizar formalmente uma verificação como Contract Testing, as regras devem ser comparadas com um contrato ou schema previamente definido.

### API Client — reutilização de requisições

A classe `ApiClient` foi criada para centralizar o acesso HTTP e evitar que cada teste precise configurar individualmente o contexto da API.

Exemplo de utilização:

```javascript
const ApiClient = require('../../clients/ApiClient');

const apiClient = new ApiClient(
  'https://jsonplaceholder.typicode.com'
);

await apiClient.init();

try {
  const response = await apiClient.get('/users');

  // Assertions específicas do cenário
} finally {
  await apiClient.dispose();
}
```

O exemplo pressupõe que o teste esteja localizado em `tests/api/` e que a classe esteja em `clients/ApiClient.js`. Ajuste o caminho do `require()` se a estrutura real for diferente.

O bloco `finally` garante que o contexto seja encerrado mesmo quando uma operação ou validação falha.

### Próximos cenários de API

| ID | Cenário | Status |
|---|---|---|
| API-001 | Consultar a lista de usuários | Implementado e executado com sucesso |
| API-002 | Consultar um usuário por ID | Próximo cenário |
| API-003 | Validar resposta com JSON Schema | Planejado |
| API-004 | Exercitar cenários negativos de API | Planejado |
| API-005 | Ampliar o cliente HTTP para outros métodos | Planejado |

Os cenários planejados serão considerados concluídos somente após implementação e execução.

---

## ▶️ Como executar o projeto

### 1. Pré-requisitos

Instale:

- [Node.js](https://nodejs.org/)
- npm, normalmente incluído na instalação do Node.js
- [Git](https://git-scm.com/)

### 2. Clonar o repositório

Clone o repositório principal:

```bash
git clone https://github.com/antoniogmartins/Treinamento.git
```

Acesse o diretório do projeto:

```bash
cd Treinamento/Playwright/projeto02
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Instalar os navegadores do Playwright

```bash
npx playwright install
```

Em ambientes Linux, se houver dependências de sistema ausentes, consulte a [documentação oficial de instalação do Playwright](https://playwright.dev/docs/intro).

### 5. Executar os testes de UI

Para executar os testes de checkout:

```bash
npx playwright test checkout.spec.js
```

Para executar com o navegador visível:

```bash
npx playwright test checkout.spec.js --headed
```

### 6. Executar os testes de API

Para executar o teste de usuários, considerando o caminho `tests/api/users.spec.js`:

```bash
npx playwright test tests/api/users.spec.js
```

### 7. Executar todos os testes

```bash
npx playwright test
```

### 8. Consultar o relatório HTML

Após uma execução que gere o relatório HTML:

```bash
npx playwright show-report
```

A disponibilidade do relatório depende da configuração do reporter no arquivo `playwright.config.js`.

---

## 📊 Resultados das execuções

### UI Testing

Na execução registrada após a refatoração dos testes de checkout:

| Indicador | Resultado |
|---|---:|
| Testes executados | 4 |
| Testes aprovados | 4 |
| Testes reprovados | 0 |
| Taxa de aprovação | 100% |

### API Testing

Na execução registrada do teste `Consultar usuários via API`:

| Indicador | Resultado |
|---|---:|
| Testes executados | 1 |
| Testes aprovados | 1 |
| Testes reprovados | 0 |
| Taxa de aprovação | 100% |

**Importante:** esses números representam execuções específicas durante o desenvolvimento. Não constituem uma garantia de cobertura completa nem uma métrica histórica consolidada do projeto.

---

## 🧠 Conceitos praticados

### JavaScript e Node.js

- Variáveis, constantes, funções, arrays e objetos.
- Módulos CommonJS com `require()` e `module.exports`.
- Métodos de array, incluindo `reduce()`.
- Programação assíncrona com `async/await`.
- Classes, construtores e encapsulamento.
- Tratamento do ciclo de vida de recursos assíncronos.

### Playwright

- Locators e interações com a interface.
- Assertions com `expect`.
- Validação de URLs, mensagens e valores.
- Testes positivos e negativos.
- Requisições HTTP com `APIRequestContext`.
- Leitura e validação de respostas JSON.

### Arquitetura de automação

- Separação entre testes, helpers, páginas e clientes de API.
- Reutilização de funções e métodos.
- Programação Orientada a Objetos.
- Page Object Model (POM).
- API Client para centralização de requisições.
- Refatoração e redução de duplicação.
- Separação entre execução de requisições e validações específicas dos cenários.

### Validação de qualidade

- Verificação de status HTTP.
- Validação estrutural de arrays e objetos.
- Validação de tipos e campos obrigatórios.
- Verificação de conteúdo e formato de dados.
- Validação de regras de negócio no checkout.
- Introdução aos conceitos de API Testing e Contract Testing.

---

## 🗺️ Roadmap

A jornada está organizada em dez etapas progressivas.

| Etapa | Objetivo | Status |
|---|---|---|
| Dia 1 | Fundamentos de JavaScript e Node.js | Concluído |
| Dia 2 | Playwright Core: locators, assertions e navegação | Concluído |
| Dia 3 | Testes funcionais e carrinho de compras | Concluído |
| Dia 4 | Checkout e validações positivas e negativas | Concluído |
| Dia 5 | POO, helpers, refatoração e POM | Concluído |
| Dia 6 | API Testing, API Client e Contract Testing | Em andamento |
| Dia 7 | Network Interception e mocks | Planejado |
| Dia 8 | CI/CD com GitHub Actions | Planejado |
| Dia 9 | Confiabilidade, flaky tests e métricas | Planejado |
| Dia 10 | Projeto final, relatórios e dashboard | Planejado |

### 🚀 Próximas evoluções

- Implementar o teste `GET /users/1`.
- Ampliar o `ApiClient` para outros métodos HTTP.
- Definir e validar contratos com JSON Schema.
- Criar cenários negativos de API.
- Implementar interceptação de requisições e mocks.
- Integrar a execução dos testes ao GitHub Actions.
- Investigar falhas intermitentes (*flaky tests*).
- Consolidar relatórios e métricas de execução.
- Desenvolver um dashboard para acompanhar os resultados dos testes.

Esses itens fazem parte do roadmap e não são apresentados como funcionalidades já concluídas.

---

## 👨‍💻 Sobre a iniciativa

Este repositório representa uma iniciativa prática de desenvolvimento de competências em **Quality Assurance, Test Automation e Quality Engineering**.

O projeto busca demonstrar a evolução de uma suíte de automação, desde os testes funcionais de interface até a validação de APIs e a construção de uma arquitetura reutilizável.

O foco está na qualidade do código, na manutenção da automação, na validação de regras de negócio e na criação de uma base que possa evoluir para práticas de engenharia de qualidade aplicadas a projetos reais.

---

## 📚 Referências

- [Documentação oficial do Playwright](https://playwright.dev/)
- [Playwright Test](https://playwright.dev/docs/test-intro)
- [API Testing com Playwright](https://playwright.dev/docs/api-testing)
- [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext)
- [Page Object Models](https://playwright.dev/docs/pom)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

---

**Status do projeto:** em desenvolvimento — automação de UI e API com Playwright e JavaScript.
