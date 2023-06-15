FROM node:14

# Çalışma dizinini ayarla
WORKDIR /app/user

# Bağımlılıkları kopyala
COPY package.json package-lock.json /app/user/
RUN npm install

# Kodu kopyala
COPY . /app/user

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
