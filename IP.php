<?php
header('Content-Type: application/json');

$action = $_GET['action'];
$ip = $_GET['ip'];

// Função para fazer requisições HTTP com timeout
function fetchData($url) {
    $context = stream_context_create([
        'http' => [
            'timeout' => 5 // Timeout de 5 segundos
        ]
    ]);
    return @file_get_contents($url, false, $context);
}

switch ($action) {
    case 'location':
        $url = "https://ipinfo.io/{$ip}/json";
        $response = fetchData($url);
        if ($response === FALSE) {
            echo json_encode(['error' => 'Erro ao obter localização.']);
        } else {
            $data = json_decode($response, true);
            echo json_encode([
                'ip' => $data['ip'],
                'city' => $data['city'],
                'region' => $data['region'],
                'country' => $data['country'],
                'postal' => $data['postal'],
                'location' => $data['loc'],
                'timezone' => $data['timezone'],
                'isp' => $data['org']
            ]);
        }
        break;

    case 'public-private':
        $isPrivate = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === FALSE;
        echo json_encode([
            'ip' => $ip,
            'isPrivate' => $isPrivate
        ]);
        break;

    case 'ping':
        $latency = @shell_exec("ping -c 4 {$ip} | tail -1 | awk '{print $4}' | cut -d '/' -f 2");
        if ($latency === NULL) {
            echo json_encode(['error' => 'Erro ao realizar ping.']);
        } else {
            echo json_encode([
                'ip' => $ip,
                'latency' => trim($latency)
            ]);
        }
        break;

    case 'port-scan':
        $port = isset($_GET['port']) ? (int)$_GET['port'] : 80;
        $connection = @fsockopen($ip, $port, $errno, $errstr, 2);
        if (is_resource($connection)) {
            fclose($connection);
            echo json_encode([
                'ip' => $ip,
                'port' => $port,
                'status' => 'Aberta'
            ]);
        } else {
            echo json_encode([
                'ip' => $ip,
                'port' => $port,
                'status' => 'Fechada'
            ]);
        }
        break;

    case 'convert':
        $format = $_GET['format'];
        $octets = explode('.', $ip);
        if ($format === 'binary') {
            $result = implode('.', array_map(function ($octet) {
                return decbin($octet);
            }, $octets));
        } else if ($format === 'hex') {
            $result = implode('.', array_map(function ($octet) {
                return dechex($octet);
            }, $octets));
        } else {
            echo json_encode(['error' => 'Formato de conversão inválido.']);
            break;
        }
        echo json_encode([
            'ip' => $ip,
            'result' => $result
        ]);
        break;

    case 'subnet':
        $mask = $_GET['mask'];
        $subnet = @shell_exec("ipcalc {$ip}/{$mask}");
        if ($subnet === NULL) {
            echo json_encode(['error' => 'Erro ao calcular sub-rede.']);
        } else {
            echo json_encode([
                'ip' => $ip,
                'mask' => $mask,
                'subnet' => trim($subnet)
            ]);
        }
        break;

    case 'ip-version':
        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
            echo json_encode([
                'ip' => $ip,
                'version' => 'IPv4'
            ]);
        } else if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) {
            echo json_encode([
                'ip' => $ip,
                'version' => 'IPv6'
            ]);
        } else {
            echo json_encode(['error' => 'IP inválido.']);
        }
        break;

    case 'validate':
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            echo json_encode([
                'ip' => $ip,
                'isValid' => true
            ]);
        } else {
            echo json_encode([
                'ip' => $ip,
                'isValid' => false
            ]);
        }
        break;

    case 'history':
        echo json_encode(['error' => 'Histórico de IP não disponível.']);
        break;

    default:
        echo json_encode(['error' => 'Ação inválida.']);
        break;
}
?>