# 🎭 Playwright QA Automation — Functional Testing

[![Playwright](https://img.shields.io/badge/Playwright-Automation-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Project-In%20Progress-orange)](#-roadmap)

## 📌 Sobre o projeto

Este projeto tem como objetivo desenvolver uma suíte de testes automatizados utilizando **Playwright com JavaScript**, aplicando boas práticas de automação, organização de código e validação de regras de negócio.

O projeto utiliza o [SauceDemo](https://www.saucedemo.com/) como aplicação de estudo para implementar cenários de testes funcionais relacionados ao login, carrinho de compras e checkout.

A implementação faz parte de uma jornada prática de aprendizado, com foco na construção de uma arquitetura de automação organizada, reutilizável e preparada para evoluir para testes de API, Contract Testing e integração contínua.

### 🎯 Objetivos

- Desenvolver testes funcionais automatizados para aplicações web.
- Aplicar boas práticas de automação com Playwright.
- Organizar cenários positivos e negativos.
- Implementar reutilização de código por meio de helpers.
- Aplicar conceitos de Programação Orientada a Objetos (POO).
- Utilizar o padrão Page Object Model (POM).
- Validar regras de negócio e cálculos financeiros.
- Evoluir a arquitetura para testes de API, contratos e CI/CD.

---

## 🛠️ Tecnologias e ferramentas

| Tecnologia | Aplicação no projeto |
|---|---|
| JavaScript | Linguagem utilizada na implementação dos testes |
| Node.js | Ambiente de execução JavaScript |
| Playwright Test | Framework de automação e execução dos testes |
| Page Object Model (POM) | Organização das interações com as páginas |
| Git | Controle de versão |
| GitHub | Hospedagem do código-fonte e portfólio |

---

## 🏗️ Arquitetura do projeto

A estrutura atual separa os cenários de teste, as funções auxiliares e as interações com as páginas da aplicação.

```text
projeto02/
│
├── tests/
│   └── ui/
│       └── checkout.spec.js
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
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

*Esta estrutura representa a organização atual prevista com base nos arquivos desenvolvidos até o Dia 5.*

### 📁 `tests/ui/`

Contém os testes funcionais de interface.

O arquivo `checkout.spec.js` reúne os cenários de validação do processo de checkout, incluindo o resumo do pedido e a obrigatoriedade dos campos.

### 📁 `helpers/`

Contém funções reutilizáveis para evitar duplicação de código e centralizar operações comuns.

| Arquivo | Responsabilidade |
|---|---|
| `login.js` | Realizar o login na aplicação |
| `produtos.js` | Adicionar produtos ao carrinho |
| `iniciarCheckout.js` | Abrir o carrinho, validar a quantidade de produtos e iniciar o checkout |
| `prepararCheckout.js` | Validar o estado inicial da aplicação e preparar o cenário de checkout |

### 📁 `pages/`

Contém classes que encapsulam as interações com as páginas da aplicação.

**`CheckoutPage.js`** centraliza operações como:

- Preencher o primeiro nome.
- Preencher o sobrenome.
- Preencher o código postal.
- Clicar no botão Continue.
- Validar mensagens de erro.

Essa abordagem facilita a manutenção dos locators e a reutilização dos comportamentos da página.

---

## 🧪 Cenários de teste implementados

Os cenários abaixo foram executados com sucesso na versão atual do projeto.

### Teste positivo

| ID | Cenário | Validações |
|---|---|---|
| CT-POS-01 | Validar o resumo do checkout com dois produtos | Produtos, subtotal, imposto, total e confirmação do pedido |

### Testes negativos

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

O subtotal é calculado dinamicamente com `reduce()`, utilizando os preços definidos nos dados de teste.

Os valores esperados de subtotal, imposto e total são comparados com os valores exibidos pela aplicação.

---

## ▶️ Como executar o projeto

### 1. Pré-requisitos

Instale:

- [Node.js](https://nodejs.org/)
- npm, normalmente incluído na instalação do Node.js
- Git, caso queira clonar o repositório

### 2. Clonar o repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

Entre no diretório do projeto:

```bash
cd projeto02
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Instalar os navegadores do Playwright

```bash
npx playwright install
```

Em ambientes Linux, se houver dependências de sistema ausentes, consulte a documentação oficial do Playwright para obter as instruções adequadas.

### 5. Executar os testes de checkout

Para executar os testes em modo headless:

```bash
npx playwright test checkout.spec.js
```

Para executar com o navegador visível:

```bash
npx playwright test checkout.spec.js --headed
```

**Observação:** os comandos acima pressupõem que a configuração atual do Playwright permite localizar o arquivo `tests/ui/checkout.spec.js` pelo nome `checkout.spec.js`.

### 6. Executar todos os testes

```bash
npx playwright test
```

### 7. Consultar o relatório HTML

Após uma execução, gere ou abra o relatório HTML conforme a configuração do projeto:

```bash
npx playwright show-report
```

O relatório depende de uma execução anterior que tenha produzido o relatório HTML. A geração e a configuração desse relatório serão refinadas nas próximas etapas do projeto.

---

## 📊 Resultados da execução

Na execução registrada após a refatoração do Dia 5, os quatro testes de checkout foram aprovados.

| Indicador | Resultado registrado |
|---|---:|
| Testes executados | 4 |
| Testes aprovados | 4 |
| Testes reprovados | 0 |
| Taxa de aprovação | 100% |

**Importante:** esse resultado representa a execução registrada durante o desenvolvimento. Não significa que todos os cenários possíveis da aplicação tenham sido testados.

---

## 🧠 Conceitos praticados

### JavaScript

- Declaração de variáveis e constantes.
- Funções e módulos CommonJS.
- Arrays e objetos.
- Métodos de array, incluindo `reduce()`.
- Funções assíncronas com `async/await`.

### Playwright

- Localização de elementos com locators.
- Interações com a interface.
- Assertions com `expect`.
- Validação de URLs e mensagens.
- Testes positivos e negativos.
- Captura de screenshots como evidência.

### Arquitetura de automação

- Separação entre testes, helpers e páginas.
- Reutilização de funções.
- Encapsulamento de comportamentos.
- Programação Orientada a Objetos.
- Page Object Model (POM).
- Refatoração e redução de duplicação.

### Validação de regras de negócio

- Verificação de produtos no carrinho.
- Cálculo dinâmico do subtotal.
- Validação de imposto e total.
- Validação de campos obrigatórios.
- Verificação da confirmação de compra.

---

## 🗺️ Roadmap

O projeto está em desenvolvimento e seguirá uma jornada de evolução técnica.

| Etapa | Objetivo | Status |
|---|---|---|
| Dia 1 | Fundamentos de JavaScript e Node.js | Concluído |
| Dia 2 | Playwright Core: locators, assertions e navegação | Concluído |
| Dia 3 | Testes funcionais e carrinho de compras | Concluído |
| Dia 4 | Checkout e validações positivas e negativas | Concluído |
| Dia 5 | POO, helpers, refatoração e POM | Concluído |
| Dia 6 | API Testing e Contract Testing | Planejado / em andamento |
| Dia 7 | Network Interception e mocks | Planejado |
| Dia 8 | CI/CD com GitHub Actions | Planejado |
| Dia 9 | Confiabilidade, flaky tests e métricas | Planejado |
| Dia 10 | Projeto final, relatórios e dashboard | Planejado |

As etapas futuras serão incorporadas ao README conforme forem implementadas e validadas.

---

## 🚀 Próximas evoluções

As próximas versões do projeto têm como objetivo incluir:

- Testes de API com Playwright.
- Validação de status HTTP e payloads JSON.
- Testes negativos de API.
- Contract Testing.
- Interceptação de requisições e mocks.
- Integração com GitHub Actions.
- Análise de falhas e estabilidade dos testes.
- Relatórios de execução e indicadores de qualidade.
- Dashboard de resultados para acompanhamento das execuções.

Essas funcionalidades fazem parte do roadmap e não são apresentadas como implementações concluídas.

---

## 👨‍💻 Sobre a iniciativa

Este repositório representa uma iniciativa prática de desenvolvimento de competências em **Quality Assurance, Test Automation e Quality Engineering**.

O foco está na aplicação de conceitos de teste de software em um projeto evolutivo, com atenção à qualidade do código, à manutenção da automação e à validação de regras de negócio.

O objetivo final é construir uma suíte de testes organizada, confiável e adequada para demonstrar práticas de automação de qualidade em um portfólio profissional.

---

## 📚 Referências

- [Documentação oficial do Playwright](https://playwright.dev/)
- [Playwright Test](https://playwright.dev/docs/test-intro)
- [API Testing com Playwright](https://playwright.dev/docs/api-testing)
- [Page Object Models](https://playwright.dev/docs/pom)
- [JSONPlaceholder — API pública para testes](https://jsonplaceholder.typicode.com/)

---

**Status do projeto:** em desenvolvimento — jornada de automação com Playwright.
