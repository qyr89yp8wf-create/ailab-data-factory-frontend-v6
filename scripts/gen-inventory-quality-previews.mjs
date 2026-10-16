import { chromium } from 'file:///C:/Users/feidongni/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { mockSignatureSVG } from '../src/mockSignature.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'assets', 'preset-docs');
const sig = (name, seed) => mockSignatureSVG(name, seed);

// ============ 库存清单 IL-01（横向 A4 盘点表式） ============
const warehouse = '厦门保税仓 A 区';
const rows = [
  ['1', 'SKU-731204', '精密连接器', 'JX-2040 镀金', '件', 'B-03-2', '120', '120', '0', ''],
  ['2', 'SKU-204518', '工业传感器', 'SN-88 防爆型', '台', 'B-03-3', '85', '84', '-1', '盘亏'],
  ['3', 'SKU-662031', '包装纸盒', '五层瓦楞 60×40', '箱', 'C-01-1', '340', '340', '0', ''],
  ['4', 'SKU-118790', '铝合金型材', '6063-T5 6m', '件', 'C-02-4', '160', '162', '+2', '盘盈'],
  ['5', 'SKU-330217', '蓝牙模块', 'BT-5.3 低功耗', '件', 'A-05-2', '500', '500', '0', ''],
  ['6', 'SKU-447602', '密封圈', 'FKM φ50', '箱', 'A-05-3', '96', '96', '0', ''],
];
const ilRows = rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
const ilHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; font-family:'Microsoft YaHei','PingFang SC',sans-serif; }
  body { background:#fff; }
  .page { width:1754px; height:1240px; padding:56px 64px; position:relative; color:#1a1a1a; }
  .doc-head { display:flex; justify-content:space-between; align-items:flex-end; border-bottom:3px double #333; padding-bottom:10px; }
  .doc-title { font-size:34px; font-weight:700; letter-spacing:10px; }
  .doc-no { font-size:15px; text-align:right; line-height:1.9; }
  .info-row { display:flex; gap:48px; font-size:16px; padding:14px 4px; }
  table { width:100%; border-collapse:collapse; margin-top:8px; }
  th, td { border:1px solid #444; font-size:14.5px; padding:7px 8px; text-align:center; }
  th { background:#f2f2f2; font-weight:600; }
  td.l { text-align:left; }
  .total td { font-weight:600; background:#fafafa; }
  .sign-row { display:flex; margin-top:34px; }
  .sign-cell { flex:1; display:flex; align-items:center; gap:10px; border:1px solid #444; padding:12px 16px; font-size:15px; }
  .sign-cell + .sign-cell { border-left:none; }
  .sig-name { font-weight:600; }
  .sig-svg { width:110px; height:34px; }
  .foot { position:absolute; bottom:26px; left:64px; right:64px; font-size:12.5px; color:#666; display:flex; justify-content:space-between; }
</style></head><body><div class="page">
  <div class="doc-head">
    <div class="doc-title">库存盘点清单</div>
    <div class="doc-no">单据编号：IL-2026-1027<br>页码：第 1 页 / 共 1 页</div>
  </div>
  <div class="info-row"><span>仓库名称：${warehouse}</span><span>盘点日期：2026-09-15</span><span>盘点类型：月度例行盘点</span></div>
  <table>
    <tr><th>序号</th><th>商品编码</th><th>商品名称</th><th>规格型号</th><th>单位</th><th>库位</th><th>账面数量</th><th>实盘数量</th><th>差异</th><th>备注</th></tr>
    ${ilRows}
    <tr class="total"><td colspan="6">合计</td><td>1301</td><td>1302</td><td>+1</td><td>—</td></tr>
  </table>
  <div class="sign-row">
    <div class="sign-cell"><span>盘点人：</span><span class="sig-name">王岚</span><span class="sig-svg">${sig('王岚', warehouse)}</span></div>
    <div class="sign-cell"><span>复核人：</span><span class="sig-name">李明哲</span><span class="sig-svg">${sig('李明哲', warehouse)}</span></div>
    <div class="sign-cell"><span>仓库负责人：</span><span class="sig-name">赵启铭</span><span class="sig-svg">${sig('赵启铭', warehouse)}</span></div>
  </div>
  <div class="foot"><span>盘点周期：2026 年 9 月 · 账面基准日 2026-09-14</span><span>制表：仓储管理系统</span></div>
</div></body></html>`;

// ============ 质检单 QJ-01（纵向 A4 出厂检验报告单式） ============
const agency = '鹭洲精测质检技术有限公司';
const qcRows = [
  ['1', '外观', '表面无划痕、无气泡、无变形', '符合要求', '合格'],
  ['2', '尺寸', '10.0±0.5 mm', '9.98 / 10.02 / 10.01 mm', '合格'],
  ['3', '重量', '250±5 g', '249.6 g', '合格'],
  ['4', '绝缘电阻', '≥100 MΩ', '236 MΩ', '合格'],
  ['5', '耐压', '1500V/60s 无击穿', '无击穿', '合格'],
].map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
const qjHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; font-family:'Microsoft YaHei','PingFang SC',sans-serif; }
  body { background:#fff; }
  .page { width:1240px; height:1754px; padding:52px 60px; position:relative; color:#1a1a1a; }
  .agency { text-align:center; font-size:16px; color:#444; letter-spacing:2px; }
  .doc-title { text-align:center; font-size:30px; font-weight:700; letter-spacing:8px; margin-top:6px; }
  .doc-sub { display:flex; justify-content:space-between; font-size:14px; margin-top:10px; border-bottom:2px solid #333; padding-bottom:10px; }
  .info { display:grid; grid-template-columns:1fr 1fr; border:1px solid #444; border-bottom:none; margin-top:14px; }
  .info div { border-bottom:1px solid #444; padding:8px 12px; font-size:14.5px; }
  .info div:nth-child(odd) { border-right:1px solid #444; }
  .info b { font-weight:600; }
  table { width:100%; border-collapse:collapse; margin-top:14px; }
  th, td { border:1px solid #444; font-size:14px; padding:8px; text-align:center; }
  th { background:#f2f2f2; }
  .conclusion { border:1px solid #444; border-top:none; padding:12px 14px; font-size:15px; }
  .conclusion b { font-size:17px; }
  .note { border:1px solid #444; border-top:none; padding:10px 14px; font-size:13.5px; color:#444; }
  .sign-row { display:flex; margin-top:26px; }
  .sign-cell { flex:1; display:flex; align-items:center; gap:8px; border:1px solid #444; padding:12px 14px; font-size:14.5px; }
  .sign-cell + .sign-cell { border-left:none; }
  .sig-name { font-weight:600; }
  .sig-svg { width:96px; height:30px; }
  .foot { position:absolute; bottom:24px; left:60px; right:60px; font-size:12px; color:#666; border-top:1px solid #bbb; padding-top:8px; }
</style></head><body><div class="page">
  <div class="agency">${agency}</div>
  <div class="doc-title">出厂检验报告单</div>
  <div class="doc-sub"><span>报告编号：QJ-2026-1058</span><span>页码：第 1 页 / 共 1 页</span></div>
  <div class="info">
    <div><b>委托单位：</b>宏图电子科技有限公司</div><div><b>生产单位：</b>宏图电子科技有限公司</div>
    <div><b>产品名称：</b>精密连接器</div><div><b>规格型号：</b>JX-2040 镀金</div>
    <div><b>产品批号：</b>B20260915</div><div><b>生产日期：</b>2026-09-10</div>
    <div><b>检验依据：</b>Q/LZ 204-2026《精密连接器出厂检验规范》</div><div><b>抽样数量 / 批量：</b>32 件 / 1200 件</div>
    <div><b>检验日期：</b>2026-09-14</div><div><b>报告日期：</b>2026-09-15</div>
  </div>
  <table>
    <tr><th>序号</th><th>检验项目</th><th>标准要求</th><th>实测值</th><th>单项结论</th></tr>
    ${qcRows}
  </table>
  <div class="conclusion"><b>综合结论：合格。</b> 所检项目均符合 Q/LZ 204-2026 标准要求，准予出厂。</div>
  <div class="note">备注：本批产品按企业计数抽样程序抽样；本报告仅代表企业内部出厂检验结论。</div>
  <div class="sign-row">
    <div class="sign-cell"><span>检验员：</span><span class="sig-name">陈思远</span><span class="sig-svg">${sig('陈思远', agency)}</span></div>
    <div class="sign-cell"><span>审核：</span><span class="sig-name">林书瑶</span><span class="sig-svg">${sig('林书瑶', agency)}</span></div>
    <div class="sign-cell"><span>批准：</span><span class="sig-name">何静姝</span><span class="sig-svg">${sig('何静姝', agency)}</span></div>
  </div>
  <div class="foot">本报告仅对来样负责，未经本单位书面批准不得部分复制。　地址：厦门市集美区智造大道 88 号　电话：0592-0000000</div>
</div></body></html>`;

const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const render = async (html, file, width, height) => {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.locator('.page').screenshot({ path: path.join(OUT, file) });
  await page.close();
  console.log('written', file);
};
await render(ilHtml, 'IL-01.png', 1770, 1255);
await render(qjHtml, 'QJ-01.png', 1255, 1770);
await browser.close();
console.log('done');
