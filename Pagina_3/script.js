let myChart;

function simular() {
    const tipoInvestimento = document.getElementById('tipoInvestimento').value;
    let valorInicial = parseFloat(document.getElementById('valorInicial').value);
    const aporteMensal = parseFloat(document.getElementById('aporteMensal').value) || 0;
    const prazoMeses = parseInt(document.getElementById('prazo').value); 
    let taxaJurosAnual = parseFloat(document.getElementById('taxaJuros').value) / 100;
    const taxaInflacaoAnual = parseFloat(document.getElementById('taxaInflacao').value) / 100 || 0;
    const incluirImpostos = document.getElementById('incluirImpostos').checked;

    
    if (isNaN(valorInicial) || valorInicial < 0) {
        alert("Por favor, insira um valor inicial válido e não negativo.");
        return;
    }
    if (isNaN(aporteMensal) || aporteMensal < 0) {
        alert("Por favor, insira um valor de aporte mensal válido e não negativo.");
        return;
    }
    if (isNaN(prazoMeses) || prazoMeses <= 0) {
        alert("Por favor, insira um prazo em meses válido e positivo.");
        return;
    }
    if (isNaN(taxaJurosAnual) || taxaJurosAnual < 0) {
        alert("Por favor, insira uma taxa de juros anual válida e não negativa.");
        return;
    }
    if (isNaN(taxaInflacaoAnual) || taxaInflacaoAnual < 0) {
        alert("Por favor, insira uma taxa de inflação anual válida e não negativa.");
        return;
    }

    const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1/12) - 1;
    const taxaInflacaoMensal = Math.pow(1 + taxaInflacaoAnual, 1/12) - 1;
    let valorAtualBruto = valorInicial;
    let valorAtualLiquido = valorInicial;
    let capitalInvestido = valorInicial;
    let totalJurosBrutos = 0;
    let totalImpostos = 0;

    const historicoValoresBrutos = [valorInicial];
    const historicoValoresLiquidos = [valorInicial];
    const historicoCapitalInvestido = [valorInicial];
    const labels = ["Mês 0"];

    for (let i = 1; i <= prazoMeses; i++) {
        
        capitalInvestido += aporteMensal;
        valorAtualBruto += aporteMensal;
        valorAtualLiquido += aporteMensal;


        
        const jurosDoMesBruto = valorAtualBruto * taxaJurosMensal;
        valorAtualBruto += jurosDoMesBruto;
        totalJurosBrutos += jurosDoMesBruto;

        
        const jurosDoMesLiquido = valorAtualLiquido * taxaJurosMensal;
        valorAtualLiquido += jurosDoMesLiquido;


        
        if (taxaInflacaoMensal > 0) {
            valorAtualLiquido = valorAtualLiquido / (1 + taxaInflacaoMensal);
        }

        historicoValoresBrutos.push(valorAtualBruto);
        historicoValoresLiquidos.push(valorAtualLiquido);
        historicoCapitalInvestido.push(capitalInvestido);
        labels.push(`Mês ${i}`);
    }

    let jurosLiquidosTotaisAposImpostos = totalJurosBrutos;
    if (incluirImpostos) {
        let aliquotaIR;
        if (prazoMeses <= 6) {
            aliquotaIR = 0.225;
        } else if (prazoMeses <= 12) {
            aliquotaIR = 0.20;
        } else if (prazoMeses <= 24) {
            aliquotaIR = 0.175;
        } else {
            aliquotaIR = 0.15;
        }

        if (tipoInvestimento === 'lciLca') {
            aliquotaIR = 0; 
        }

        totalImpostos = totalJurosBrutos * aliquotaIR;
        jurosLiquidosTotaisAposImpostos = totalJurosBrutos - totalImpostos;

        
        
        
        if (historicoValoresLiquidos.length > 0) {
            historicoValoresLiquidos[historicoValoresLiquidos.length - 1] -= totalImpostos;
        }
    }


    const valorFinalBruto = valorAtualBruto;
    const valorFinalLiquido = historicoValoresLiquidos[historicoValoresLiquidos.length - 1]; 

    const resultadoDiv = document.getElementById('resultado');
    if (resultadoDiv) { 
        resultadoDiv.innerHTML = `
            <p><strong>Tipo de Investimento:</strong> ${getInvestmentTypeName(tipoInvestimento)}</p>
            <p><strong>Valor Inicial:</strong> R$ ${valorInicial.toFixed(2)}</p>
            <p><strong>Aporte Mensal:</strong> R$ ${aporteMensal.toFixed(2)}</p>
            <p><strong>Prazo:</strong> ${prazoMeses} meses</p>
            <p><strong>Taxa de Juros Anual:</strong> ${(taxaJurosAnual * 100).toFixed(2)}%</p>
            <p><strong>Taxa de Inflação Anual:</strong> ${(taxaInflacaoAnual * 100).toFixed(2)}%</p>
            <p><strong>Capital Total Investido:</strong> R$ ${capitalInvestido.toFixed(2)}</p>
            <p><strong>Juros Brutos Acumulados:</strong> R$ ${totalJurosBrutos.toFixed(2)}</p>
            <p><strong>Impostos (Estimativa):</strong> R$ ${totalImpostos.toFixed(2)}</p>
            <p><strong>Juros Líquidos Acumulados (pós-IR):</strong> R$ ${jurosLiquidosTotaisAposImpostos.toFixed(2)}</p>
            <p><strong>Valor Final Bruto (sem IR):</strong> R$ ${valorFinalBruto.toFixed(2)}</p>
            <p><strong>Valor Final Líquido (com IR e Inflação):</strong> R$ ${valorFinalLiquido.toFixed(2)}</p>
        `;
    }


    
    updateChart(labels, historicoValoresBrutos, historicoValoresLiquidos, historicoCapitalInvestido);
}

