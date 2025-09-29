<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulador de Investimentos</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="background-gif"></div>
    <header>
        <div class="logo">
            <img src="../img/logo.png" alt="Logo" />
            <span>Finance galaxy</span>
        </div>
        <nav>
            <a href="../index.php">Homepage</a>
            <a href="../Pagina_1/index.php">Gerenciador de gastos</a>
            <a href="../Pagina_2/index.php">Simulador de Financiamento</a>
            <a href="../Pagina_4/index.php">Educação Financeira</a>
        </nav>
    </header>

    <div class="main-content">
        <div class="container">
            <h1>Simulador de Investimentos</h1>
            <div class="input-group">
                <label for="tipoInvestimento">Tipo de Investimento:</label>
                <select id="tipoInvestimento">
                    <option value="rendaFixa">Renda Fixa (Geral)</option>
                    <option value="fundosImobiliarios">Fundos Imobiliários</option>
                    <option value="cdb">CDB</option>
                    <option value="lciLca">LCI/LCA</option>
                    <option value="acoes">Ações (Estimativa)</option>
                </select>
            </div>

            <div class="input-group">
                <label for="valorInicial">Valor Inicial (R$):</label>
                <input type="number" id="valorInicial" value="1000" min="0">
            </div>

            <div class="input-group">
                <label for="aporteMensal">Aporte Mensal (R$):</label>
                <input type="number" id="aporteMensal" value="100" min="0">
            </div>

            <div class="input-group">
                <label for="prazo">Prazo (meses):</label>
                <input type="number" id="prazo" value="12" min="1">
            </div>

            <div class="input-group">
                <label for="taxaJuros">Taxa de Juros Anual (%):</label>
                <input type="number" id="taxaJuros" value="10" step="0.1" min="0">
            </div>

            <div class="input-group">
                <label for="taxaInflacao">Taxa de Inflação Anual (%):</label>
                <input type="number" id="taxaInflacao" value="4" step="0.1" min="0">
            </div>

            <div class="input-group checkbox-group">
                <input type="checkbox" id="incluirImpostos" checked>
                <label for="incluirImpostos">Incluir Impostos (IR Renda Fixa)</label>
            </div>
            
            <button onclick="simular()">Simular Agora</button>

            <h2>Resultados da Simulação:</h2>
            <div id="resultado">
                <!-- Resultados serão injetados aqui pelo JavaScript -->
            </div>
        </div>

        <div class="chart-and-insights">
            <div class="chart-container">
                <h3>Gráfico de Crescimento:</h3>
                <canvas id="myChart"></canvas>
            </div>
            <div id="insights-box" class="insights-box">
                <h4>Entenda Seus Resultados:</h4>
                <p>Observe como a inflação (representada na linha de valor líquido) afeta o poder de compra do seu dinheiro ao longo do tempo. O valor líquido real é o que realmente importa!</p>
                <p>Considere aumentar o aporte mensal para acelerar o crescimento do seu capital.</p>
                <p>Diversificar seus investimentos pode mitigar riscos. Explore diferentes tipos de ativos.</p>
                <a href="../Pagina_4/index.php" class="insights-link">Aprenda mais sobre Investimentos!</a>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="./script.js"></script>

    <footer>
        <p>&copy; 2025 Educação Financeira - Todos os direitos reservados.</p>
    </footer>
</body>
</html>