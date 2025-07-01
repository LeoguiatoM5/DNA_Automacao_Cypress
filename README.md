# 📘 Documentação: Introdução ao Cypress para Testes Automatizados

# Por Leonardo Guiato

## 🧠 O que é o Cypress?

O **Cypress** é uma ferramenta de testes end-to-end (E2E), que roda diretamente no navegador e permite testar aplicações web de forma rápida, confiável e com uma sintaxe fácil de entender.

### ✅ Principais benefícios:

- Escrita de testes fácil com JavaScript.
- Execução rápida e com feedback visual.
- Suporte nativo a screenshots e vídeos dos testes.
- Ótimo para testes de front-end.

---

Mudança

## 🛠️ Requisitos

Antes de tudo, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- Um terminal (CMD, PowerShell, Terminal do VS Code, etc.)
- Um editor de código (recomendo [VS Code](https://code.visualstudio.com/))

---

## 🚀 Instalação do Cypress

### 1. Crie um novo projeto ou abra um projeto já existente:

```bash
mkdir meu-projeto-cypress
cd meu-projeto-cypress
npm init -y
```

### 2. Instale o Cypress como dependência de desenvolvimento:

```bash
npm install cypress --save-dev
```

---

## 🧪 Primeira execução

Abra o Cypress com:

```bash
npx cypress open
```

Esse comando irá:

- Abrir a interface gráfica do Cypress.
- Criar a estrutura de pastas automaticamente com alguns exemplos.

---

## 🗂️ Estrutura de Pastas

Após o primeiro comando, seu projeto terá algo como:

```lua
cypress/
  ├── e2e/          → Onde você coloca os testes
  ├── fixtures/     → Dados fictícios (mockados)
  ├── support/      → Arquivos de suporte (hooks, comandos customizados)
cypress.config.js   → Arquivo de configuração do Cypress
```

---

## ✍️ Criando seu primeiro teste

### 1. No arquivo de teste(Opcional, pois o Cypress já cria um arquivo)

```bash
 cypress/e2e/exemplo.cy.js
```

### 2. Crie o Script de Teste Simples de Login.

```js
describe("Teste e2e", () => {
  //
  beforeEach(() => {
    // beforeEach roda antes de cada teste
    cy.visit("https://practicetestautomation.com/practice-test-login/"); // navega para a url
  });

  it("Login com usuario e senha invalidos", () => {
    // teste de login com usuario e senha invalidos
    cy.get("#username").type("teste");
    cy.get("#password").type("123456");
    cy.get("#submit").click();
    cy.contains("Your username is invalid!");
  });
});
```

### 3. Rode o teste:

```bash
npx cypress open
```

Na interface que abrir, clique no arquivo `exemplo.cy.js`.

---

## 🔍 Comandos básicos do Cypress

```txt
cy.visit(url)       → Acessa a URL
cy.get(seletor)     → Seleciona um elemento
cy.contains(texto)  → Busca por um texto na página
cy.click()          → Clica em um elemento
cy.type(texto)      → Digita em um input
cy.should()         → Faz asserções (testes)
```

---
