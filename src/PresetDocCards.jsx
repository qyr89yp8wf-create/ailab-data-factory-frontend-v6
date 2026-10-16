import React from 'react';
import { Alert, Card, Checkbox, Col, Image, Radio, Row, Space, Tag } from 'antd';
import { PRESET_DOCS, DOC_KIND_LABELS, TRADE_DOC_KINDS } from './presetDocs';

// 预置单证模板选择（新建文档类合成任务 - 单据来源：预置模板）
// 贸易三证（Invoice / 装箱单 / 提单）可多选组成套系；库存清单、质检单仅可单选，选中后替换已选项
export default function PresetDocCards({ value = [], onChange }) {
  const toggle = kind => {
    if (TRADE_DOC_KINDS.includes(kind)) {
      const tradeOnly = value.filter(k => TRADE_DOC_KINDS.includes(k));
      onChange?.(tradeOnly.includes(kind) ? tradeOnly.filter(k => k !== kind) : [...tradeOnly, kind]);
      return;
    }
    onChange?.(value.includes(kind) ? [] : [kind]);
  };
  return <>
    <Row gutter={12}>
      {PRESET_DOCS.map(d => {
        const active = value.includes(d.docKind);
        const isTrade = TRADE_DOC_KINDS.includes(d.docKind);
        return <Col span={8} key={d.docKind}>
          <Card hoverable size="small" onClick={() => toggle(d.docKind)}
            style={{ borderColor: active ? '#1677ff' : undefined, boxShadow: active ? '0 0 0 2px rgba(22,119,255,.15)' : undefined }}
            cover={<div style={{ height: 120, overflow: 'hidden', display: 'flex', justifyContent: 'center', background: '#fafafa' }}>
              <Image src={d.previewImage} alt={d.name} preview={false} style={{ height: 120, objectFit: 'cover', objectPosition: 'top' }}/>
            </div>}>
            <Card.Meta
              title={<Space size={6}>
                {isTrade
                  ? <Checkbox checked={active} onClick={e => e.stopPropagation()} onChange={() => toggle(d.docKind)}/>
                  : <Radio checked={active} onClick={e => e.stopPropagation()} onChange={() => toggle(d.docKind)}/>}
                {DOC_KIND_LABELS[d.docKind]}<Tag color="blue">系统内置</Tag>
              </Space>}
              description={<Space direction="vertical" size={4}>
                <span>{d.summary}</span>
                <span><Tag color={isTrade ? 'green' : 'default'}>{isTrade ? '可多选成套系' : '仅可单选'}</Tag></span>
              </Space>}/>
          </Card>
        </Col>;
      })}
    </Row>
    {(() => { const trade = value.filter(k => TRADE_DOC_KINDS.includes(k)); const standalone = value.filter(k => !TRADE_DOC_KINDS.includes(k));
      return <>
        {trade.length >= 2 && <Alert style={{ marginTop: 12 }} type="info" showIcon
          message={`已组成套系：一票业务事实将生成 ${value.length} 张单证（${value.map(k => DOC_KIND_LABELS[k]).join('、')}），默认启用跨单证一致性质检。`}/>}
        {standalone.length > 0 && <Alert style={{ marginTop: 12 }} type="info" showIcon
          message={`${standalone.map(k => DOC_KIND_LABELS[k]).join('、')}不参与同票勾稽，每张独立生成。`}/>}
      </>; })()}
  </>;
}
