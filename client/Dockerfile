FROM node:14

# Çalışma dizinini ayarla
WORKDIR /app/client

# Bağımlılıkları kopyala
COPY package.json package-lock.json /app/client/
RUN npm install

# Kodu kopyala
COPY . /app/client

# Uygulamayı başlat
CMD ["npm", "start"]
