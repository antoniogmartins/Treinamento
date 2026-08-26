lockdown = False
#print(lockdown)
grana = 130

status = 'Em casa' if lockdown and grana >= 100 else 'Fui passear'
print(status)

status = 'Em casa' if lockdown or grana >= 100 else 'Fui passear'
print(status)