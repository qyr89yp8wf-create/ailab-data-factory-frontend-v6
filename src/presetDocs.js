import { mockSignature } from './mockSignature';

// 预置贸易单证（系统内置模板）——数据与 Mock 生成器
// 版式与字段来源：资料/语料合成模板库（自绘 HTML 模板，占位符即字段）

const asset = name => `${import.meta.env.BASE_URL}assets/preset-docs/${name}`;

export const PRESET_DOC_KINDS = ['invoice', 'packing_list', 'bill_of_lading', 'inventory_list', 'quality_inspection'];
export const TRADE_DOC_KINDS = ['invoice', 'packing_list', 'bill_of_lading'];
export const DOC_KIND_LABELS = { invoice: 'Invoice', packing_list: '装箱单', bill_of_lading: '提单', inventory_list: '库存清单', quality_inspection: '质检单', quality_certificate: '质检单' };

export const PRESET_DOCS = [
  {
    id: 'TEMPLATE-DOC-INVOICE-01', docKind: 'invoice', name: '商业发票（系统内置）',
    modality: '文档图像', businessType: 'Invoice', version: '1.0.0', trialStatus: '试运行通过',
    source: 'builtin', readOnly: true, renderEngine: 'html', outputFormat: 'PNG + JSON',
    previewImage: asset('invoice.png'), defaultModel: 'Qwen3-14B',
    summary: 'UN 布局键版式 · 16 字段',
    fields: [
      ['issuer', '开票方', 'local_template'], ['invoice_no', '发票号', 'computed'], ['invoice_date', '发票日期', 'computed'],
      ['consignee', '收货人', 'local_template'], ['buyer', '买方', 'local_template'], ['origin_country', '原产国', 'dictionary_rule'],
      ['destination_country', '目的国', 'dictionary_rule'], ['transport_details', '运输明细', 'computed'], ['terms', '交货与付款条件', 'dictionary_rule'],
      ['item_marks', '唛头', 'computed'], ['item_description', '货名与规格', 'dictionary_rule＋local_template'], ['item_quantity', '数量', 'computed'],
      ['item_unit_price', '单价', 'computed'], ['item_amount', '金额', 'computed（数量×单价）'], ['total_amount', '发票总额', 'computed（合计）'],
      ['signature', '签署栏', 'local_template（签署人名册播种）'],
    ].map(([id, label, gen]) => ({ id, label, gen })),
  },
  {
    id: 'TEMPLATE-DOC-PL-01', docKind: 'packing_list', name: '装箱单（系统内置）',
    modality: '文档图像', businessType: '装箱单', version: '1.0.0', trialStatus: '试运行通过',
    source: 'builtin', readOnly: true, renderEngine: 'html', outputFormat: 'PNG + JSON',
    previewImage: asset('packing_list.png'), defaultModel: 'Qwen3-14B',
    summary: '汇总式版式 · 14 字段',
    fields: [
      ['issuer', '装箱方', 'local_template'], ['invoice_no', '关联发票号', 'computed（同票引用）'], ['contract_no', '合同号', 'computed'],
      ['pl_date', '装箱单日期', 'computed'], ['to', '收货方', 'local_template'], ['item_marks', '唛头', 'computed（与发票一致）'],
      ['item_description', '货名', '同票引用'], ['item_quantity', '件数', 'computed'], ['item_gw', '毛重', 'computed'],
      ['item_nw', '净重', 'computed'], ['total_qty', '总件数', 'computed（合计）'], ['total_gw', '总毛重', 'computed（合计）'],
      ['total_nw', '总净重', 'computed（合计）'], ['signature', '签署栏', 'local_template（签署人名册播种）'],
    ].map(([id, label, gen]) => ({ id, label, gen })),
  },
  {
    id: 'TEMPLATE-DOC-BL-01', docKind: 'bill_of_lading', name: '提单（系统内置）',
    modality: '文档图像', businessType: '提单', version: '1.0.0', trialStatus: '试运行通过',
    source: 'builtin', readOnly: true, renderEngine: 'html', outputFormat: 'PNG + JSON',
    previewImage: asset('bill_of_lading.png'), defaultModel: 'Qwen3-14B',
    summary: '港到港版式 · 24 字段',
    fields: [
      ['bl_no', '提单号', 'computed'], ['shipper', '托运人', 'local_template'], ['consignee', '收货人（指示抬头）', 'dictionary_rule＋local_template'],
      ['notify_party', '通知方', 'local_template'], ['carrier', '承运人（虚构船公司）', 'local_template'], ['vessel_voy', '船名/航次', 'dictionary_rule'],
      ['port_loading', '装货港', 'dictionary_rule'], ['port_discharge', '卸货港', 'dictionary_rule'], ['item_marks', '唛头（含箱号/封号）', 'computed'],
      ['item_packages', '件数', 'computed'], ['item_description', '货名', '同票引用'], ['item_gw', '毛重', '同票引用'],
      ['item_meas', '尺码', 'computed'], ['total_packages_words', '件数英文大写', 'computed'], ['revenue_tons', '运费吨', 'computed'],
      ['rate', '费率', 'computed'], ['per', '计费单位', '固定 M3'], ['prepaid', '预付金额', 'computed（运费吨×费率）'],
      ['collect', '到付金额', '固定“—”'], ['total_prepaid', '预付总额', 'computed（=预付）'], ['onboard_date', '装船日', 'computed'],
      ['issue_place_date', '签发地点与日期', 'computed（≥装船日）'], ['original_count', '正本份数', 'dictionary_rule'],
      ['signature', '承运人签署栏', 'local_template（承运人名册播种）'],
    ].map(([id, label, gen]) => ({ id, label, gen })),
  },
  {
    id: 'TEMPLATE-DOC-INVLIST-01', docKind: 'inventory_list', name: '库存清单（系统内置）',
    modality: '文档图像', businessType: '库存清单', version: '1.0.0', trialStatus: '试运行通过',
    source: 'builtin', readOnly: true, renderEngine: 'html', outputFormat: 'PNG + JSON',
    pageOrientation: 'landscape',
    previewImage: asset('IL-01.png'), defaultModel: 'Qwen3-14B',
    summary: '盘点表式 · 横向 A4 · 20 字段',
    fields: [
      ['il_no', '单据编号（IL-YYYY-序号）', 'computed'], ['warehouse', '仓库名称', 'local_template（虚构仓库词典）'],
      ['count_date', '盘点日期', 'computed'], ['page_no', '页码', 'computed'],
      ['item_seq', '行级序号', 'computed'], ['item_sku', '商品编码（SKU-＋6 位数字）', 'computed'],
      ['item_name', '商品名称', 'local_template（虚构商品词典）'], ['item_spec', '规格型号', 'local_template（词素组合）'],
      ['item_unit', '单位', 'dictionary_rule（件/箱/台/kg）'], ['item_location', '库位（区-排-层）', 'computed'],
      ['item_book_qty', '账面数量', 'computed'], ['item_actual_qty', '实盘数量', 'computed（账面±小扰动）'],
      ['item_diff', '差异（实盘−账面，可负）', 'computed'], ['item_remark', '备注', 'dictionary_rule（盘亏/盘盈/破损/滞销/空）'],
      ['total_book', '账面合计', 'computed（明细合计）'], ['total_actual', '实盘合计', 'computed（明细合计）'],
      ['total_diff', '差异合计', 'computed（明细合计）'],
      ['signature_count', '盘点人签署栏', 'local_template（名册播种＋模拟手写）'],
      ['signature_review', '复核人签署栏', 'local_template（名册播种＋模拟手写）'],
      ['signature_keeper', '仓库负责人签署栏', 'local_template（名册播种＋模拟手写）'],
    ].map(([id, label, gen]) => ({ id, label, gen })),
  },
  {
    id: 'TEMPLATE-DOC-QC-01', docKind: 'quality_inspection', name: '质检单（系统内置）',
    modality: '文档图像', businessType: '质检单', version: '1.0.0', trialStatus: '试运行通过',
    source: 'builtin', readOnly: true, renderEngine: 'html', outputFormat: 'PNG + JSON',
    pageOrientation: 'portrait',
    previewImage: asset('QJ-01.png'), defaultModel: 'Qwen3-14B',
    summary: '出厂检验报告单式 · 纵向 A4 · 24 字段',
    fields: [
      ['qj_no', '报告编号（QJ-YYYY-序号）', 'computed'], ['agency', '质检机构/企业质检部名称', 'local_template（虚构机构词典）'],
      ['client', '委托/生产单位', 'local_template'], ['product_name', '产品名称', 'local_template'],
      ['product_spec', '规格型号', 'local_template'], ['batch_no', '产品批号', 'computed'],
      ['produce_date', '生产日期', 'computed'], ['test_basis', '检验依据（虚构企业标准号）', 'computed'],
      ['sample_qty', '抽样数量', 'computed（抽样 ≤ 批量）'], ['lot_qty', '批量', 'computed'],
      ['test_date', '检验日期', 'computed'], ['report_date', '报告日期', 'computed'],
      ['item_seq', '行级序号', 'computed'], ['item_name', '检验项目', 'dictionary_rule（外观/尺寸/重量/性能等）'],
      ['item_requirement', '标准要求（文本或区间）', 'local_template'], ['item_actual', '实测值', 'computed（按标准要求生成）'],
      ['item_conclusion', '单项结论（合格/不合格）', 'computed（由实测值推导）'],
      ['final_conclusion', '综合结论', 'computed（由单项结论推导）'], ['conclusion_text', '结论文本', 'local_template'],
      ['signature_test', '检验员签署栏', 'local_template（名册播种＋模拟手写）'],
      ['signature_review', '审核签署栏', 'local_template（名册播种＋模拟手写）'],
      ['signature_approve', '批准签署栏', 'local_template（名册播种＋模拟手写）'],
      ['agency_addr', '机构地址电话', 'local_template'], ['disclaimer', '页脚声明', '固定文本'],
    ].map(([id, label, gen]) => ({ id, label, gen })),
  },
];


