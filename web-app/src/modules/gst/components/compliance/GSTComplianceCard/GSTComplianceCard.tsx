import { formatCurrency } from '@shared/utils'
import './GSTComplianceCard.css'

export interface GSTComplianceCardProps {
  title?: string
  description?: string
  fee?: number
  annualDue?: string
  onStart?: () => void
}

export const GSTComplianceCard = ({
  title = 'GST Annual Compliance & Audit',
  description = 'GSTR-9 annual return, GSTR-9C reconciliation statement, ITC matching and departmental query support.',
  fee = 4000,
  annualDue = '31 Dec 2026',
  onStart,
}: GSTComplianceCardProps) => {
  return (
    <div className="gst-compliance-card">
      <div className="gst-compliance-card__header">
        <div className="gst-compliance-card__icon-box" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <h3 className="gst-compliance-card__title">{title}</h3>
          <p className="gst-compliance-card__desc">{description}</p>
        </div>
      </div>

      <div className="gst-compliance-card__meta">
        <div className="gst-compliance-card__item">
          <span className="gst-compliance-card__label">Due Date</span>
          <span className="gst-compliance-card__value">{annualDue}</span>
        </div>
        <div className="gst-compliance-card__item">
          <span className="gst-compliance-card__label">Professional Fee</span>
          <span className="gst-compliance-card__value">{formatCurrency(fee)} / year</span>
        </div>
        <div className="gst-compliance-card__item">
          <span className="gst-compliance-card__label">Status</span>
          <span className="gst-compliance-badge">Upcoming</span>
        </div>
      </div>

      <div className="gst-compliance-card__actions">
        <button type="button" className="gst-compliance-btn" onClick={onStart}>
          Start Compliance Check →
        </button>
      </div>
    </div>
  )
}

export default GSTComplianceCard
