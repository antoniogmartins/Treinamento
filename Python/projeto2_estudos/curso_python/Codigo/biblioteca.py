def calcularquadrado(numero=5):
      quadrado = numero ** 2
      'Funcoes que mostra uma mensagem padrão na tela'
      print (f'O quadrado de um numero é: {quadrado}')
      return quadrado 
      

def temperatura(temp):
      celcius = (5/9) * (temp -32)
      print (f'O valor de celcius é : {celcius}')
      return celcius


def calculo(palavra, numero):
      if palavra == 'quadrado':
            return numero * numero
      else:
            return numero * numero * numero


