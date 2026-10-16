import React, { useState } from 'react';
import { Card, Col, Empty, Row, Space, Statistic, Table, Tag, Typography } from 'antd';
const { Text } = Typography;

// 质检报告 —— 同票勾稽（跨单证一致性）模块
export default function TicketConsistencySection({ report }) {
  const consistency = report?.consistency;
  if (!consistency || !consistency.tickets?.length) return null;
  const [page, setPage] = useState(1);
  const sorted = [...consistency.tickets].sort((a, b) => (a.conclusion === 'FAIL' ? -1 : 1) - (b.conclusion === 'FAIL' ? -1 : 1));
  return <Card title="同票勾稽（跨单证一致性）" style={{ marginTop: 24 }}>
    <Row gutter={[16, 12]} style={{ marginBottom: 16 }}>
      <Col xs={12} sm={8}><Statistic title="勾稽通过率" value={consistency.passRate == null ? '—' : (consistency.passRate * 100).toFixed(1)} suffix={consistency.passRate == null ? null : '%'}/></Col>
      <Col xs={12} sm={8}><Statistic title="票数" value={consistency.ticketCount}/></Col>
      <Col xs={12} sm={8}><Statistic title="通过票 / 失败票" value={`${consistency.passedTickets} / ${consistency.ticketCount - consistency.passedTickets}`}/></Col>
    </Row>
    <Table size="small" rowKey="check" pagination={false} style={{ marginBottom: 16 }}
      dataSource={consistency.checkStats}
      columns={[
        { title: '检查项', dataIndex: 'check' },
        { title: '范围', dataIndex: 'scope', width: 200 },
        { title: '通过', dataIndex: 'pass', width: 80 },
        { title: '不通过', dataIndex: 'fail', width: 80, render: v => v > 0 ? <Text type="danger" strong>{v}</Text> : v },
      ]}/>
    <Table size="small" rowKey="ticketId"
      dataSource={sorted}
      pagination={{ current: page, pageSize: 20, onChange: setPage, showSizeChanger: false, showTotal: total => `共 ${total} 票` }}
      columns={[
        { title: '票号', dataIndex: 'ticketId', width: 200 },
        { title: '单据组合', dataIndex: 'docKinds', render: kinds => kinds.map(k => <Tag key={k}>{k}</Tag>) },
        { title: '通过数', width: 100, render: (_, r) => `${r.checks.filter(c => c.status === 'PASS').length}/${r.checks.length}` },
        { title: '结论', dataIndex: 'conclusion', width: 100, render: v => <Tag color={v === 'PASS' ? 'green' : 'red'}>{v}</Tag> },
      ]}
      expandable={{
        expandedRowRender: r => <Table size="small" rowKey="key" pagination={false}
          dataSource={r.checks}
          rowClassName={c => c.status === 'FAIL' ? 'ticket-check-fail' : ''}
          columns={[
            { title: '检查项', dataIndex: 'name', width: 220 },
            { title: '取值对比', render: (_, c) => <Space direction="vertical" size={2}>{c.evidence.map((e, i) => <Text key={i} type={c.status === 'FAIL' ? 'danger' : undefined} strong={c.status === 'FAIL'}>{e.doc} · {e.field}：{e.value}</Text>)}</Space> },
            { title: '结论', dataIndex: 'status', width: 90, render: v => <Tag color={v === 'PASS' ? 'green' : 'red'}>{v}</Tag> },
          ]}/>,
      }}/>
  </Card>;
}
