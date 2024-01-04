def Novo_Produto():
    while(1):
        try:
            lit_nome_valor_qtd_vezes = []
            
            lit_nome_valor_qtd_vezes.append(input("Nome: "))
            lit_nome_valor_qtd_vezes.append(float(input("Valor: "))) 
            lit_nome_valor_qtd_vezes.append(int(input("Qtd. do mesmo produto: ")))
            # Valor Total do produto (index 3)
            lit_nome_valor_qtd_vezes.append(lit_nome_valor_qtd_vezes[1] * lit_nome_valor_qtd_vezes[2]) 
            lit_nome_valor_qtd_vezes.append(int(input("Qtd. de Parcelas: ")))
            # Valor Mensal do produto (index 5)
            lit_nome_valor_qtd_vezes.append(lit_nome_valor_qtd_vezes[3] / lit_nome_valor_qtd_vezes[4])
            # Parcelas restantes (index 6)
            lit_nome_valor_qtd_vezes.append(lit_nome_valor_qtd_vezes[4])
            return lit_nome_valor_qtd_vezes
        except ValueError:
            print("O valor deve ser digitado com um ponto (.) Ex: 25.99")

    