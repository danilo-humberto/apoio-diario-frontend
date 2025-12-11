# Apoio‑Diario‑FrontEnd

Front‑end do **Apoio Diário** — aplicativo móvel feito com **React Native + Expo**. Este README explica, passo a passo, 

Repositório Back: `https://github.com/feliixjuliana/Apoio-Diario-BackEnd`

---

## ✅ Resumo rápido

* Roda com: `npm start`
* É necessário ter o **app Expo Go** instalado no celular.
* **Importante:** ajuste o arquivo `src/utils/env.ts` com o **IP da sua máquina** (substitua `localhost`) para que o app no celular consiga acessar o backend (ex.: `http://192.168.x.x:3000/api`).

---

## Pré‑requisitos

1. Node.js e npm
2. Expo Go (app) instalado no celular (Android/iOS)
3. Celular e computador **na mesma rede Wi‑Fi**

---

## Passo a passo

### 1) Clonar o repositório

```bash
git clone https://github.com/danilo-humberto/apoio-diario-frontend.git
cd apoio-diario-frontend
```

### 2) Instalar dependências

```bash
npm install
```

### 3) Configurar o endereço do backend (muito importante)

Abra o arquivo:

```
src/utils/env.ts
```

Substitua a URL pelo **IP da sua máquina** na rede local (não use `localhost`). Exemplos:

```ts
// Exemplo de como deve ficar
export const API_URL = "http://192.168.0.10:3000/api";
```

Observações:

* Use o IP IPv4 da sua máquina (ex.: `192.168.x.x` ou `10.0.x.x`).
* Inclua a porta do backend, se houver (ex.: `:3000`).
* Mantenha o sufixo `/api`, pois o back usa esse prefixo

> Por que isso é necessário? O Expo carregando o app no celular usa a rede para buscar a API no seu computador — `localhost` no celular aponta para o próprio celular, não pro PC.

### 4) Iniciar o app

```bash
npm start
```

O Metro bundler/Expo abrirá no terminal ou navegador e exibirá um **QR code**.

### 5) Abrir no celular

1. Abra o app **Expo Go** no celular.
2. Escaneie o QR code que apareceu após `npm start`.
3. O app será carregado no dispositivo e deverá se comunicar com o backend usando o `API_URL` que você configurou.
