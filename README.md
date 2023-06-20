Para Carregar os dados pré cadastrados, é necessário chamar as seguintes rotas respectivamente:

"http://localhost:3000/users/CarregarDados"
"http://localhost:3000/colecao/CarregarDados"
"http://localhost:3000/avaliacao/CarregarDados"


Ambas no metodo POST (Testado pelo Postman)


Para rodar o site é necessário criar um arquivo.env com as seguintes informações 


{
    #informações para o banco de dados
    DB_HOST= ...
    DB_USER= ...
    DB_PASS= ...
    DB_NAME= ...

    #informações para envio de e-mail
    MAIL_USER= ...
    MAIL_PASS= ...
                    }