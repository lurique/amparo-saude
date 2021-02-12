# {devtest} Amparo Saúde

## Tecnologias utilizadas

API: Node.js

Dashboard: React

Banco de Dados: MongoDB

## Inicializando o projeto

1. Tenha certeza que tem instalado a última versão do Docker CLI;
2. Clone esse repositório
3. Acesse a pasta `/api` e adicione os dados de seu MongoDB no `.env.example`. Ele vai servir de base para a imagem do docker.
4. Vá para a pasta inicial do respositório onde contém o `Dockerfile` e rode os comandos:

```shell
docker build -t <seu-nome-de-usuario>/amparo-saude . &&
docker run -p <porta-preferencia>:3000 -d <seu-nome-de-usuario>/amparo-saude
```

Caso não queira rodar em *detached mode*, remova a opção -d do segundo comando mostrado acima.
Feito isso, o serviço com a dashboard estarão ativos em localhost:porta-preferencia

---

P: Não tenho uma base mongo, e agora?

R: O acesso ao meu cluster de testes será liberado, é só solicitar.