function getInvestmentTypeName(value) {
    switch (value) {
        case 'rendaFixa': return 'Renda Fixa (Geral)';
        case 'fundosImobiliarios': return 'Fundos Imobiliários';
        case 'cdb': return 'CDB';
        case 'lciLca': return 'LCI/LCA';
        case 'acoes': return 'Ações';
        default: return value;
    }
}

function preencherTaxaPorTipo() {
    const tipoInvestimento = document.getElementById('tipoInvestimento').value;
    const taxaJurosInput = document.getElementById('taxaJuros');
    switch (tipoInvestimento) {
        case 'rendaFixa':
            taxaJurosInput.value = 11;
            break;
        case 'fundosImobiliarios':
            taxaJurosInput.value = 8;
            break;
        case 'cdb':
            taxaJurosInput.value = 12;
            break; 
        case 'lciLca':
            taxaJurosInput.value = 10;
            break;
        case 'acoes':
            taxaJurosInput.value = 15;
            break;
        default:
            taxaJurosInput.value = 10;
    }
}


function updateChart(labels, dataBruto, dataLiquido, dataCapital) {
    const ctx = document.getElementById('myChart');
    if (!ctx) { 
        console.error("Canvas element with ID 'myChart' not found.");
        return;
    }
    const context = ctx.getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(context, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Capital Investido (R$)',
                    data: dataCapital,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#4CAF50',
                    pointBorderColor: '#fff'
                },
                {
                    label: 'Valor Bruto Acumulado (R$)',
                    data: dataBruto,
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#2196F3',
                    pointBorderColor: '#fff'
                },
                {
                    label: 'Valor Líquido Acumulado (R$)',
                    data: dataLiquido,
                    borderColor: '#FFC107',
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#FFC107',
                    pointBorderColor: '#fff'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Crescimento do Investimento ao Longo do Tempo',
                    color: '#a5d0ff',
                    font: {
                        size: 18,
                        family: 'Roboto'
                    }
                },
                legend: {
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Roboto'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses',
                        color: '#a5d0ff',
                        font: {
                            family: 'Roboto'
                        }
                    },
                    ticks: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Roboto'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor (R$)',
                        color: '#a5d0ff',
                        font: {
                            family: 'Roboto'
                        }
                    },
                    ticks: {
                        color: '#e0e0e0',
                        callback: function(value, index, ticks) {
                            return 'R$ ' + value.toFixed(2);
                        },
                        font: {
                            family: 'Roboto'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    preencherTaxaPorTipo();
    
    simular();
});

document.getElementById('tipoInvestimento')?.addEventListener('change', () => { 
    preencherTaxaPorTipo();
    simular();
});

document.getElementById('valorInicial')?.addEventListener('input', simular);
document.getElementById('aporteMensal')?.addEventListener('input', simular);
document.getElementById('prazo')?.addEventListener('input', simular);
document.getElementById('taxaJuros')?.addEventListener('input', simular);
document.getElementById('taxaInflacao')?.addEventListener('input', simular);
document.getElementById('incluirImpostos')?.addEventListener('change', simular);