export const normalizeDocKind = kind => (kind === 'quality_certificate' ? 'quality_inspection' : kind);
export const presetDocByKind = kind => PRESET_DOCS.find(d => d.docKind === normalizeDocKind(kind));

// 模板 ID 别名（兼容改名前的任务快照链接）
export const PRESET_ID_ALIASES = { 'TEMPLATE-DOC-STOCK-01': 'TEMPLATE-DOC-INVLIST-01' };

// 单证场景质检规则（内置模板自带）＋同票勾稽规则（仅套系场景生效）
export const PRESET_SCENE_RULES = {
  invoice: ['发票号格式', '日期格式', '金额勾稽（数量×单价=金额，小计＋费用=总额）', '币种格式', '唛头完整性', '签署栏非空'],
  packing_list: ['合计勾稽（明细=总量）', '毛净重关系（净重≤毛重）', '关联发票号', '签署栏非空'],
  bill_of_lading: ['提单号格式', '日期链（装船日≤签发日）', '运费勾稽', '港口字典', '大写件数勾稽', '签署栏非空'],
  inventory_list: ['单号格式（IL 前缀＋日期＋序号）', '虚构性（公司、人名、单号不命中真实名单）', '合规红线（不使用真实标准编号）', '差异勾稽（每行：实盘数量 − 账面数量 = 差异）', '合计勾稽（明细行合计 = 汇总行三列）', '签署完整（盘点人 / 复核人 / 仓库负责人非空，打印姓名＋笔迹）'],
  quality_inspection: ['单号格式（QJ 前缀＋日期＋序号）', '虚构性（机构、人名不命中真实名单）', '合规红线（不得出现 CMA / CNAS / CAL 标识与注册号）', '结论一致性（任一单项不合格 → 综合结论不合格）', '日期链（生产日期 ≤ 检验日期 ≤ 报告日期）', '数值合规（实测值满足标准要求）', '签署完整（检验员 / 审核 / 批准三级非空）'],
};

