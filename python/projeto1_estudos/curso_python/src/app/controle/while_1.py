x = 0;

# while x!= -1:
#    x = float(input('Informe o numero ou -1 para sair: '))
# print('Fim!')    

qtde = 0
total = 0
nota = 0
while nota != -1:
    nota = float(input('Informe uma nota ou -1 para sair: '))

    if nota != -1:
        total += nota
        qtde += 1
    
print(f'o total é : ", {total}')
print(f'A qtde é: ", {qtde}')
print(f'A media é da turma é: ", {total/qtde}')

print('Fim!') 
