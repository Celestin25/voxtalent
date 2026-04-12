import { FileText, FileSpreadsheet, Download } from 'lucide-react'

interface FileViewerProps {
  url: string
  name: string
  type: string
  label?: string
}

export default function FileViewer({ url, name, type, label = 'Attachment' }: FileViewerProps) {
  const isPdf = type === 'application/pdf'
  const isVideo = type.startsWith('video/')
  const isExcel =
    type.includes('spreadsheet') ||
    type.includes('excel') ||
    type === 'application/vnd.ms-excel'

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--color-accent-primary)',
        fontWeight: 800,
        textTransform: 'uppercase',
        marginBottom: '0.75rem',
        letterSpacing: '0.08em',
      }}>
        {label}
      </div>

      {isPdf && (
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(79,70,229,0.2)' }}>
          <iframe
            src={url}
            style={{ width: '100%', height: '520px', display: 'block', border: 'none' }}
            title={name}
          />
        </div>
      )}

      {isVideo && (
        <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
          <video controls style={{ width: '100%', display: 'block', maxHeight: '420px' }}>
            <source src={url} type={type} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {(isExcel || (!isPdf && !isVideo)) && (
        <div style={{
          padding: '1.5rem',
          background: 'rgba(79,70,229,0.04)',
          border: '1px solid rgba(79,70,229,0.15)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            {isExcel
              ? <FileSpreadsheet size={24} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />
              : <FileText size={24} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
              {isExcel && (
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>Spreadsheet — download to view</div>
              )}
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            download={name}
            className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <Download size={14} /> Download
          </a>
        </div>
      )}

      {(isPdf || isVideo) && (
        <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.75rem', color: 'var(--color-accent-primary)', fontWeight: 600 }}
          >
            Open in new tab
          </a>
        </div>
      )}
    </div>
  )
}
