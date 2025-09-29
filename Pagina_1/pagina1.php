<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Gerenciador de Despesas</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <!-- GIF de fundo -->
    <div class="background-gif"></div>

    <!-- Header -->
    <header>
        <div class="logo">
            <img src="../img/logo.png" alt="Logo" />
            <span>Finance galaxy</span>
        </div>
        <nav>
            <a href="../index.php">Homepage</a>
            <a href="../Pagina_2/index.php">Simulador de Financiamento</a>
            <a href="../Pagina_3/index.php">Simulador de Investimentos</a>
            <a href="../Pagina_4/index.php">Educação Financeira</a>
        </nav>
    </header>

    <div class="container">
        <h1>Gerenciador de Despesas</h1>

        <!-- Formulário adicionar -->
        <form id="formAdd">
            <input type="text" name="categoria" placeholder="Categoria" required>
            <input type="number" step="0.01" name="valor" placeholder="Valor" required>
            <select name="tipo">
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
            </select>
            <button type="submit">Adicionar</button>
        </form>

        <h2>Resumo</h2>
        <p class="entrada">Entradas: R$ <span id="entradas">0,00</span></p>
        <p class="saida">Saídas: R$ <span id="saidas">0,00</span></p>
        <p class="saldo">Saldo Final: R$ <span id="saldo">0,00</span></p>

        <h2>Histórico</h2>
        <table>
            <thead>
                <tr>
                    <th>Categoria</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabela"></tbody>
        </table>
    </div>

    <script>
        async function carregar() {
            let res = await fetch("api.php?action=list");
            let data = await res.json();

            document.getElementById("entradas").innerText = data.entradas.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
            document.getElementById("saidas").innerText = data.saidas.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
            document.getElementById("saldo").innerText = data.saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

            let tabela = document.getElementById("tabela");
            tabela.innerHTML = "";
            data.despesas.forEach(d => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
            <td>${d.categoria}</td>
            <td>R$ ${parseFloat(d.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
            <td class="${d.tipo}">${d.tipo.charAt(0).toUpperCase() + d.tipo.slice(1)}</td>
            <td>${d.data_registro}</td>
            <td>
                <button onclick="editar(${d.id}, '${d.categoria}', ${d.valor}, '${d.tipo}')">✏</button>
                <button onclick="excluir(${d.id})">🗑</button>
            </td>`;
                tabela.appendChild(tr);
            });

            let saldoEl = document.getElementById("saldo");
            if (data.saldo >= 0) {
                saldoEl.style.color = "#00ff7f"; // verde
            } else {
                saldoEl.style.color = "#ff4c4c"; // vermelho
            }

        }

        document.getElementById("formAdd").addEventListener("submit", async e => {
            e.preventDefault();
            let formData = new FormData(e.target);
            await fetch("api.php?action=add", { method: "POST", body: formData });
            e.target.reset();
            carregar();
        });

        async function excluir(id) {
            if (confirm("Deseja excluir essa despesa?")) {
                let formData = new FormData();
                formData.append("id", id);
                await fetch("api.php?action=delete", { method: "POST", body: formData });
                carregar();
            }
        }

        async function editar(id, categoria, valor, tipo) {
            let novaCat = prompt("Categoria:", categoria);
            let novoVal = prompt("Valor:", valor);
            let novoTipo = prompt("Tipo (entrada/saida):", tipo);

            if (novaCat && novoVal && novoTipo) {
                let formData = new FormData();
                formData.append("id", id);
                formData.append("categoria", novaCat);
                formData.append("valor", novoVal);
                formData.append("tipo", novoTipo);
                await fetch("api.php?action=update", { method: "POST", body: formData });
                carregar();
            }
        }

        carregar();
    </script>
</body>

</html>