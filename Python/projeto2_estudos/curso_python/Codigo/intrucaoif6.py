senhavalida = 123456
cont = 0

while cont < 4:
  tentativa = int(input('Digite uma senha valida: '))

  if tentativa == senhavalida:
       print("Senha correta. Acesso concedido")
       break
  else:
       print("Senha incorreta. tente novamente")
  cont += 1 

if cont == 4:
  print("Numero maximo de tentivas atingido")
       