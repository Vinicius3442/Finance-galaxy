<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Simulador de Financiamento</title>
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
            <a href="../Pagina_3/index.php">Simulador de Investimentos</a>
            <a href="../Pagina_4/index.php">Educação Financeira</a>
        </nav>
    </header>

    <div class="container">
        <h1>Simulador de Financiamento</h1>

        <label for="tipo">Tipo de financiamento:</label>
        <select id="tipo">
          <option value="imobiliario">Imobiliário</option>
          <option value="veicular">Veicular</option>
          <option value="pessoal">Pessoal</option>
        </select>
        <br><br>

        <label for="valor">Valor financiado (R$):</label>
        <input type="number" id="valor">
        <br><br>

        <label for="juros">Taxa de juros (% ao mês):</label>
        <input type="number" id="juros" step="0.01">
        <br><br>

        <label for="prazo">Prazo (meses):</label>
        <input type="number" id="prazo">
        <br><br>

        <button onclick="calcular()">Calcular</button>

        <h2>Resultado:</h2>
        <div id="resultado"></div>

        <h2>Evolução da Dívida:</h2>
        <canvas id="graficoLinha" width="400" height="200"></canvas>

        <h2>Tabela de Amortização:</h2>
        <table id="tabelaAmortizacao">
            <thead>
                <tr>
                    <th>Mês</th>
                    <th>Valor da Parcela (R$)</th>
                    <th>Juros (R$)</th>
                    <th>Amortização (R$)</th>
                    <th>Saldo Devedor (R$)</th>
                </tr>
            </thead>
            <tbody>
                <!-- As linhas da tabela serão adicionadas aqui pelo JavaScript -->
            </tbody>
        </table>
    </div>
</body>
</html>