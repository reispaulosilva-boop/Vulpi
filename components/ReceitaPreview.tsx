import { Formulacao } from '@/app/data/formulations'

interface DadosPaciente {
  nome: string
  dataNascimento: string
  indicacao: string
}

interface ReceitaPreviewProps {
  paciente: DadosPaciente
  formulacoes: Formulacao[]
}

export default function ReceitaPreview({ paciente, formulacoes }: ReceitaPreviewProps) {
  const hoje = new Date().toLocaleDateString('pt-BR')
  const dn = paciente.dataNascimento
    ? new Date(paciente.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR')
    : '—'

  return (
    <div
      id="receita-a4"
      className="bg-white mx-auto print:shadow-none print:m-0"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '16mm 18mm 20mm',
        fontFamily: 'var(--font-inter, Arial, sans-serif)',
        fontSize: '10pt',
        color: '#1C1C1A',
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
      }}
    >
      {/* Cabeçalho */}
      <header style={{ borderBottom: '1.5px solid #1C1C1A', paddingBottom: '10px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: '22pt',
                fontWeight: 700,
                letterSpacing: '0.12em',
                lineHeight: 1,
                marginBottom: '3px',
              }}
            >
              VULPI
            </p>
            <p style={{ fontSize: '8pt', color: '#78716c', letterSpacing: '0.05em' }}>
              Alta Dermatologia Magistral — Clínica Crepaldi
            </p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '8pt', color: '#78716c', lineHeight: 1.6 }}>
            <p>Dr. Paulo Silva Reis</p>
            <p>Dermatologista | CRM-MT XXXXX</p>
            <p>Cuiabá – MT</p>
          </div>
        </div>
      </header>

      {/* Dados do paciente */}
      <section style={{ borderBottom: '1px solid #e7e5e4', paddingBottom: '10px', marginBottom: '14px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
          <tbody>
            <tr>
              <td style={{ paddingBottom: '4px', color: '#78716c', width: '90px' }}>PACIENTE</td>
              <td style={{ paddingBottom: '4px', fontWeight: 600 }}>{paciente.nome}</td>
            </tr>
            <tr>
              <td style={{ paddingBottom: '4px', color: '#78716c' }}>DN</td>
              <td style={{ paddingBottom: '4px' }}>
                {dn}
                <span style={{ color: '#78716c', marginLeft: '24px' }}>DATA</span>
                <span style={{ marginLeft: '8px' }}>{hoje}</span>
              </td>
            </tr>
            {paciente.indicacao && (
              <tr>
                <td style={{ color: '#78716c', verticalAlign: 'top', paddingTop: '2px' }}>INDICAÇÃO</td>
                <td style={{ paddingTop: '2px' }}>{paciente.indicacao}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Formulações */}
      <section style={{ marginBottom: '24px' }}>
        {formulacoes.map((f, idx) => (
          <div
            key={f.codigo}
            style={{
              marginBottom: '14px',
              paddingBottom: '14px',
              borderBottom: idx < formulacoes.length - 1 ? '1px dashed #d6d3d1' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-roboto-mono, "Courier New", monospace)',
                  fontSize: '8pt',
                  color: '#78716c',
                  background: '#f5f5f4',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  flexShrink: 0,
                }}
              >
                {f.codigo}
              </span>
              <span style={{ fontWeight: 600, fontSize: '10pt' }}>{f.nome}</span>
              <span style={{ fontSize: '8pt', color: '#78716c', marginLeft: 'auto', flexShrink: 0 }}>
                {f.via === 'VT' ? 'Tópico' : 'Oral'}
              </span>
            </div>

            <div style={{ paddingLeft: '4px', lineHeight: 1.7, fontSize: '9pt' }}>
              <p>
                <span style={{ color: '#78716c' }}>Ativos: </span>
                {f.ativos.map((a) => `${a.nome} ${a.concentracao}`).join(', ')}
              </p>
              <p>
                <span style={{ color: '#78716c' }}>Veículo: </span>
                {f.veiculo}
              </p>
              <p>
                <span style={{ color: '#78716c' }}>Posologia: </span>
                {f.posologia}
              </p>
              <p>
                <span style={{ color: '#78716c' }}>Duração: </span>
                {f.duracao}
              </p>
              {f.obs && (
                <p style={{ color: '#92400e', marginTop: '2px' }}>
                  <span style={{ fontWeight: 600 }}>Obs.: </span>
                  {f.obs}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Assinatura */}
      <footer style={{ marginTop: 'auto', paddingTop: '32px' }}>
        <div style={{ borderTop: '1px solid #1C1C1A', width: '200px', marginBottom: '6px' }} />
        <p style={{ fontWeight: 600, fontSize: '9pt' }}>Dr. Paulo Silva Reis</p>
        <p style={{ fontSize: '8pt', color: '#78716c' }}>Dermatologista | CRM-MT XXXXX</p>
        <p style={{ fontSize: '8pt', color: '#78716c' }}>Clínica Crepaldi — Cuiabá, MT</p>
      </footer>
    </div>
  )
}
