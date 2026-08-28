n1 = int(input('Digite o valor numerico do primeiro elemento: '))
nn = int(input('Digite ate qual elemento vc quer calcular: '))
cont = 2

print(f'Elemento 1: {n1}')

n2 = 1
print(f'Elemento 2: {n2}')


while cont < nn:
    proximo = n1 + n2

    print(f'Elemento {cont + 1}: {proximo}')

    n1 = n2
    n2 = proximo

    cont += 1

print('======================')

primeiro = 1
segundo = 1

if nn==1 or nn==2:
    print(f"1")
else:
    for _ in range(2,nn):
        elemento = primeiro + segundo 
        segundo = primeiro
        primeiro = elemento

        #print(nn)
        # print(primeiro)
        # print(segundo)
        print(elemento)