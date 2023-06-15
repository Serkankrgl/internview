FROM node:14

# Çalışma dizinini ayarla
WORKDIR /app/problem

# Bağımlılıkları kopyala
COPY package.json package-lock.json /app/problem/
RUN npm install

# Kodu kopyala
COPY . /app/problem

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
