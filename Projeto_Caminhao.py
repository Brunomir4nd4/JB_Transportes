import ast
import pandas as pd
from Modulo import funcion

soma_entrada = 0.0
soma_Total = 0.0
soma_Mes = 0.0
despesa_Mês = 0
lista_pagamentos = []
data_de_fechamento = '25'
data = '00/00'
Cam = "Caminhões - 1"
Vis = "Visão Geral - 2" 
Tro = "Trocar fechamento do mês - 3"
sair = "Sair - 0"

armazem = open("Deposito/armazem_C1.txt", "r")
produtos_C1 = ast.literal_eval(armazem.read())
armazem.close()
armazem2 = open("Deposito/armazem_C2.txt", "r")
produtos_C2 =ast.literal_eval(armazem2.read())
armazem2.close()

#-----------------------------------#
#data = input("Insira a data atual, Ex: 10/09: \n")
while(1):
    print("-"*33)
    print('|' + Cam.center(31) + '|') 
    print('|' + Vis.center(31) + '|')
    print('|' + Tro.center(31) + '|') 
    print('|' + sair.center(31) + '|')
    print("-"*33)
    swtchi = int(input())

    # Caminhoes
    if(swtchi == 1):
        camin = int(input("Escolha, para caminhão 1 digite (1) para caminhão digite (2)\n"))
        sub_switch = int(input("Adicionar produto - 1\nDeletar produto - 2\n"))

        # Caminhao 1
        if camin == 1:

            # ADD Produto
            if(sub_switch == 1):
                print("Insira os dados dos produtos\nATENÇÃO! Para valores com casas decimais utilise (.) Ex:25.99")

                while(1):
                    lista_Produtos = funcion.Novo_Produto()
                    # Inserindo data na lista (index 7)
                    lista_Produtos.append(data)
                    soma_entrada += lista_Produtos[1] * lista_Produtos[2]
                    lista_pagamentos.append(soma_entrada)
                    produtos_C1.append(lista_Produtos)
                    aux = input("Inserir mais produtos? (s/n)\n")
                    if(aux == 'n'):
                        break
            
            # Del Produto
            elif(sub_switch == 2):
                tabel = pd.DataFrame(produtos_C1, columns = ['Nome Produto', 'Valor Un.(R$)', 'Qtd.', 'Valor Total(R$)', 'Parcelas', 'Valor Mensal(R$)', 'Parcelas Res.', 'Data'])
                print(tabel)
                while(1):
                    index_del = int(input("Insira o número da tabela correspondente ao produto\n"))
                    try:
                        produto_del = produtos_C1[index_del]
                        aux = input(f"Confirme a exlusão de {produto_del[0]} (s/n)\n")
                        if aux == 's':
                            print("Produto deletado!!")
                            del(produtos_C1[index_del])
                            break
                        elif aux != 'n':
                            print("Valor invalido, tente novamente")
                    except IndexError:
                        print("Valor invalido, tente novamente")
            else:
                print("Argumento inválido, tente novamente")
        
        # Caminhao 2
        elif camin == 2:
            
            # ADD Produto
            if sub_switch == 1:
                print("Insira os dados dos produtos")
                while(1):
                    lista_Produtos_C2 = funcion.Novo_Produto()
                    # Inserindo Data (index 7)
                    lista_Produtos_C2.append(data)
                    soma_entrada += lista_Produtos_C2[1] * lista_Produtos_C2[2]
                    lista_pagamentos.append(soma_entrada)
                    produtos_C2.append(lista_Produtos_C2)
                    aux = input("Inserir mais produtos (s/n)\n")
                    if aux == 'n':
                        break
            
            # Del Produto
            elif sub_switch == 2:
                tabel = pd.DataFrame(produtos_C2, columns=['Nome Produto', 'Valor Un.(R$)', 'Qtd.', 'Valor Total(R$)', 'Parcelas', 'Valor Mensal(R$)', 'Parcelas Res.', 'Data'])
                print(tabel)

                while(1):

                    index_del = int(input("Digite o número correspondente ao produto\n"))
                    try:
                        produto_del = produtos_C2[index_del]
                        aux = input(f"Confirme a exlusão de {produto_del[0]} (s/n)\n")
                        if aux == 's':
                            print("Produto deletado")
                            del(produtos_C2[index_del])
                            break
                        elif aux != 'n':
                            print("Valor invalido, tente novamente")
                    except IndexError:
                        print("Valor invalido, tente novamente")
            else:
                print("Argumento inválido, tente novamente")
        
        else:
            print("Argumento inválido, tente novamente")

    # Visão Geral
    elif swtchi == 2:

        # Baixa das parcelas pagas no mês
        if data[0] + data[1] >= data_de_fechamento:
            
            for i in range(len(produtos_C1)):
                lista_C1 = produtos_C1[i]
                if lista_C1[6] <= 0:
                    for j in range(i, len(produtos_C1) - 1):
                        produtos_C1[j] = produtos_C1[j+1]
                    del(produtos_C1[j+1]) 
                    break
                lista_C1[6] -= 1

        # Soma de todos os produtos do caminhão e Soma do que vai pagar no mês atual
        for i in range(len(produtos_C1)):
            lista_C1 = produtos_C1[i]
            soma_Total += lista_C1[3]
            soma_Mes += lista_C1[5]
        lista_pagamentos_C1 = []
        lista_pagamentos_C1.append("1") 
        lista_pagamentos_C1.append(soma_Total)
        lista_pagamentos_C1.append(soma_Mes)
        lista_pagamentos.append(lista_pagamentos_C1)
        soma_Mes = 0.0
        soma_Total = 0.0
        for i in range(len(produtos_C2)):
            lista_C2 = produtos_C2[i]
            soma_Total += lista_C2[3]
            soma_Mes += lista_C2[5]
        lista_pagamentos_C2 = []
        lista_pagamentos_C2.append("2")
        lista_pagamentos_C2.append(soma_Total)
        lista_pagamentos_C2.append(soma_Mes)
        lista_pagamentos.append(lista_pagamentos_C2)
        
        print("\nTabela do Caminhão 1")
        if len(produtos_C1) > 0:
            tabel = pd.DataFrame(produtos_C1, columns = ['Nome Produto', 'Valor Un.(R$)', 'Qtd.', 'Valor Total(R$)', 'Parcelas', 'Valor Mensal(R$)', 'Parcelas Res.', 'Data'])
            print(tabel)
        else:
            print("Não há nenhum produto associado ao caminhão 1")
        print("\nTabela do Caminhão 2")
        if len(produtos_C2) > 0:
            tabel = pd.DataFrame(produtos_C2, columns = ['Nome Produto', 'Valor Un.(R$)', 'Qtd.', 'Valor Total(R$)', 'Parcelas', 'Valor Mensal(R$)', 'Parcelas Res.', 'Data'])
            print(tabel)
        else:
            print("Não há nenhum produto associado ao caminhão 2")

        print("\nTabela de Pagamento")
        if len(lista_pagamentos_C1) == 4:

            tabel2 = pd.DataFrame(lista_pagamentos, columns=["Última entrada (R$)", "Caminhao", "Total (R$)", "Mês atual (R$)"])
            print(tabel2)
        else:
            tabel2 = pd.DataFrame(lista_pagamentos, columns=["Caminhao", "Total (R$)", "Mês atual (R$)"])
            print(tabel2)
        despesa_Mês = lista_pagamentos_C1[2] + lista_pagamentos_C2[2]
        print(f"Valor final a pagar neste mês: {despesa_Mês}")

    # Trocar fechamento mês
    elif swtchi == 3:
        data_de_fechamento = input("Insira o novo dia do fechamento do mês\n")
        print("Troca realizda")
    

    elif swtchi == 0:
        print("\nPrograma finalizado\n")
        produtos = str(produtos_C1)
        armazem = open("armazem_C1.txt", "w")
        produtos = armazem.write(produtos)
        armazem.close()

        produtos = str(produtos_C2)
        armazem2 = open("armazem_C2.txt", "w")
        produtos = armazem2.write(produtos)
        armazem2.close()
        break

    else:
        print("Argumento inválido, tente novamente")