export const TICKET_CONSISTENCY_RULES = [
  { key: 'invoice_no', name: '发票号一致性', scope: '发票 ↔ 装箱单' },
  { key: 'marks', name: '唛头一致性', scope: '全套单证' },
  { key: 'gross_weight', name: '毛重一致性', scope: '装箱单 ↔ 提单' },
  { key: 'goods', name: '货名与装卸港一致性', scope: '发票 ↔ 提单' },
  { key: 'date_chain', name: '日期链（发票日≤装船日≤签发日）', scope: '全套单证' },
  { key: 'freight', name: '运费勾稽', scope: '提单（单证内）' },
  { key: 'amount', name: '金额勾稽', scope: '发票（单证内）' },
  { key: 'packing_sum', name: '装箱合计勾稽', scope: '装箱单（单证内）' },
];

// ---------- 虚构业务事实生成（确定性播种） ----------
const crc32 = s => { let c = ~0; for (let i = 0; i < s.length; i++) { c ^= s.charCodeAt(i); for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1)); } return ~c >>> 0; };
const seeded = seed => { let state = (Number(seed) || 1) >>> 0; return () => { state = (state * 1664525 + 1013904223) >>> 0; return state / 4294967296; }; };
const pick = (rnd, arr) => arr[Math.floor(rnd() * arr.length) % arr.length];

