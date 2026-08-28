def olaMundo():
      'Funcoes que mostra uma mensagem padrão na tela'
      print ('Ola Mundo !!!')

olaMundo()

def olaMundo1(nome):
     'Funcao que monstra o texto customizado na tela'
     print(f'Ola Mundo, meu nome é: {nome}')

nome = 'Antonio'
olaMundo1(nome) 
# ou olaMundo1('Antonio')    



def olaMundo1(nome):
     'Funcao que monstra o texto customizado na tela'
     print(f'Ola Mundo, meu nome é: {nome}')

# nome = 'Antonio'
olaMundo1(nome='Maria') 
# ou olaMundo1('Antonio')    


def olaMundo1(nome='Maria'):
     'Funcao que monstra o texto customizado na tela'
     print(f'Ola Mundo, meu nome é: {nome}')

# nome = 'Antonio'
olaMundo1() 
# ou olaMundo1('Antonio')    

def soma(a,b):
     return a+b

resultado = soma(3,4)
print(f' A soma é: {resultado}')