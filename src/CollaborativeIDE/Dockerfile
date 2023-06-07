FROM node:14

# Gerekli paketleri yükle
RUN apt-get update && \
    apt-get install -y python3 python3-pip ruby-full openjdk-11-jdk g++ gcc mono-devel go rustc swift php perl lua5.3 && \
    rm -rf /var/lib/apt/lists/*

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları kopyala
COPY package.json package-lock.json /app/
RUN npm install

# Kodu kopyala
COPY . /app

# Uygulamayı başlat
CMD ["node", "App.js"]
