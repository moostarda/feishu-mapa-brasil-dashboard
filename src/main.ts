// Mapa Comercial Brasil
import {
  bitable,
  DashboardState,
  Rollup
} from '@lark-base-open/js-sdk';

/**
 * MAPA COMERCIAL BRASIL
 * V7 - Teste inicial do Dashboard SDK
 */

document.body.style.margin = '0';
document.body.style.fontFamily =
  'Inter, Arial, Helvetica, sans-serif';
document.body.style.background = '#ffffff';
document.body.style.color = '#1f2329';

const app = document.getElementById('app');

if (!app) {
  throw new Error('Elemento #app não encontrado.');
}

app.innerHTML = `
  <div style="
    box-sizing:border-box;
    width:100%;
    min-height:100vh;
    padding:24px;
  ">
    <div style="
      border:1px solid #e5e6eb;
      border-radius:12px;
      padding:20px;
      max-width:900px;
      margin:0 auto;
    ">

      <div style="
        font-size:20px;
        font-weight:700;
        margin-bottom:6px;
      ">
        🇧🇷 Mapa Comercial Brasil
      </div>

      <div style="
        font-size:13px;
        color:#646a73;
        margin-bottom:20px;
      ">
        V7 • Dashboard Plugin
      </div>

      <div id="status" style="
        background:#f5f6f7;
        border-radius:8px;
        padding:14px;
        font-size:14px;
      ">
        Inicializando Dashboard SDK...
      </div>

      <div id="details" style="
        margin-top:16px;
        font-size:13px;
        line-height:1.6;
      "></div>

    </div>
  </div>
`;

const statusEl = document.getElementById('status')!;
const detailsEl = document.getElementById('details')!;

function setStatus(text: string) {
  statusEl.textContent = text;
}

function setDetails(html: string) {
  detailsEl.innerHTML = html;
}

function stateName(state: any) {
  if (state === DashboardState.Create) return 'CREATE';
  if (state === DashboardState.Config) return 'CONFIG';
  if (state === DashboardState.View) return 'VIEW';
  if (state === DashboardState.FullScreen) return 'FULLSCREEN';

  return String(state);
}

async function start() {
  try {
    const state = bitable.dashboard.state;

    console.log('Dashboard state:', state);

    setStatus('Dashboard SDK conectado com sucesso.');

    setDetails(`
      <strong>Estado atual:</strong>
      ${stateName(state)}
      <br><br>
      A conexão com o módulo
      <code>bitable.dashboard</code>
      foi estabelecida.
    `);

    /*
     * CREATE / CONFIG
     *
     * Nessa etapa futuramente exibiremos:
     *
     * - seleção da tabela
     * - UF
     * - Receita
     * - Pedidos
     * - Pedidos 5kg
     *
     * e utilizaremos:
     *
     * bitable.dashboard.getPreviewData()
     * bitable.dashboard.saveConfig()
     */

    if (
      state === DashboardState.Create ||
      state === DashboardState.Config
    ) {
      setDetails(`
        <strong>Estado atual:</strong>
        ${stateName(state)}
        <br><br>

        ✅ Dashboard SDK carregado.
        <br>
        ✅ Modo de configuração detectado.
        <br>
        ⏳ Próxima etapa: configurar UF e métricas.
      `);

      return;
    }

    /*
     * VIEW / FULLSCREEN
     *
     * Aqui futuramente renderizaremos
     * o mapa do Brasil.
     */

    if (
      state === DashboardState.View ||
      state === DashboardState.FullScreen
    ) {
      setDetails(`
        <strong>Estado atual:</strong>
        ${stateName(state)}
        <br><br>

        ✅ Dashboard SDK carregado.
        <br>
        ✅ Modo de visualização detectado.
        <br>
        ⏳ Próxima etapa: renderizar o mapa do Brasil.
      `);

      /*
       * Mantemos os listeners desde já.
       * Quando adicionarmos getData(),
       * eles atualizarão automaticamente o mapa.
       */

      bitable.dashboard.onConfigChange(async () => {
        console.log('Configuração do Dashboard alterada.');
      });

      bitable.dashboard.onDataChange(async () => {
        console.log('Dados do Dashboard alterados.');
      });

      return;
    }

    setDetails(`
      ⚠️ O SDK foi carregado, mas recebemos um
      estado de Dashboard ainda não tratado:
      <strong>${stateName(state)}</strong>
    `);

  } catch (error: any) {

    console.error(error);

    setStatus('Erro ao inicializar Dashboard SDK.');

    setDetails(`
      <div style="color:#d93025;">
        <strong>Erro:</strong>
        ${error?.message ?? String(error)}
      </div>
    `);
  }
}

start();
