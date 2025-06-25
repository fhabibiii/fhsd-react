
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
npm i

# Step 4: Start development server
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_API_BASE_URL=your_api_base_url_here
```

## Deployment Guide

### Step 1: Deploy with aaPanel

#### 1.1 Server Preparation
1. **Install aaPanel on your server:**
   ```bash
   # For Ubuntu/Debian
   wget -O install.sh http://www.aapanel.com/script/install-ubuntu_6.0_en.sh && sudo bash install.sh aapanel
   
   # For CentOS
   yum install -y wget && wget -O install.sh http://www.aapanel.com/script/install_6.0_en.sh && sh install.sh aapanel
   ```

2. **Access aaPanel:**
   - Open `http://your-server-ip:8888` in your browser
   - Complete the initial setup and create admin account

#### 1.2 Environment Setup
1. **Install required software in aaPanel:**
   - Go to App Store
   - Install: Nginx, Node.js, PM2
   - Configure Nginx and start the service

2. **Upload your project:**
   - Use File Manager in aaPanel to upload project files to `/www/wwwroot/your-domain.com`
   - Or use Git to clone your repository

#### 1.3 Build and Deploy
1. **Build the project:**
   ```bash
   cd /www/wwwroot/your-domain.com
   npm install
   npm run build
   ```

2. **Configure Nginx:**
   - Go to Website → Add Site
   - Set domain name and root directory to `/www/wwwroot/your-domain.com/dist`
   - Enable SSL if needed

### Step 2: Setup Cloudflare Tunnel

#### 2.1 Install Cloudflare Tunnel
1. **Download cloudflared on your server:**
   ```bash
   # Linux AMD64
   wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
   sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
   sudo chmod +x /usr/local/bin/cloudflared
   ```

2. **Authenticate cloudflared:**
   ```bash
   cloudflared tunnel login
   ```
   - This will open a browser to authenticate with Cloudflare

#### 2.2 Create and Configure Tunnel
1. **Create a tunnel:**
   ```bash
   cloudflared tunnel create your-tunnel-name
   ```

2. **Create configuration file:**
   ```bash
   sudo mkdir -p /etc/cloudflared
   sudo nano /etc/cloudflared/config.yml
   ```
   
   Add this configuration:
   ```yaml
   tunnel: your-tunnel-id
   credentials-file: /root/.cloudflared/your-tunnel-id.json
   
   ingress:
     - hostname: your-domain.com
       service: http://localhost:80
     - hostname: www.your-domain.com
       service: http://localhost:80
     - service: http_status:404
   ```

3. **Start the tunnel:**
   ```bash
   cloudflared tunnel route dns your-tunnel-name your-domain.com
   cloudflared tunnel route dns your-tunnel-name www.your-domain.com
   cloudflared tunnel run your-tunnel-name
   ```

4. **Run as service:**
   ```bash
   sudo cloudflared service install
   sudo systemctl start cloudflared
   sudo systemctl enable cloudflared
   ```

### Step 3: Transfer Domain to Cloudflare

#### 3.1 Add Domain to Cloudflare
1. **Log in to Cloudflare Dashboard:**
   - Go to https://dash.cloudflare.com
   - Click "Add a Site"
   - Enter your domain name and select plan (Free is sufficient)

2. **Review DNS records:**
   - Cloudflare will scan and import existing DNS records
   - Verify all important records are present
   - Add any missing records

#### 3.2 Change Nameservers
1. **Get Cloudflare nameservers:**
   - Copy the nameservers provided by Cloudflare (e.g., `nina.ns.cloudflare.com`, `walt.ns.cloudflare.com`)

2. **Update at your domain registrar:**
   - Log in to your domain registrar (GoDaddy, Namecheap, etc.)
   - Find DNS/Nameserver settings
   - Replace existing nameservers with Cloudflare nameservers
   - Save changes (propagation can take 24-48 hours)

### Step 4: Connect Domain with Server

#### 4.1 Configure DNS in Cloudflare
1. **Add A records:**
   - Go to Cloudflare Dashboard → DNS
   - Add A record: `your-domain.com` → `your-server-ip`
   - Add A record: `www.your-domain.com` → `your-server-ip`
   - Set proxy status to "Proxied" (orange cloud)

2. **Configure SSL/TLS:**
   - Go to SSL/TLS → Overview
   - Set encryption mode to "Flexible" or "Full (strict)" if you have SSL on server
   - Enable "Always Use HTTPS"

#### 4.2 Final Configuration
1. **Update aaPanel site settings:**
   - Go to Website → your site → Settings
   - Add your domain to the binding
   - Configure SSL certificate (use Cloudflare origin certificate for better security)

2. **Test your deployment:**
   - Visit `https://your-domain.com`
   - Verify all features work correctly
   - Check mobile responsiveness

### Step 5: Additional Optimizations

#### 5.1 Cloudflare Performance
- Enable Brotli compression
- Configure caching rules
- Enable minification for CSS, HTML, JS
- Set up Page Rules for better caching

#### 5.2 Security Settings
- Enable WAF (Web Application Firewall)
- Configure rate limiting
- Set up custom error pages
- Enable DNSSEC

#### 5.3 Monitoring
- Set up Cloudflare Analytics
- Configure uptime monitoring
- Set up email alerts for downtime

## Troubleshooting

### Common Issues

1. **Build fails:**
   - Check Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

2. **DNS not resolving:**
   - Wait for DNS propagation (up to 48 hours)
   - Check nameserver configuration
   - Verify DNS records in Cloudflare

3. **SSL errors:**
   - Check SSL/TLS encryption mode in Cloudflare
   - Verify certificate installation on server
   - Clear browser cache and cookies

4. **Performance issues:**
   - Enable Cloudflare caching
   - Optimize images and assets
   - Use compression (Gzip/Brotli)

## Support

For deployment issues:
- Check aaPanel documentation: https://www.aapanel.com/new/docs
- Cloudflare support: https://support.cloudflare.com/
- Server logs in aaPanel → Files → Logs

## License

This project is built with Lovable and can be deployed anywhere.
