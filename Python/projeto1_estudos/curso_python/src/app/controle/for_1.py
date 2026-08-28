
for i in range(1, 100): 
    print ('Escrevendo: {}'.format(i))
    # ou print (f'Escrevendo: {i}')
print('')

for i in range(1, 100, 30): # vai de 1 ao 100, de 30 em 30
    print ('Escrevendo: {}'.format(i))
    # ou print (f'Escrevendo: {i}')
print('')

for i in range(1, 100, -30): # vai de 1 ao 100, de 30 em 30
    print (f'Escrevendo: {i}')    

print('')

print ("==================")
nums = [2,3,4,5,6,7,8,]
print('')

for n in nums:
    print(n, end = ',') 
    print('')
texto = 'Python é muito massa'

print ("==================")

cont = 0;
for letra in texto:
    print(letra, end = ' ')
    if letra != ' ':
       cont = cont + 1
   
print(f'Quantidade de Letras do texto:  {cont}')    
print('')

produto = {
    'nome': 'Caneta',
    'preco': 8.80,
    'desc': 0.5
}

for chave in produto:
    print(chave, produto[chave],end= ' ')
print('')

print ("------------------------")
#ou da forma abaixo
for chave, valor in produto.items():
    print(chave, valor, end= ' ')    
print('')

print ("------------------------")    
#ou so demonstrar os valores
for valor in produto.values():
    print(valor, end = ' ')
    # ou print(valor)    
print('')

print ("------------------------")    
#ou so demonstrar a chave
for chave in produto.keys():
    print(chave, end= ' ')
    # ou print(chave)    
print('')    