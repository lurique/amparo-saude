# {devtest} Amparo Saúde

## Inicializando o projeto

1. Tenha certeza que tem instalado a última versão do Docker CLI;
2. Clone esse repositório e rode `cd amparo-saude`
3. Dentro do repositório, acesse a pasta `/api` e adicione os dados de seu MongoDB no `.env.example`. Ele vai servir de base para a imagem do docker.
4. Feito isso, volte a pasta anterior com `cd ../` e siga o processo de build da imagem do docker

```shell
docker build -t <seu-nome-de-usuario>/amparo-saude . &&
docker run -p <porta-preferencia>:3000 -d <seu-nome-de-usuario>/amparo-saude
```

Caso não queira rodar em *detached mode*, remova a opção -d do segundo comando mostrado acima.
Feito isso, o serviço com a dashboard estarão ativos em localhost:<porta-preferencia>

---

P: Não tenho uma base mongo, e agora?
R: O acesso ao meu cluster de testes será liberado, é só solicitar.