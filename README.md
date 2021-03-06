# Nubank Dashboard


<img width="830" src="https://github.com/13Nunes/nubank-dashboard/blob/main/docs/cover.jpg?raw=true">

## Como nasceu este projeto ?
Nasceu da dificuldade de analisar uma fatura quando se tem inúmeros lançamentos de uber, ifood, Mercado Livre e outras compras que fazemos durante o mês.
Alguns deste "gastos" pequenos se acumulam e acabamos não percendo os exageros.

## API não oficial?
Este projeto utiliza a API disponibilizada em [fmsouza/nubank-api](https://github.com/fmsouza/nubank-api) que sua vez é baseada em uma versão Python.
Ambas tem em comum o fato de utilizar um API do NuBank não oficial, porém funcional. Uma API utilizada internamente pelo NuBank, mas que não tem documentação aberta ao público. Esteja avisado que não assumo nenhuma responsabilidade sobre este pacote ou quaisquer pacotes utilizados no projeto.
Recomendo a utilização deste projeto exclusivamente para uso pessoal.

## Atenção!
Este projeto requer que você se autentique no seu app NuBank utilizando um QrCode gerado pela aplicação.
Também será necessário entrar com seu CPF e senha que serão enviados diretamente para a API NuBank para autenticação.
Este projeto não utiliza banco de dados e não grava nenhum dado em servidor. O token de retorno é gravado em seu localstorage e fica sob sua responsabilidade.
Abomino qualquer tentativa de modificar este código para coletar dados bancários de quaisquer usuários... vá trabalhar vagabundo.

# O que foi feito ?
- Utilização da API para buscar as transações
- Gráfico de pizza com as categorias de compras
- Listagem do feed dentro de um Datatable com ordenação e filtros
- Cards que mostram os valores acumulados de Uber, Parcelamentos, Mercado livre, rappi e ifood

# O que precisa ser feito (to do)
- Um meio de lançar os parcelamento já que eles não vem da API. Atualmente eles estão lançados manualmente em uma variável que você terá que editar.
- Criar um sistema para gerenciar quais itens serão agregados nos cards de acumulados. Hoje também está sendo feito manualmente.
- Pensar no layout e adicionar o valor total da fatura.
- Criar um trigger no gráfico para filtrar o Datatable com a categoria clicada
- Criar uma página de acompanhamento de parcelados
- Criar uma novos recursos para identificar custos fixos, financiamentos e gastos desnecessários. 