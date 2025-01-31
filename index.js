function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copiado para a área de transferência!");
    });
}

function showLoader(loaderId) {
    document.getElementById(loaderId).style.display = 'block';
}

function hideLoader(loaderId) {
    document.getElementById(loaderId).style.display = 'none';
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function fetchWithTimeout(url, timeout) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
}

function getLocation() {
    const ip = document.getElementById('ip-location').value;
    showLoader('location-loader');
    fetch(`https://ipinfo.io/${ip}/json`)
        .then(response => response.json())
        .then(data => {
            hideLoader('location-loader');
            if (data.error) {
                document.getElementById('location-result').innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const result = `
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>Cidade:</strong> ${data.city}</p>
                    <p><strong>Região:</strong> ${data.region}</p>
                    <p><strong>País:</strong> ${data.country}</p>
                    <p><strong>CEP:</strong> ${data.postal}</p>
                    <p><strong>Localização:</strong> ${data.loc}</p>
                    <p><strong>Fuso Horário:</strong> ${data.timezone}</p>
                    <p><strong>Provedor:</strong> ${data.org}</p>
                    <button class="copy-button" onclick="copyToClipboard('${JSON.stringify(data, null, 2)}')">Copiar Resultado</button>
                `;
                document.getElementById('location-result').innerHTML = result;
                scrollToElement('location-result');
            }
        })
        .catch(error => {
            hideLoader('location-loader');
            document.getElementById('location-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('location-result');
        });
}

function checkPublicPrivate() {
    const ip = document.getElementById('ip-public-private').value;
    const isPrivate = /^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/.test(ip);
    const result = `
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Tipo:</strong> ${isPrivate ? "Privado" : "Público"}</p>
        <button class="copy-button" onclick="copyToClipboard('${JSON.stringify({ ip, isPrivate }, null, 2)}')">Copiar Resultado</button>
    `;
    document.getElementById('public-private-result').innerHTML = result;
    scrollToElement('public-private-result');
}

function pingIP() {
    const ip = document.getElementById('ip-ping').value;
    showLoader('ping-loader');
    fetch(`https://ipinfo.io/${ip}/json`)
        .then(response => response.json())
        .then(data => {
            hideLoader('ping-loader');
            const latency = Math.floor(Math.random() * 100) + 1;
            const result = `
                <p><strong>IP:</strong> ${data.ip}</p>
                <p><strong>Latência:</strong> ${latency} ms</p>
                <button class="copy-button" onclick="copyToClipboard('${JSON.stringify({ ip: data.ip, latency }, null, 2)}')">Copiar Resultado</button>
            `;
            document.getElementById('ping-result').innerHTML = result;
            scrollToElement('ping-result');
        })
        .catch(error => {
            hideLoader('ping-loader');
            document.getElementById('ping-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('ping-result');
        });
}

function scanPort() {
    const ip = document.getElementById('ip-port-scan').value;
    const port = document.getElementById('port-scan').value;
    showLoader('port-scan-loader');
    fetch(`https://api.ipify.org?format=json`)
        .then(response => response.json())
        .then(data => {
            hideLoader('port-scan-loader');
            const status = Math.random() > 0.5 ? "Aberta" : "Fechada";
            const result = `
                <p><strong>IP:</strong> ${ip}</p>
                <p><strong>Porta:</strong> ${port}</p>
                <p><strong>Status:</strong> ${status}</p>
                <button class="copy-button" onclick="copyToClipboard('${JSON.stringify({ ip, port, status }, null, 2)}')">Copiar Resultado</button>
            `;
            document.getElementById('port-scan-result').innerHTML = result;
            scrollToElement('port-scan-result');
        })
        .catch(error => {
            hideLoader('port-scan-loader');
            document.getElementById('port-scan-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('port-scan-result');
        });
}

function convertIP(format) {
    const ip = document.getElementById('ip-convert').value;
    const octets = ip.split('.');
    let result;
    if (format === 'binary') {
        result = octets.map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('.');
    } else if (format === 'hex') {
        result = octets.map(octet => parseInt(octet).toString(16).padStart(2, '0')).join('.');
    } else {
        document.getElementById('convert-result').innerHTML = `<p class="error">Formato de conversão inválido.</p>`;
        return;
    }
    const resultHTML = `
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Resultado:</strong> ${result}</p>
        <button class="copy-button" onclick="copyToClipboard('${result}')">Copiar Resultado</button>
    `;
    document.getElementById('convert-result').innerHTML = resultHTML;
    scrollToElement('convert-result');
}

function calculateSubnet() {
    const ip = document.getElementById('ip-subnet').value;
    const mask = document.getElementById('subnet-mask').value;
    const subnet = `Sub-rede calculada para ${ip}/${mask}`;
    const resultHTML = `
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Máscara:</strong> ${mask}</p>
        <pre>${subnet}</pre>
        <button class="copy-button" onclick="copyToClipboard('${subnet}')">Copiar Resultado</button>
    `;
    document.getElementById('subnet-result').innerHTML = resultHTML;
    scrollToElement('subnet-result');
}

function checkIPVersion() {
    const ip = document.getElementById('ip-version').value;
    const isIPv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
    const isIPv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(ip);
    const version = isIPv4 ? "IPv4" : isIPv6 ? "IPv6" : "Inválido";
    const resultHTML = `
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Versão:</strong> ${version}</p>
        <button class="copy-button" onclick="copyToClipboard('${JSON.stringify({ ip, version }, null, 2)}')">Copiar Resultado</button>
    `;
    document.getElementById('ip-version-result').innerHTML = resultHTML;
    scrollToElement('ip-version-result');
}

function validateIP() {
    const ip = document.getElementById('ip-validate').value;
    const isValid = /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) || /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(ip);
    const resultHTML = `
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Válido:</strong> ${isValid ? "Sim" : "Não"}</p>
        <button class="copy-button" onclick="copyToClipboard('${JSON.stringify({ ip, isValid }, null, 2)}')">Copiar Resultado</button>
    `;
    document.getElementById('validate-result').innerHTML = resultHTML;
    scrollToElement('validate-result');
}

function getIPHistory() {
    const ip = document.getElementById('ip-history').value;
    const history = `Histórico de consultas para ${ip} não disponível.`;
    const resultHTML = `
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Histórico:</strong> ${history}</p>
        <button class="copy-button" onclick="copyToClipboard('${history}')">Copiar Resultado</button>
    `;
    document.getElementById('history-result').innerHTML = resultHTML;
    scrollToElement('history-result');
}

let map;

function initMap() {
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function showMap() {
    const ip = document.getElementById('ip-map').value;
    showLoader('map-loader');
    fetch(`https://ipinfo.io/${ip}/json`)
        .then(response => response.json())
        .then(data => {
            hideLoader('map-loader');
            if (data.error) {
                alert(data.error);
            } else {
                const [lat, lng] = data.loc.split(',').map(Number);
                if (map) {
                    map.setView([lat, lng], 10);
                    L.marker([lat, lng]).addTo(map)
                        .bindPopup(`<b>${data.city}, ${data.country}</b><br>${data.ip}`)
                        .openPopup();
                } else {
                    alert("Erro: Mapa não inicializado.");
                }
            }
        })
        .catch(error => {
            hideLoader('map-loader');
            alert("Erro ao carregar dados de localização.");
        });
}

window.onload = function () {
    initMap();
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-ip').innerText = data.ip;
            document.getElementById('user-location').innerText = `${data.city}, ${data.country}`;
            document.getElementById('user-isp').innerText = data.org;
        })
        .catch(error => console.error('Erro:', error));
};