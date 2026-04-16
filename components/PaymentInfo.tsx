interface PaymentInfoProps {
  variant?: 'default' | 'compact'
  showAmount?: string
  className?: string
}

export default function PaymentInfo({ variant = 'default', showAmount, className = '' }: PaymentInfoProps) {
  const isCompact = variant === 'compact'
  
  return (
    <div 
      className={className}
      style={{ 
        background: '#fffbeb', 
        border: '2px solid #f59e0b', 
        borderRadius: isCompact ? '8px' : 'var(--radius-lg)', 
        padding: isCompact ? '16px' : '24px',
        fontSize: isCompact ? '13px' : '14px'
      }}
    >
      <p style={{ 
        fontWeight: 900, 
        fontSize: isCompact ? '14px' : '16px', 
        color: '#92400e', 
        marginBottom: isCompact ? '8px' : '12px' 
      }}>
        ✅ PAIEMENTS ACCEPTÉS
      </p>
      
      <div style={{ marginBottom: isCompact ? '8px' : '16px' }}>
        <p style={{ 
          fontWeight: 800, 
          fontSize: isCompact ? '14px' : '16px', 
          color: 'var(--dark)', 
          marginBottom: isCompact ? '4px' : '8px' 
        }}>
          ➡️ RIB (Virement instantané)
        </p>
        {!isCompact && (
          <p style={{ color: '#78350f', lineHeight: 1.6 }}>
            Paiement par virement bancaire instantané
          </p>
        )}
      </div>

      <div style={{ marginBottom: showAmount ? '16px' : '0' }}>
        <p style={{ 
          fontWeight: 800, 
          fontSize: isCompact ? '14px' : '16px', 
          color: 'var(--dark)', 
          marginBottom: isCompact ? '4px' : '8px' 
        }}>
          ➡️ RECHARGE TRANSCASH
        </p>
        <p style={{ color: '#78350f', lineHeight: isCompact ? 1.4 : 1.6 }}>
          {isCompact ? (
            'Bureau de tabac — tickets de 100€ chacun'
          ) : (
            <>
              Allez dans un <strong>bureau de tabac</strong> et payez des tickets d&apos;une valeur de <strong>100€ chacun</strong>.<br />
              Ou achetez en ligne sur{' '}
              <a href="https://dundle.com/fr/Transcash" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 700 }}>
                dundle.com/fr/Transcash
              </a>
            </>
          )}
        </p>
      </div>

      {showAmount && (
        <div style={{ 
          marginTop: '16px', 
          background: '#fef3c7', 
          borderRadius: 'var(--radius)', 
          padding: '12px', 
          fontSize: '13px', 
          color: '#92400e' 
        }}>
          <strong>Montant à payer :</strong> {showAmount}
        </div>
      )}
    </div>
  )
}