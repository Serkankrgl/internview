FROM node:14

# Çalışma dizinini ayarla
WORKDIR /app/gateway

# Bağımlılıkları kopyala
COPY package.json package-lock.json /app/gateway/
RUN npm install

# Kodu kopyala
COPY . /app/gateway

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
