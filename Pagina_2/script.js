document.addEventListener('DOMContentLoaded', () => {
    const ctxLinha = document.getElementById('graficoLinha').getContext('2d');
    window.graficoLinha = new Chart(ctxLinha, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Saldo Devedor (R$)',
                    data: [],
                    borderColor: 'rgba(0, 240, 255, 1)',
                    backgroundColor: 'rgba(0, 240, 255, 0.2)',
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Juros Acumulados (R$)',
                    data: [],
                    borderColor: 'rgba(255, 0, 255, 1)',
                    backgroundColor: 'rgba(255, 0, 255, 0.2)',
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Mês',
                        color: '#a5d0ff'
                    },
                    ticks: {
                        color: '#e0e0e0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor (R$)',
                        color: '#a5d0ff'
                    },
                    ticks: {
                        color: '#e0e0e0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e0e0'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 40, 0.8)',
                    titleColor: '#00f0ff',
                    bodyColor: '#e0e0e0'
                }
            }
        }
    });
});

function calcular() {
    const tipo = document.getElementById('tipo').value;
    const valorFinanciado = parseFloat(document.getElementById('valor').value);
    const taxaJurosMensal = parseFloat(document.getElementById('juros').value) / 100;
    const prazoMeses = parseInt(document.getElementById('prazo').value);
    const resultadoDiv = document.getElementById('resultado');
    const tabelaCorpo = document.querySelector('#tabelaAmortizacao tbody');

    if (isNaN(valorFinanciado) || isNaN(taxaJurosMensal) || isNaN(prazoMeses) ||
        valorFinanciado <= 0 || taxaJurosMensal < 0 || prazoMeses <= 0) {
        resultadoDiv.innerHTML = '<p style="color: #ff4c4c;">Por favor, insira valores válidos para todos os campos.</p>';
        tabelaCorpo.innerHTML = '';
        window.graficoLinha.data.labels = [];
        window.graficoLinha.data.datasets[0].data = [];
        window.graficoLinha.data.datasets[1].data = [];
        window.graficoLinha.update();
        return;
    }

    let parcelaMensal;
    let jurosTotal = 0;
    let valorTotalPago = 0;
    let saldoDevedor = valorFinanciado;

    // Dados para o gráfico
    const labelsGrafico = [];
    const saldoDevedorGrafico = [];
    const jurosAcumuladosGrafico = [];
    let acumuladoJuros = 0;

    tabelaCorpo.innerHTML = '';

    if (taxaJurosMensal === 0) {
        parcelaMensal = valorFinanciado / prazoMeses;
        for (let i = 1; i <= prazoMeses; i++) {
            const jurosMes = 0;
            const amortizacaoMes = parcelaMensal;
            saldoDevedor -= amortizacaoMes;
            valorTotalPago += parcelaMensal;

            if (i === prazoMeses) {
                saldoDevedor = 0;
            }

            const newRow = tabelaCorpo.insertRow();
            newRow.innerHTML = `
                <td>${i}</td>
                <td>${parcelaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>${jurosMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>${amortizacaoMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>${saldoDevedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            `;

            // Adiciona dados para o gráfico
            labelsGrafico.push(`Mês ${i}`);
            saldoDevedorGrafico.push(saldoDevedor);
            jurosAcumuladosGrafico.push(0);
        }
        jurosTotal = 0;

    } else {
        parcelaMensal = valorFinanciado * (taxaJurosMensal / (1 - Math.pow(1 + taxaJurosMensal, -prazoMeses)));

        for (let i = 1; i <= prazoMeses; i++) {
            const jurosMes = saldoDevedor * taxaJurosMensal;
            const amortizacaoMes = parcelaMensal - jurosMes;
            saldoDevedor -= amortizacaoMes;
            jurosTotal += jurosMes;
            valorTotalPago += parcelaMensal;
            acumuladoJuros += jurosMes;

            if (i === prazoMeses) {
                saldoDevedor = 0;
            }

            const newRow = tabelaCorpo.insertRow();
            newRow.innerHTML = `
                <td>${i}</td>
                <td>${parcelaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>${jurosMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>${amortizacaoMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>${saldoDevedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            `;

            labelsGrafico.push(`Mês ${i}`);
            saldoDevedorGrafico.push(saldoDevedor);
            jurosAcumuladosGrafico.push(acumuladoJuros);
        }
    }

    resultadoDiv.innerHTML = `
        <p><strong>Tipo:</strong> ${tipo}</p>
        <p><strong>Valor da Parcela Mensal:</strong> ${parcelaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p><strong>Valor Total Pago:</strong> ${valorTotalPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p><strong>Total de Juros Pagos:</strong> ${jurosTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
    `;

    window.graficoLinha.data.labels = labelsGrafico;
    window.graficoLinha.data.datasets[0].data = saldoDevedorGrafico;
    window.graficoLinha.data.datasets[1].data = jurosAcumuladosGrafico;
    window.graficoLinha.update();
}