const EXPORTERS = ['LUHAI IMPORT & EXPORT CO., LTD.', 'HAIYUN FOODS (XIAMEN) CO., LTD.', 'XIAMEN SUNRISE OPTOELECTRONICS CO., LTD.', 'DEHUA CERAMICS EXPORT CO., LTD.'];
const IMPORTERS = ['BOUWSTEEN HANDELS BV', 'RHEINLAND TRADING GMBH', 'AL SAFA FOODSTUFF TRADING LLC', 'HOMESTEAD TABLEWARE INC.', 'MERLION ELECTRONICS PTE LTD'];
const CARRIERS = ['OCEAN LINK LINES CO., LTD.', 'PACIFIC BRIDGE SHIPPING CO., LTD.'];
const VESSELS = ['XIAMEN EXPRESS V.210E', 'PACIFIC STAR V.088E', 'SEABRIDGE V.115W', 'LUHAI TRADER V.063E'];
const PORTS = [['XIAMEN, CHINA', 'ROTTERDAM, NETHERLANDS'], ['XIAMEN, CHINA', 'HAMBURG, GERMANY'], ['SHANGHAI, CHINA', 'SINGAPORE'], ['XIAMEN, CHINA', 'DUBAI, UAE']];
const GOODS = [
  { desc: 'G603 GRANITE TILES 600X600X20MM, POLISHED', unit: 'PCS', price: 12.5, pkg: 'PALLETS' },
  { desc: 'CANNED YELLOW PEACHES IN SYRUP 850G×24TINS/CTN', unit: 'CTNS', price: 48, pkg: 'PALLETS' },
  { desc: 'LED DRIVER MODULES P/N SR-LD2400', unit: 'PCS', price: 15.6, pkg: 'CTNS' },
  { desc: 'PORCELAIN MUGS 350ML', unit: 'CTNS', price: 22.4, pkg: 'PALLETS' },
];

export function makeTicketFacts(seed) {
  const rnd = seeded(seed);
  const goods = pick(rnd, GOODS);
  const [from, to] = pick(rnd, PORTS);
  const qty = (Math.floor(rnd() * 8) + 2) * 100;
  const amount = qty * goods.price;
  const gw = Math.round(qty * (18 + rnd() * 8) * 10) / 10;
  const invoiceDate = `2026-09-${String(10 + Math.floor(rnd() * 10)).padStart(2, '0')}`;
  const onboardDate = `2026-09-${String(Number(invoiceDate.slice(8)) + 4).padStart(2, '0')}`;
  const issueDate = `2026-09-${String(Number(invoiceDate.slice(8)) + 5).padStart(2, '0')}`;
  const exporter = pick(rnd, EXPORTERS);
  const importer = pick(rnd, IMPORTERS);
  const no = `LH2026-${invoiceDate.slice(5).replace('-', '')}${String(Math.floor(rnd() * 90) + 10)}`;
  const markPrefix = importer.split(' ')[0].slice(0, 4).toUpperCase();
  const marks = `${markPrefix}\n${to.split(',')[1]?.trim() || to}\nC/NO.1-${qty}`;
  const revenueTons = Math.round(gw / 1000 * 10) / 10;
  const rate = Math.round((60 + rnd() * 300) * 100) / 100;
  return {
    exporter, importer, carrier: pick(rnd, CARRIERS), vessel: pick(rnd, VESSELS), from, to,
    invoiceNo: no, invoiceDate, onboardDate, issueDate, marks, goods, qty,
    unitPrice: goods.price, amount, grossWeight: gw, netWeight: Math.round(gw * 0.9 * 10) / 10,
    measurement: Math.round(revenueTons * 10) / 10, revenueTons, rate, prepaid: Math.round(revenueTons * rate * 100) / 100,
  };
}

