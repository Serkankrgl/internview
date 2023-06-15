FROM node:14

# Çalışma dizinini ayarla
WORKDIR /app/advertisement

# Bağımlılıkları kopyala
COPY package.json package-lock.json /app/advertisement/
RUN npm install

# Kodu kopyala
COPY . /app/advertisement

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
