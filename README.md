
# Portfolio Website - FH Digital

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Project Info

**URL**: https://lovable.dev/projects/1652b82b-715e-42de-88d3-837d5297518e

## Technologies Used

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Development Setup

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Local Development

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start development server
npm run dev
```

### Build for Production

```sh
# Build the project
npm run build

# Preview the build locally
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_API_BASE_URL=your_api_base_url_here
```

## Complete Deployment Guide

### Step 1: Prepare Your Server with aaPanel

#### 1.1 Server Requirements
- VPS/Server dengan minimal 1GB RAM
- Ubuntu 18.04+ atau CentOS 7+
- Port 8888 terbuka untuk aaPanel
- Port 80 dan 443 terbuka untuk web traffic

#### 1.2 Install aaPanel
```bash
# Untuk Ubuntu/Debian
wget -O install.sh http://www.aapanel.com/script/install-ubuntu_6.0_en.sh && sudo bash install.sh aapanel

# Untuk CentOS/RHEL
yum install -y wget && wget -O install.sh http://www.aapanel.com/script/install_6.0_en.sh && sh install.sh aapanel
```

#### 1.3 Initial aaPanel Setup
1. Setelah instalasi selesai, catat URL, username, dan password
2. Akses `http://your-server-ip:8888`
3. Login dengan kredensial yang diberikan
4. Lengkapi setup awal dan ganti password default

#### 1.4 Install Required Software
Di aaPanel Dashboard:
1. Go to **App Store**
2. Install software berikut:
   - **Nginx** (recommended) atau Apache
   - **Node.js** (versi LTS terbaru)
   - **PM2** (untuk process management)
   - **MySQL** (jika diperlukan database)
   - **phpMyAdmin** (optional, untuk database management)

### Step 2: Upload dan Deploy Project

#### 2.1 Upload Project Files
**Metode 1: Via File Manager aaPanel**
1. Go to **Files** di aaPanel
2. Navigate ke `/www/wwwroot/`
3. Buat folder untuk domain Anda: `mkdir your-domain.com`
4. Upload semua file project ke folder tersebut

**Metode 2: Via Git (Recommended)**
```bash
# SSH ke server
ssh root@your-server-ip

# Navigate ke web directory
cd /www/wwwroot/

# Clone project
git clone <YOUR_GIT_URL> your-domain.com

# Set permissions
chown -R www:www your-domain.com
chmod -R 755 your-domain.com
```

#### 2.2 Install Dependencies dan Build
```bash
# Masuk ke directory project
cd /www/wwwroot/your-domain.com

# Install dependencies
npm install

# Build untuk production
npm run build
```

#### 2.3 Setup Website di aaPanel
1. Go to **Website** → **Add Site**
2. Isi form:
   - **Domain**: your-domain.com (dan www.your-domain.com)
   - **Document Root**: `/www/wwwroot/your-domain.com/dist`
   - **PHP Version**: None (karena static site)
3. Click **Submit**

#### 2.4 Configure Nginx
1. Go to **Website** → click **Settings** pada site Anda
2. Go to **Configuration File**
3. Update konfigurasi Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    root /www/wwwroot/your-domain.com/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security - hide sensitive files
    location ~ /\. {
        deny all;
    }
}
```

### Step 3: Setup Cloudflare Tunnel

#### 3.1 Install cloudflared
```bash
# Download cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64

# Make executable and move to PATH
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
sudo chmod +x /usr/local/bin/cloudflared
```

#### 3.2 Authenticate dengan Cloudflare
```bash
# Login ke Cloudflare
cloudflared tunnel login
```
Browser akan terbuka, pilih domain yang ingin digunakan.

#### 3.3 Create Tunnel
```bash
# Buat tunnel dengan nama unik
cloudflared tunnel create your-tunnel-name

# Catat tunnel ID yang dihasilkan
```

#### 3.4 Configure Tunnel
```bash
# Buat config directory
sudo mkdir -p /etc/cloudflared

# Buat config file
sudo nano /etc/cloudflared/config.yml
```

Isi config file:
```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: your-domain.com
    service: http://localhost:80
  - hostname: www.your-domain.com
    service: http://localhost:80
  - service: http_status:404
```

#### 3.5 Route Traffic
```bash
# Setup DNS routing
cloudflared tunnel route dns your-tunnel-name your-domain.com
cloudflared tunnel route dns your-tunnel-name www.your-domain.com
```

#### 3.6 Run Tunnel as Service
```bash
# Install service
sudo cloudflared service install

# Start service
sudo systemctl start cloudflared
sudo systemctl enable cloudflared

# Check status
sudo systemctl status cloudflared
```

### Step 4: Transfer Domain ke Cloudflare

#### 4.1 Add Site to Cloudflare
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Add a Site**
3. Enter domain name: `your-domain.com`
4. Select **Free Plan**
5. Click **Continue**

#### 4.2 Review DNS Records
1. Cloudflare akan scan DNS records existing
2. Review dan pastikan semua record penting ada:
   - A record untuk `@` (root domain)
   - A record untuk `www`
   - MX records (untuk email)
   - CNAME records lainnya
3. Add missing records jika diperlukan
4. Click **Continue**

#### 4.3 Change Nameservers
1. Copy nameservers yang diberikan Cloudflare (contoh: `nina.ns.cloudflare.com`)
2. Login ke domain registrar Anda (GoDaddy, Namecheap, dll)
3. Find **DNS Management** atau **Nameservers**
4. Replace nameservers dengan yang dari Cloudflare
5. Save changes

**Catatan**: Propagasi DNS bisa memakan waktu hingga 48 jam.

### Step 5: Configure Domain to Point to Server

#### 5.1 Setup DNS Records di Cloudflare
1. Go to **DNS** tab di Cloudflare dashboard
2. Add/Update records:

```
Type: A
Name: @ (atau your-domain.com)
IPv4 address: YOUR_SERVER_IP
Proxy status: Proxied (Orange cloud)

