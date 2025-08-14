# Skype School — Full Pack (Iter 1.1 + 2 + 2.1)

1) Распаковать в корень проекта (с перезаписью).
2) Prisma:
   npx prisma migrate dev --schema prisma/schema.prisma --name add_user_names
   npx prisma generate --schema prisma/schema.prisma
3) Backend:
   cd server
   npm run build
   npm run start:prod
4) Frontend:
   cd ../client
   npm run build
   npm run start

Логин: admin / Admin12345!
