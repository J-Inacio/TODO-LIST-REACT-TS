# 🚀 TaskMaster - To-Do List Avançada

Um aplicativo de gerenciamento de tarefas moderno, construído com foco em performance, experiência do usuário (UX) e arquitetura escalável.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Funcionalidades (Features)

- **Gerenciamento Completo:** Criação, edição e exclusão de tarefas principais e sub-tarefas.
- **Persistência de Dados:** Uso de `localStorage` integrado ao Context API para garantir que as tarefas não sejam perdidas ao recarregar a página.
- **Validação de Calendário Real:** Proteção contra datas inválidas (ex: 31 de Fevereiro) e bloqueio de agendamentos no passado, orquestrado pela biblioteca `date-fns`.

## 🛠️ Tecnologias e Decisões Arquiteturais

Este projeto foi desenvolvido utilizando as melhores práticas do ecossistema Frontend atual:

- **[React 18]** - Biblioteca principal para construção da UI.
- **[TypeScript]** - Tipagem estrita garantindo previsibilidade de dados e uso de Utility Types como `Omit` para modelagem de Contextos.
- **[Context API]** - Gerenciamento de estado global da aplicação.
- **[Tailwind CSS]** - Estilização baseada em utilitários para componentização rápida.
- **[Date-fns]** - Manipulação, formatação e validação de tempo sem inflar o bundle final (diferente do Moment.js).
- **ISO 8601 Strings:** Arquitetura de "Sanduíche de Datas", onde o estado global e o storage guardam datas em texto imutável (ISO), e a UI hidrata para objetos `Date` apenas no momento da renderização.

## 💻 Como rodar o projeto localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/J-Inacio/TODO-LIST-REACT-TS
   ```

## 📸 Screenshots

![print da tela inicial](image.png)
![print tela de detalhes da tarefa](image-2.png)
![print da seção de subtarefa](image-3.png)

## 🌐 [Clique aqui para visualizar o projeto!](https://todo-list-react-ts-taupe.vercel.app/)
