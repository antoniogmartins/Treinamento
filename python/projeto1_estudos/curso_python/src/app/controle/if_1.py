nota = float(input('Informe a nota do aluno: '))

print(f'nota informada: {nota}')

Resultado = ''
# Resultado = 'Aprovado' if nota >= 6  else 'Reprovado'
comportado = True if input('Comportado (y/n):') == 'y' else False

if nota >= 8 and comportado:
    Resultado = 'Aprovado' 
    print('Parabéns, vaza: Voce ja pode sair de férias')
elif nota >=7 and comportado:
    Resultado = 'Aprovado' 
    print('Voce ja pode sair de férias')
elif nota >=5.5 and comportado:
    Resultado = 'Recuperação' 
    print('E hora de estudar e rever a matéria - Corra')
    print('Recuperação + Trabalho')
else:
    Resultado = 'Reprovado'
    print('Você devera refazer o ano novamente')

print(f'Resultado: {Resultado}')


