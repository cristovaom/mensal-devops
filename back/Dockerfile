FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/src/main.js"]