// 每种单据的字段取值（标注用）
// 中文虚构词典（仓储/质检单据专用，自创作不对应真实主体）
const CN_WAREHOUSES = ['厦门保税仓 A 区', '苏州云仓 3 号库', '东莞智造仓 B 区', '青岛港后方仓 2 号', '成都青白江仓 C 区'];
const CN_GOODS = [
  { name: '精密连接器', spec: 'JX-2040 镀金', unit: '件' }, { name: '工业传感器', spec: 'SN-88 防爆型', unit: '台' },
  { name: '包装纸盒', spec: '五层瓦楞 60×40', unit: '箱' }, { name: '铝合金型材', spec: '6063-T5 6m', unit: '件' },
  { name: '蓝牙模块', spec: 'BT-5.3 低功耗', unit: '件' }, { name: '密封圈', spec: 'FKM φ50', unit: '箱' },
];
const CN_REMARKS = ['', '', '盘盈', '盘亏', '破损', '滞销'];
const CN_AGENCIES = ['鹭洲精测质检技术有限公司', '宏图电子科技质检部', '澄迈精密仪器检测中心'];
const CN_MANUFACTURERS = ['宏图电子科技有限公司', '鹭洲精工制造有限公司', '澄迈智能装备股份公司'];
const QC_ITEMS = [
  { name: '外观', req: '表面无划痕、无气泡、无变形' }, { name: '尺寸', req: '10.0±0.5 mm' },
  { name: '重量', req: '250±5 g' }, { name: '绝缘电阻', req: '≥100 MΩ' }, { name: '耐压', req: '1500V/60s 无击穿' },
];

