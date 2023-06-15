FROM node:14

# Çalışma dizinini ayarla
WORKDIR /app/webrtc

# Bağımlılıkları kopyala
COPY package.json package-lock.json /app/webrtc/
RUN npm install

# Kodu kopyala
COPY . /app/webrtc

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
