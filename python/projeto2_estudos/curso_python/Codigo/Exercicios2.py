num1 = 100.20
num2 = 34.90
num3 = 31.50
num4 = 21.95
soma = num1 + num2 + num3 + num4
menornumero = min(num1, num2, num3, num4)
media = (num1 + num2 + num3 + num4)/4

print(f'Soma dos numeros: {soma}')
print(f'O menor numero é : {menornumero}')
print(f'A media dos numeros: {media}')

numero_digitado = eval(input('Digite um numero: '))
print(f'o numero digitado é:  {numero_digitado}')

numeropar = numero_digitado % 2
if numeropar == 0:
    print(f'numero digitado é par')
else:
    print(f'numero digitado é impar')

if menornumero < 20:
    print(f'numero é menor que 20')
else:
    print(f'numero é maior que 20')

f = int(input('Digite um numero para calcular o valor de Fahenreit: '))
celsius = (5/9)*(f-32)    
print(f'O Valor de Fahenreiht é:  {celsius}')       