export function docFields(docKind, f) {
  docKind = normalizeDocKind(docKind);
  const usd = v => `USD ${Number(v).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (docKind === 'invoice') return {
    issuer: f.exporter, invoice_no: f.invoiceNo, invoice_date: f.invoiceDate,
    consignee: f.importer, buyer: 'SAME AS CONSIGNEE', origin_country: 'CHINA',
    destination_country: f.to.split(',')[1]?.trim() || f.to, transport_details: `FROM ${f.from} TO ${f.to} BY SEA`,
    terms: 'CFR / T T 30 DAYS', item_marks: f.marks, item_description: f.goods.desc,
    item_quantity: `${f.qty} ${f.goods.unit}`, item_unit_price: usd(f.unitPrice),
    item_amount: usd(f.amount), total_amount: usd(f.amount), signature: f.exporter,
  };
  if (docKind === 'packing_list') return {
    issuer: f.exporter, invoice_no: f.invoiceNo, contract_no: `SC${f.invoiceNo.slice(2)}`, pl_date: f.invoiceDate,
    to: f.importer, item_marks: f.marks, item_description: f.goods.desc,
    item_quantity: `${f.qty} ${f.goods.unit}`, item_gw: `${f.grossWeight} KGS`, item_nw: `${f.netWeight} KGS`,
    total_qty: `${f.qty} ${f.goods.unit}`, total_gw: `${f.grossWeight} KGS`, total_nw: `${f.netWeight} KGS`,
    signature: f.exporter,
  };
  if (docKind === 'inventory_list') {
    const rnd = seeded(crc32(f.invoiceNo + 'IL'));
    const warehouse = pick(rnd, CN_WAREHOUSES);
    const rowCount = 5 + Math.floor(rnd() * 3);
    const items = Array.from({ length: rowCount }, (_, i) => {
      const goods = pick(rnd, CN_GOODS);
      const book = (Math.floor(rnd() * 40) + 5) * 10;
      const diff = rnd() < 0.75 ? 0 : Math.floor(rnd() * 5) - 2;
      const actual = book + diff;
      return {
        seq: i + 1, sku: `SKU-${100000 + Math.floor(rnd() * 900000)}`, name: goods.name, spec: goods.spec,
        unit: goods.unit, location: `${'ABCD'[Math.floor(rnd() * 4)]}-0${Math.floor(rnd() * 8) + 1}-${Math.floor(rnd() * 4) + 1}`,
        book_qty: book, actual_qty: actual, diff, remark: diff === 0 ? '' : pick(rnd, CN_REMARKS),
      };
    });
    const sum = key => items.reduce((s, r) => s + r[key], 0);
    return {
      il_no: `IL-2026-${String(1000 + (crc32(f.invoiceNo) % 9000))}`, warehouse, count_date: f.invoiceDate, page_no: '1/1',
      items,
      total_book: sum('book_qty'), total_actual: sum('actual_qty'), total_diff: sum('diff'),
      signatures: [
        { role: '盘点人', ...mockSignature(warehouse, '盘点人') },
        { role: '复核人', ...mockSignature(warehouse, '复核人') },
        { role: '仓库负责人', ...mockSignature(warehouse, '仓库负责人') },
      ],
    };
  }
  if (docKind === 'quality_inspection') {
    const rnd = seeded(crc32(f.invoiceNo + 'QJ'));
    const agency = pick(rnd, CN_AGENCIES);
    const goods = pick(rnd, CN_GOODS);
    const hasFail = rnd() < 0.15;
    const failAt = hasFail ? Math.floor(rnd() * QC_ITEMS.length) : -1;
    const items = QC_ITEMS.map((item, i) => {
      const pass = i !== failAt;
      return { seq: i + 1, name: item.name, requirement: item.req, actual: pass ? '符合要求' : '实测超出允差', conclusion: pass ? '合格' : '不合格' };
    });
    const allPass = failAt < 0;
    const lot = (Math.floor(rnd() * 20) + 10) * 50;
    return {
      qj_no: `QJ-2026-${String(1000 + (crc32(f.invoiceNo) % 9000))}`, agency,
      client: pick(rnd, CN_MANUFACTURERS), product_name: goods.name, product_spec: goods.spec,
      batch_no: `B${f.invoiceDate.replaceAll('-', '')}`,
      produce_date: f.invoiceDate, test_basis: `Q/LZ ${String(100 + (crc32(f.invoiceNo) % 900))}-${f.invoiceDate.slice(0, 4)}`,
      sample_qty: Math.min(32, lot), lot_qty: lot,
      test_date: f.onboardDate, report_date: f.issueDate,
      items,
      final_conclusion: allPass ? '合格' : '不合格',
      conclusion_text: allPass ? '所检项目均符合标准要求，准予出厂。' : '存在不合格项，本批不予出厂，转入不合格品流程。',
      signatures: [
        { role: '检验员', ...mockSignature(agency, '检验员') },
        { role: '审核', ...mockSignature(agency, '审核') },
        { role: '批准', ...mockSignature(agency, '批准') },
      ],
      agency_addr: '厦门市集美区智造大道 88 号 0592-0000000',
      disclaimer: '本报告仅对来样负责，未经本单位书面批准不得部分复制。',
    };
  }
  return {
    bl_no: `OLL${f.invoiceNo.slice(2)}01`, shipper: f.exporter, consignee: 'TO ORDER OF ORIENT MERCHANT BANK LTD.',
    notify_party: f.importer, carrier: f.carrier, vessel_voy: f.vessel,
    port_loading: f.from, port_discharge: f.to, item_marks: f.marks,
    item_packages: `${Math.ceil(f.qty / 40)} ${f.goods.pkg}`, item_description: f.goods.desc,
    item_gw: `${f.grossWeight} KGS`, item_meas: `${f.measurement} M3`,
    revenue_tons: f.revenueTons, rate: f.rate.toFixed(2), per: 'M3',
    prepaid: usd(f.prepaid), collect: '—', total_prepaid: usd(f.prepaid),
    onboard_date: f.onboardDate, issue_place_date: `${f.from.split(',')[0]}, ${f.issueDate}`,
    original_count: 'THREE (3)', signature: f.carrier,
  };
}

// 预置模板任务质检规则：自定义单证规则（各单据场景规则）＋ 套系同票勾稽规则（贸易三证 ≥2 时启用）
export function presetSceneQualityRules(docKinds) {
  return (docKinds || []).flatMap(kind => (PRESET_SCENE_RULES[normalizeDocKind(kind)] || []).map((name, i) => ({
    id: `PRESET-SCENE-${kind.toUpperCase()}-${i + 1}`, name: `${DOC_KIND_LABELS[kind]} · ${name}`,
    category: '自定义单证规则', target: '每张单据', method: '规则引擎 / 语义模型', description: '按单据类型内置的单证场景规则。', enabled: true,
  })));
}
export function presetConsistencyQualityRules() {
  return TICKET_CONSISTENCY_RULES.map(rule => ({
    id: `PRESET-CONSISTENCY-${rule.key.toUpperCase().replaceAll('_', '-')}`, name: rule.name,
    category: '套系同票勾稽规则', target: rule.scope, method: '规则引擎（跨单证取值比对）', description: '同一票业务事实下，跨单证关键取值的一致性比对。', enabled: true,
  }));
}
export function presetTaskQualityRules(docKinds) {
  const kinds = docKinds || [];
  const tradeCount = kinds.filter(k => TRADE_DOC_KINDS.includes(k)).length;
  return [...presetSceneQualityRules(kinds), ...(tradeCount >= 2 ? presetConsistencyQualityRules() : [])];
}

// 勾稽检查（按 PRD 附录 A 口径 mock：约 85% 票全通过，失败项给出不一致取值）
export function ticketConsistency(ticketId, facts, docKinds, seed) {
  const rnd = seeded(crc32(ticketId) + seed);
  const failIndex = rnd() < 0.82 ? -1 : Math.floor(rnd() * TICKET_CONSISTENCY_RULES.length);
  return TICKET_CONSISTENCY_RULES.map((rule, index) => {
    const fail = index === failIndex;
    const evidence = [];
    const f = facts;
    if (rule.key === 'invoice_no') {
      if (docKinds.includes('invoice')) evidence.push({ doc: 'invoice', field: 'invoice_no', value: f.invoiceNo });
      if (docKinds.includes('packing_list')) evidence.push({ doc: 'packing_list', field: 'refs', value: fail ? `不含 ${f.invoiceNo}` : `含 ${f.invoiceNo}` });
    } else if (rule.key === 'marks') {
      docKinds.forEach(k => evidence.push({ doc: k, field: k === 'packing_list' ? 'marks' : 'item_marks', value: fail && k === 'bill_of_lading' ? f.marks.split('\n')[0] + ' / WRONG-PORT' : f.marks.split('\n')[0] }));
    } else if (rule.key === 'gross_weight') {
      if (docKinds.includes('packing_list')) evidence.push({ doc: 'packing_list', field: 'total_gw', value: `${f.grossWeight} KGS` });
      if (docKinds.includes('bill_of_lading')) evidence.push({ doc: 'bill_of_lading', field: 'item_gw', value: fail ? `${f.grossWeight + 40} KGS` : `${f.grossWeight} KGS` });
    } else if (rule.key === 'goods') {
      if (docKinds.includes('invoice')) evidence.push({ doc: 'invoice', field: 'item_description', value: f.goods.desc.split('\n')[0] });
      if (docKinds.includes('bill_of_lading')) evidence.push({ doc: 'bill_of_lading', field: 'item_description', value: fail ? 'MISMATCHED GOODS' : f.goods.desc.split('\n')[0] });
    } else if (rule.key === 'date_chain') {
      evidence.push({ doc: 'invoice', field: 'invoice_date', value: f.invoiceDate }, { doc: 'bill_of_lading', field: 'onboard_date', value: f.onboardDate }, { doc: 'bill_of_lading', field: 'issue_date', value: fail ? f.invoiceDate : f.issueDate });
    } else if (rule.key === 'freight') {
      evidence.push({ doc: 'bill_of_lading', field: 'revenue_tons × rate', value: `${f.revenueTons} × ${f.rate.toFixed(2)} = ${f.prepaid.toFixed(2)}` });
    } else if (rule.key === 'amount') {
      evidence.push({ doc: 'invoice', field: 'quantity × unit_price', value: `${f.qty} × ${f.unitPrice.toFixed(2)} = ${f.amount.toFixed(2)}` });
    } else {
      evidence.push({ doc: 'packing_list', field: '明细合计', value: `${f.qty} ${f.goods.unit} / ${f.grossWeight} KGS` });
    }
    return { key: rule.key, name: rule.name, scope: rule.scope, status: fail ? 'FAIL' : 'PASS', evidence };
  });
}

export function buildTicketSamples(ticketCount, docKinds, seedBase = 20261010) {
  docKinds = (docKinds || []).map(normalizeDocKind);
  return Array.from({ length: ticketCount }, (_, i) => {
    const ticketId = `T-${seedBase}-${String(i + 1).padStart(4, '0')}`;
    const facts = makeTicketFacts(seedBase + i * 131);
    const isTradeSet = docKinds.filter(k => TRADE_DOC_KINDS.includes(k)).length >= 2;
    const checks = isTradeSet ? ticketConsistency(ticketId, facts, docKinds, seedBase) : null;
    return {
      id: ticketId, ticket: true, facts,
      documents: docKinds.map(kind => ({
        doc_kind: kind,
        imageUrl: presetDocByKind(kind).previewImage,
        annotation: { ticket_id: ticketId, doc_kind: kind, fields: docFields(kind, facts) },
      })),
      consistency: checks ? { checks, passed: checks.filter(c => c.status === 'PASS').length, failed: checks.filter(c => c.status === 'FAIL').length } : null,
    };
  });
}

export function consistencyReportSection(samples) {
  const tickets = samples.map(s => ({ ticketId: s.id, docKinds: s.documents.map(d => d.doc_kind), conclusion: s.consistency.failed ? 'FAIL' : 'PASS', checks: s.consistency.checks }));
  const total = tickets.length || 1;
  const passed = tickets.filter(t => t.conclusion === 'PASS').length;
  const checkStats = TICKET_CONSISTENCY_RULES.map(rule => ({
    check: rule.name, scope: rule.scope,
    pass: tickets.filter(t => t.checks.find(c => c.key === rule.key)?.status === 'PASS').length,
    fail: tickets.filter(t => t.checks.find(c => c.key === rule.key)?.status === 'FAIL').length,
  }));
  return { ticketCount: samples.length, passRate: samples.length ? passed / total : null, passedTickets: passed, checkStats, tickets };
}

// ---------- 手写签名 SVG（移植自材料库 SignatureFlowable，确定性播种） ----------
export function signatureSvg(seedText, { width = 120, height = 40, color = '#1a2a8a' } = {}) {
  const rnd = seeded(crc32(seedText));
  const base = height * 0.38;
  const parts = [];
  let x = 2, y = base + rnd() * 2 - 1;
  let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
  const top1 = height * (0.78 + rnd() * 0.17);
  d += ` C ${x + 2} ${y + 3}, ${x + 3.5} ${top1}, ${x + 7} ${top1}`;
  d += ` C ${x + 11} ${top1}, ${x + 12.5} ${base + 2}, ${x + 9} ${base - 1}`;
  x += 12;
  const letters = 5 + Math.floor(rnd() * 4);
  for (let i = 0; i < letters && x < width - 9; i++) {
    const amp = 2.5 + rnd() * 3, period = 7 + rnd() * 5, nx = x + period, kind = rnd();
    if (kind < 0.18) {
      const top = height * (0.68 + rnd() * 0.22);
      d += ` C ${x + period * 0.3} ${base + amp}, ${x + period * 0.45} ${top}, ${x + period * 0.6} ${top}`;
      d += ` C ${x + period * 0.78} ${top}, ${nx - 1} ${base}, ${nx} ${base + rnd() * 2}`;
    } else if (kind < 0.34) {
      const bot = height * (0.02 + rnd() * 0.12);
      d += ` C ${x + period * 0.3} ${base + amp}, ${x + period * 0.5} ${base + amp}, ${x + period * 0.6} ${base}`;
      d += ` C ${x + period * 0.7} ${base - 3}, ${x + period * 0.75} ${bot}, ${nx - 1.5} ${bot + 1}`;
      d += ` C ${nx - 1} ${bot + 2.5}, ${nx - 0.5} ${base + 1}, ${nx} ${base + rnd() * 2}`;
    } else {
      d += ` C ${x + period * 0.35} ${base + amp}, ${x + period * 0.65} ${base - amp * 0.4}, ${nx} ${base + rnd() * 2.5 - 1}`;
    }
    x = nx;
  }
  parts.push(`<path d="${d}" stroke="${color}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`);
  if (rnd() < 0.6) {
    const y2 = base - 4 - rnd() * 2;
    parts.push(`<path d="M ${width * (0.1 + rnd() * 0.1)} ${y2} C ${width * 0.45} ${y2 - 3}, ${width * 0.7} ${y2 - 1.5}, ${width * (0.85 + rnd() * 0.12)} ${y2 - 2.5}" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><g transform="matrix(1,0,-0.14,1,5,0)">${parts.join('')}</g></svg>`;
}

const SIGNER_NAMES = ['M. Chen', 'J. Lin', 'R. Wang', 'A. Huang', 'K. Zheng', 'L. Xu', 'S. Guo', 'T. Ye', 'W. Cai', 'H. Fang'];
export const signerName = (company, role) => SIGNER_NAMES[crc32(company + '|' + role) % SIGNER_NAMES.length];
export const signerSvgFor = (company, role) => signatureSvg(company + '|' + role + '|' + signerName(company, role));
