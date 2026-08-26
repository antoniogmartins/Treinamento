nota1 = eval(input('Digite o valor da 1 nota: '))
nota2 = eval(input('Digite o valor da 2 nota: '))

if (nota1 < 0) or (nota1 > 10):
    print('A nota1 informada deve estar entre 0 e 10')
elif (nota2 < 0) or (nota2 > 10):
    print('A nota2 informada deve estar entre 0 e 10')
else:   
    #print('Perfeito')
    media = (nota1 + nota2)/2
    if media >= 7:
       print('Média acima ou igual a 7: Aluno aprovado')
    elif (media >= 5 and media < 7):   
       print('Média acima de 5 e abaixo de 7: Aluno em Exame')
    else:
       print('Média abaixo de 7' \
       ': Aluno Reprovado')
    