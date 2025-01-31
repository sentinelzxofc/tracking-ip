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
    fetchWithTimeout(`IP.php?action=location&ip=${ip}`, 5000)
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
                    <p><strong>Localização:</strong> ${data.location}</p>
                    <p><strong>Fuso Horário:</strong> ${data.timezone}</p>
                    <p><strong>Provedor:</strong> ${data.isp}</p>
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
    showLoader('public-private-loader');
    fetchWithTimeout(`IP.php?action=public-private&ip=${ip}`, 5000)
        .then(response => response.json())
        .then(data => {
            hideLoader('public-private-loader');
            if (data.error) {
                document.getElementById('public-private-result').innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const result = `
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>Tipo:</strong> ${data.isPrivate ? "Privado" : "Público"}</p>
                    <button class="copy-button" onclick="copyToClipboard('${JSON.stringify(data, null, 2)}')">Copiar Resultado</button>
                `;
                document.getElementById('public-private-result').innerHTML = result;
                scrollToElement('public-private-result');
            }
        })
        .catch(error => {
            hideLoader('public-private-loader');
            document.getElementById('public-private-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('public-private-result');
        });
}

function pingIP() {
    const ip = document.getElementById('ip-ping').value;
    showLoader('ping-loader');
    fetchWithTimeout(`IP.php?action=ping&ip=${ip}`, 5000)
        .then(response => response.json())
        .then(data => {
            hideLoader('ping-loader');
            if (data.error) {
                document.getElementById('ping-result').innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const result = `
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>Latência:</strong> ${data.latency} ms</p>
                    <button class="copy-button" onclick="copyToClipboard('${JSON.stringify(data, null, 2)}')">Copiar Resultado</button>
                `;
                document.getElementById('ping-result').innerHTML = result;
                scrollToElement('ping-result');
            }
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
    fetchWithTimeout(`IP.php?action=port-scan&ip=${ip}&port=${port}`, 5000)
        .then(response => response.json())
        .then(data => {
            hideLoader('port-scan-loader');
            if (data.error) {
                document.getElementById('port-scan-result').innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const result = `
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>Porta:</strong> ${data.port}</p>
                    <p><strong>Status:</strong> ${data.status}</p>
                    <button class="copy-button" onclick="copyToClipboard('${JSON.stringify(data, null, 2)}')">Copiar Resultado</button>
                `;
                document.getElementById('port-scan-result').innerHTML = result;
                scrollToElement('port-scan-result');
            }
        })
        .catch(error => {
            hideLoader('port-scan-loader');
            document.getElementById('port-scan-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('port-scan-result');
        });
}

function convertIP(format) {
    const ip = document.getElementById('ip-convert').value;
    showLoader('convert-loader');
    fetchWithTimeout(`IP.php?action=convert&ip=${ip}&format=${format}`, 5000)
        .then(response => response.json())
        .then(data => {
            hideLoader('convert-loader');
            if (data.error) {
                document.getElementById('convert-result').innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const result = `
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>Resultado:</strong> ${data.result}</p>
                    <button class="copy-button" onclick="copyToClipboard('${data.result}')">Copiar Resultado</button>
                `;
                document.getElementById('convert-result').innerHTML = result;
                scrollToElement('convert-result');
            }
        })
        .catch(error => {
            hideLoader('convert-loader');
            document.getElementById('convert-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('convert-result');
        });
}

function calculateSubnet() {
    const ip = document.getElementById('ip-subnet').value;
    const mask = document.getElementById('subnet-mask').value;
    showLoader('subnet-loader');
    fetchWithTimeout(`IP.php?action=subnet&ip=${ip}&mask=${mask}`, 5000)
        .then(response => response.json())
        .then(data => {
            hideLoader('subnet-loader');
            if (data.error) {
                document.getElementById('subnet-result').innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const result = `
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>Máscara:</strong> ${data.mask}</p>
                    <pre>${data.subnet}</pre>
                    <button class="copy-button" onclick="copyToClipboard('${data.subnet}')">Copiar Resultado</button>
                `;
                document.getElementById('subnet-result').innerHTML = result;
                scrollToElement('subnet-result');
            }
        })
        .catch(error => {
            hideLoader('subnet-loader');
            document.getElementById('subnet-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('subnet-result');
        });
}

function checkIPVersion() {
    const ip = document.getElementById('ip-version').value;
    showLoader('ip-version-loader');
    fetchWithTimeout(`IP.php?action=ip-version&ip=${ip}`, 5000)
        .then(response => response.json())
        .then(data => {
            hideLoader('ip-version-loader');
            if (data.error) {
                document.getElementById('ip-version-result').innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const result = `
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>Versão:</strong> ${data.version}</p>
                    <button class="copy-button" onclick="copyToClipboard('${JSON.stringify(data, null, 2)}')">Copiar Resultado</button>
                `;
                document.getElementById('ip-version-result').innerHTML = result;
                scrollToElement('ip-version-result');
            }
        })
        .catch(error => {
            hideLoader('ip-version-loader');
            document.getElementById('ip-version-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('ip-version-result');
        });
}

function validateIP() {
    const ip = document.getElementById('ip-validate').value;
    showLoader('validate-loader');
    fetchWithTimeout(`IP.php?action=validate&ip=${ip}`, 5000)
        .then(response => response.json())
        .then(data => {
            hideLoader('validate-loader');
            if (data.error) {
                document.getElementById('validate-result').innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const result = `
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>Válido:</strong> ${data.isValid ? "Sim" : "Não"}</p>
                    <button class="copy-button" onclick="copyToClipboard('${JSON.stringify(data, null, 2)}')">Copiar Resultado</button>
                `;
                document.getElementById('validate-result').innerHTML = result;
                scrollToElement('validate-result');
            }
        })
        .catch(error => {
            hideLoader('validate-loader');
            document.getElementById('validate-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('validate-result');
        });
}

function getIPHistory() {
    const ip = document.getElementById('ip-history').value;
    showLoader('history-loader');
    fetchWithTimeout(`IP.php?action=history&ip=${ip}`, 5000)
        .then(response => response.json())
        .then(data => {
            hideLoader('history-loader');
            if (data.error) {
                document.getElementById('history-result').innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const result = `
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>Histórico:</strong> ${data.history}</p>
                    <button class="copy-button" onclick="copyToClipboard('${JSON.stringify(data, null, 2)}')">Copiar Resultado</button>
                `;
                document.getElementById('history-result').innerHTML = result;
                scrollToElement('history-result');
            }
        })
        .catch(error => {
            hideLoader('history-loader');
            document.getElementById('history-result').innerHTML = `<p class="error">Erro ao carregar dados. Verifique sua conexão.</p>`;
            scrollToElement('history-result');
        });
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
    fetchWithTimeout(`IP.php?action=location&ip=${ip}`, 5000)
        .then(response => response.json())
        .then(data => {
            hideLoader('map-loader');
            if (data.error) {
                alert(data.error);
            } else {
                const [lat, lng] = data.location.split(',').map(Number);
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
    fetchWithTimeout('https://ipinfo.io/json', 5000)
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-ip').innerText = data.ip;
            document.getElementById('user-location').innerText = `${data.city}, ${data.country}`;
            document.getElementById('user-isp').innerText = data.org;
        })
        .catch(error => console.error('Erro:', error));
};