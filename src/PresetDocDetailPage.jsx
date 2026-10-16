import React, { useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Descriptions, Flex, Image, Input, InputNumber, Row, Space, Steps, Switch, Table, Tabs, Tag, Tooltip, Typography } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleFilled, LeftOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { PRESET_SCENE_RULES, TICKET_CONSISTENCY_RULES, TRADE_DOC_KINDS, buildTicketSamples, presetSceneQualityRules, presetConsistencyQualityRules } from './presetDocs';
import { qualityConfig } from './qualityCatalog';
import { mockSignature } from './mockSignature';
import UnifiedQualityEditor from './UnifiedQualityEditor';
import { ControlledModelConfig, ModelConfigGroup } from './ModelConfigField';
import RuleQualityReport, { QualityReportDownloadButton } from './RuleQualityReport';
import { trialQualityReport } from './qualityResults';

const { Text, Title, Paragraph } = Typography;



// 系统内置单证模板详情页（只读整页）：与自定义模板详情保持同一版式 —— 返回上级 + 步骤分段 + 上一步/下一步
export default function PresetDocDetailPage({ template, onBack }) {
  const [step, setStep] = useState(0);
  const trialSample = useMemo(() => buildTicketSamples(1, [template.docKind])[0], [template.docKind]);
  if (!template) return null;
  const isTradeDoc = TRADE_DOC_KINDS.includes(template.docKind);
  const outputSize = template.pageOrientation === 'landscape' ? { width: 3508, height: 2480 } : { width: 2480, height: 3508 };
  const qualityCatalogValue = useMemo(() => {
    const config = qualityConfig('文档图像');
    config.rules = [
      ...config.rules.filter(r => r.category !== '标签分类'),
      ...presetSceneQualityRules([template.docKind]),
      ...(TRADE_DOC_KINDS.includes(template.docKind) ? presetConsistencyQualityRules() : []),
      // 标签分类仅用于覆盖率统计，排在最后
      ...config.rules.filter(r => r.category === '标签分类'),
    ];
    return config;
  }, [template.docKind]);
  const sceneRules = PRESET_SCENE_RULES[template.docKind] || [];
  const maxStep = 3;
  const stepItems = [
    { title: '结构校准', description: '版式内置固定，仅预览' },
    { title: '语义与字段规则', description: `${template.fields.length} 个字段` },
    { title: '质检规则配置', description: '基础规则与勾稽规则' },
    { title: '校验试运行', description: template.trialStatus },
  ];
  const annotation = trialSample?.documents?.[0]?.annotation;
  const trialReport = useMemo(() => trialQualityReport(qualityCatalogValue.rules, {
    sampleCount: 1, templateId: template.id, templateVersion: template.version,
  }), [qualityCatalogValue, template.id, template.version]);
  return <div className="template-editor-page template-create-page">
    <Flex className="page-header" justify="space-between" align="flex-start">
      <Space align="start">
        <Button type="text" icon={<LeftOutlined/>} aria-label="返回模板中心" onClick={onBack}/>
        <div><Title level={2}>文档类图像模板详情</Title><Paragraph type="secondary">只读查看模板内容，可使用上一步和下一步浏览全部配置。</Paragraph></div>
      </Space>
    </Flex>

    <Flex justify="space-between" align="center" className="template-editor-header template-editor-step-actions-top">
      <div><Title level={4}>{template.name} <Tag color="blue">系统内置</Tag></Title><Text type="secondary">ID：{template.id}</Text></div>
      <Space>
        <Button icon={<ArrowLeftOutlined/>} disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>上一步</Button>
        <Button type="primary" icon={<ArrowRightOutlined/>} disabled={step === maxStep} onClick={() => setStep(s => Math.min(maxStep, s + 1))}>下一步</Button>
      </Space>
    </Flex>
    <Steps current={step} items={stepItems} onChange={setStep} className="template-editor-steps"/>

    {step === 0 && <Card className="template-editor-card" title="模板版式预览">
      <Alert type="info" showIcon style={{ marginBottom: 16 }}
        message="内置模板的版面结构已固化校准" description="无需上传种子图或调整单元格；生成时按此版式叠加动态字段、图案与安全签署内容。"/>
      <div style={{ textAlign: 'center', background: '#fafafa', padding: 16, borderRadius: 8 }}>
        <Image src={template.previewImage} alt={`${template.name}版式预览`} style={{ maxWidth: 720, width: '100%', border: '1px solid #f0f0f0' }}/>
      </div>
    </Card>}

    {step === 1 && <Card className="template-editor-card" title={`字段清单（${template.fields.length} 个）`}>
      <Table rowKey="id" size="small" pagination={false} scroll={{ y: 420 }}
        dataSource={template.fields}
        columns={[
          { title: '字段 ID', dataIndex: 'id', width: 200, render: v => <Text code>{v}</Text> },
          { title: '字段名称', dataIndex: 'label', width: 180 },
          { title: '生成方式', dataIndex: 'gen' },
          { title: '签署笔迹', width: 150, render: (_, r) => r.id.startsWith('signature_')
            ? <span style={{ display: 'inline-block', width: 110, verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: mockSignature(template.docKind, r.id).handwriting_svg }}/>
            : <Text type="secondary">—</Text> },
        ]}/>
    </Card>}

    {step === 2 && <Card className="template-editor-card" title="质检规则配置">
      <UnifiedQualityEditor modality="文档图像" value={qualityCatalogValue} readOnly/>
      {!isTradeDoc && <Alert type="info" showIcon style={{ marginTop: 12 }}
        message="该单证不参与套系同票勾稽" description="同票勾稽规则仅对商业发票、装箱单、提单组成的套系任务生效。"/>}
    </Card>}

    {step === 3 && <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Alert type="info" showIcon message="试运行与质检结果" description="内置模板已完成校验与试运行并发布，本页保留结果快照，所有配置只读。"/>
      <Card size="small" title="输出设置">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space wrap>
            <Button disabled>原始 {outputSize.width}×{outputSize.height}</Button>
            <Button disabled>标准宽度 2480px</Button>
            <Button disabled>高精度宽度 3508px</Button>
          </Space>
          <div className="trial-output-settings">
            <div><Text type="secondary">输出宽度</Text><InputNumber min={320} max={8192} value={outputSize.width} addonAfter="px" style={{ width: '100%' }} disabled/></div>
            <div><Text type="secondary">输出高度</Text><InputNumber min={240} max={8192} value={outputSize.height} addonAfter="px" style={{ width: '100%' }} disabled/></div>
            <div><Text type="secondary">锁定比例</Text><Tooltip title="试运行强制保持原始宽高比"><Switch checked disabled/></Tooltip></div>
          </div>
          <Alert type="success" showIcon message="高分辨率直接重绘" description="字号、边框、印章/图案、polygon 与 bbox 使用同一个统一缩放矩阵投影到最终画布，不会先生成低清图再放大。"/>
        </Space>
      </Card>
      <Card size="small" title="试运行配置">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row gutter={12}>
            <Col span={8}><Text type="secondary">试运行样本数</Text><InputNumber min={1} max={10} value={1} style={{ width: '100%' }} disabled/></Col>
            <Col span={8}><Text type="secondary">样例生成调用预估</Text><Input value="1 次" disabled/></Col>
          </Row>
          <ModelConfigGroup>
            <ControlledModelConfig disabled label="字段生成模型" options={[{ value: 'qwen3-14b', label: 'Qwen3-14B' }]} value="qwen3-14b" enabled={false} onChange={() => {}} onEnabledChange={() => {}} onParametersChange={() => {}}/>
            <ControlledModelConfig disabled label="语义质检模型" options={[{ value: 'qwen3-14b', label: 'Qwen3-14B（非思考模式）' }]} value="qwen3-14b" enabled={false} onChange={() => {}} onEnabledChange={() => {}} onParametersChange={() => {}}/>
            <ControlledModelConfig disabled label="图像理解模型（VLM）" options={[{ value: 'qwen3-vl-8b-instruct', label: 'Qwen3-VL-8B-Instruct' }]} value="qwen3-vl-8b-instruct" enabled={false} onChange={() => {}} onEnabledChange={() => {}} onParametersChange={() => {}}/>
          </ModelConfigGroup>
          <Descriptions bordered size="small" column={4} items={[
            { key: 'generation', label: '样例生成调用', children: '1 次' },
            { key: 'base', label: '规则引擎质检', children: `${qualityCatalogValue.rules.filter(r => 'SABD'.includes(r.id[0])).length} 条` },
            { key: 'scene', label: '场景 / 勾稽质检', children: `${sceneRules.length + (isTradeDoc ? TICKET_CONSISTENCY_RULES.length : 0)} 条` },
            { key: 'total', label: 'API 总调用次数预估', children: <Text strong>1 次</Text> },
          ]}/>
          <Alert type="info" showIcon message="试运行真实执行字段生成器" description="字典 + 规则和计算值在本地执行；模型字段合并为一次调用，并在试运行结果中显示字段数和调用次数。"/>
        </Space>
      </Card>
      <div className="trial-actions"><Button type="primary" icon={<PlayCircleOutlined/>} disabled>开始试运行并质检</Button></div>
      <Card size="small" title="试运行样例">
        <Tabs items={[
          { key: 'image', label: '样例图', children: <Image src={template.previewImage} alt={`${template.name}试运行样张`} style={{ maxWidth: 640, width: '100%', border: '1px solid #f0f0f0' }}/> },
          { key: 'annotation', label: '标注 JSON', children: <Input.TextArea aria-label="试运行标注 JSON" readOnly value={JSON.stringify(annotation || { mock: true }, null, 2)} autoSize={{ minRows: 16, maxRows: 28 }}/> },
        ]}/>
      </Card>
      <Card size="small" title="质检报告" extra={<QualityReportDownloadButton disabled report={trialReport}/>}>
        <RuleQualityReport templateTrial showDownload={false} report={trialReport}/>
      </Card>
    </Space>}
  </div>;
}
