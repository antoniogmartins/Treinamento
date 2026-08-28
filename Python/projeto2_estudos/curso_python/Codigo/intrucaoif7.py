tabuada = int(input('Qual a tabuada sera gerada? '))
limite = int(input('Ate que valor iremos calcular? '))

for numero in range(0, limite+1):
    print(f'{tabuada}x{numero}={tabuada*numero}')

    