Type: A  
Name: www
IPv4 address: YOUR_SERVER_IP
Proxy status: Proxied (Orange cloud)
```

#### 5.2 Configure Cloudflare Settings
**SSL/TLS Settings:**
1. Go to **SSL/TLS** → **Overview**
2. Set encryption mode ke **Full (strict)**
3. Enable **Always Use HTTPS**

**Performance Settings:**
1. Go to **Speed** → **Optimization**
2. Enable **Auto Minify** (HTML, CSS, JS)
3. Enable **Brotli**
4. Go to **Caching** → **Configuration**
5. Set **Browser Cache TTL** ke 1 year

### Step 6: SSL Configuration dari Cloudflare

#### 6.1 Origin Certificates (Recommended)
1. Go to **SSL/TLS** → **Origin Server**
2. Click **Create Certificate**
3. Select **Let Cloudflare generate a private key and a CSR**
4. Add hostnames: `*.your-domain.com`, `your-domain.com`
5. Choose validity: 15 years
6. Click **Next**

#### 6.2 Install Certificate di Server
1. Copy **Origin Certificate** dan save sebagai `/etc/ssl/certs/cloudflare-origin.pem`
2. Copy **Private Key** dan save sebagai `/etc/ssl/private/cloudflare-origin.key`

```bash
# Create certificate files
sudo nano /etc/ssl/certs/cloudflare-origin.pem
# Paste origin certificate

sudo nano /etc/ssl/private/cloudflare-origin.key  
# Paste private key

# Set permissions
sudo chmod 644 /etc/ssl/certs/cloudflare-origin.pem
sudo chmod 600 /etc/ssl/private/cloudflare-origin.key
```

#### 6.3 Update Nginx Configuration
Update konfigurasi Nginx di aaPanel:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /etc/ssl/certs/cloudflare-origin.pem;
    ssl_certificate_key /etc/ssl/private/cloudflare-origin.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+AESGCM:EDH+AESGCM;
    ssl_prefer_server_ciphers on;
    
    root /www/wwwroot/your-domain.com/dist;
    index index.html;
    
    # ... rest of configuration sama seperti sebelumnya
}
```

### Step 7: Additional Cloudflare Settings

#### 7.1 Performance Optimization
**Caching Rules:**
1. Go to **Rules** → **Page Rules**
2. Add rule: `your-domain.com/*`
   - Cache Level: Cache Everything
   - Browser Cache TTL: 1 year
   - Edge Cache TTL: 1 month

**Workers & Pages (Optional):**
- Setup Cloudflare Workers untuk advanced caching
- Enable **Polish** untuk image optimization

#### 7.2 Security Settings
**Firewall:**
1. Go to **Security** → **WAF**
2. Enable **Managed Rules**
3. Set **Security Level** ke Medium atau High

**Bot Fight Mode:**
1. Go to **Security** → **Bots**
2. Enable **Bot Fight Mode**

**Rate Limiting:**
1. Go to **Security** → **Rate Limiting Rules**
2. Create rules untuk protect dari DDoS

#### 7.3 Analytics & Monitoring
**Analytics:**
1. Enable **Web Analytics**
2. Setup **Real User Monitoring**

**Alerts:**
1. Go to **Notifications**
2. Setup alerts untuk:
   - Origin server down
   - High error rates
   - DDoS attacks

### Step 8: Final Testing & Optimization

#### 8.1 Test Website
```bash
# Test SSL
curl -I https://your-domain.com

# Test redirects  
curl -I http://your-domain.com

# Test WWW redirect
curl -I https://www.your-domain.com
```

#### 8.2 Performance Testing
- Use Google PageSpeed Insights
- Test dengan GTmetrix
- Check Lighthouse scores

#### 8.3 Monitoring Setup
```bash
# Setup log monitoring di server
tail -f /www/wwwlogs/your-domain.com.log

# Monitor Cloudflare tunnel
sudo journalctl -u cloudflared -f
```

## Troubleshooting

### Common Issues

**1. Build Errors:**
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**2. Permission Issues:**
```bash
# Fix ownership
sudo chown -R www:www /www/wwwroot/your-domain.com
sudo chmod -R 755 /www/wwwroot/your-domain.com
```

**3. SSL Errors:**
- Check certificate installation
- Verify Cloudflare SSL mode
- Clear browser cache

**4. DNS Issues:**
- Wait for propagation (up to 48 hours)
- Use DNS checker tools
- Verify nameserver configuration

**5. Cloudflare Tunnel Issues:**
```bash
# Restart tunnel service
sudo systemctl restart cloudflared

# Check tunnel status
cloudflared tunnel info your-tunnel-name

# Check logs
sudo journalctl -u cloudflared --since "1 hour ago"
```

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Rebuild
npm run build

# Restart services jika diperlukan
sudo systemctl restart nginx
```

### Backup Strategy
1. **File Backup**: Regular backup via aaPanel
2. **Database Backup**: Automated MySQL dumps
3. **Git Backup**: Push changes to repository
4. **Server Snapshot**: VPS provider snapshots

### Security Updates
1. Keep aaPanel updated
2. Update Node.js regularly
3. Monitor Cloudflare security alerts
4. Review access logs regularly

## Support Resources

- **aaPanel Documentation**: https://www.aapanel.com/new/docs
- **Cloudflare Support**: https://support.cloudflare.com/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/

## License

This project is built with Lovable and can be deployed anywhere.
