num1 = 10
num2 = 15
num3 = 20
soma = num1 + num2
media = (num1 + num2 + num3)/3

print(f'Soma dos numeros: {soma}')
print(f'A media dos numeros: {media}')

nota1 = int(input("Digite a nota 1: "))
peso1 = int(input("Digite o peso 1 da nota 1: "))
nota2 = int(input("Digite a nota 2: "))
peso2 = int(input("Digite o peso 2 da nota 2: "))
somapeso = sum([peso1+peso2])
#ou somapeso = peso1+peso2
media = (nota1*peso1+nota2*peso2)/(peso1+peso1)
# ou media = (nota1*peso1+nota2*peso2)/(somapeso)

print(f'Soma dos Pesos: {somapeso}')
print(f'Media: {media}')

if (somapeso != 10):
  print("A soma dos pesos deve ser igual a 10 para poder calcular a media: ")
else:
 print(f'A media é: {media}')



