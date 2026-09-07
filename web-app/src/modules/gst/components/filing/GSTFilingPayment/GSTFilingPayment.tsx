import { useState } from 'react'
import { formatCurrency } from '@shared/utils'
import type { PaymentResult } from '../../GSTStepPayment/GSTStepPayment'
import './GSTFilingPayment.css'

interface GSTFilingPaymentProps {
  amount?: number
  applicationRef?: string
  serviceTitle?: string
  onBack: () => void
  onSuccess: (details: PaymentResult) => void
}

type PaymentMethodType = 'upi' | 'card' | 'credit' | 'netbank'

const UPI_APPS = [
  { n: 'GPay', c: '#1A73E8', s: 'G' },
  { n: 'PhonePe', c: '#5F259F', s: 'P' },
  { n: 'Paytm', c: '#00BAF2', s: '₹' },
  { n: 'BHIM', c: '#083B75', s: 'B' },
]

export const GSTFilingPayment = ({
  amount = 2950,
  applicationRef = 'GST-2026-00118',
  serviceTitle = 'GST Filing — August 2026',
  onBack,
  onSuccess,
}: GSTFilingPaymentProps) => {
  const [method, setMethod] = useState<PaymentMethodType>('upi')
  const [upiId, setUpiId] = useState('anjali@okhdfcbank')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [selectedBank, setSelectedBank] = useState('HDFC Bank')
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const baseFee = Math.round(amount / 1.18)
  const gstAmount = amount - baseFee
  const totalPayable = amount - discount

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'TAXEDGE50') setDiscount(500)
  }

  const handlePay = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      const txnSuffix = Math.floor(10000000 + Math.random() * 90000000)
      const rcptNum = Math.floor(1000 + Math.random() * 9000)
      onSuccess({
        transactionId: `TXN${txnSuffix}`,
        receiptNumber: `TE/26-27/R-0${rcptNum}`,
        method: method === 'upi' ? `UPI · ${upiId}` : method === 'netbank' ? `NetBanking · ${selectedBank}` : 'Card Payment',
        dateText: '2 Sep 2026, 10:42 AM',
        applicationRef,
        amount: totalPayable,
      })
    }, 1200)
  }

  return (
    <div className="gst-pay-wrapper">
      <header className="gst-pay-header">
        <h1 className="gst-pay-header__title">Complete your payment</h1>
        <p className="gst-pay-header__subtitle">{serviceTitle} · application {applicationRef}</p>
      </header>

      <div className="gst-pay-layout">
        <main className="gst-pay-main">
          <section className="gst-pay-card">
            <div className="gst-pay-card__hd">
              <h2 className="gst-pay-card__title">Payment method</h2>
              <span className="gst-pay-secure-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-pay-badge-icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Secure 256-bit
              </span>
            </div>

            <div className="gst-pay-methods-list">
              <button type="button" className={`gst-pay-method-item ${method === 'upi' ? 'gst-pay-method-item--active' : ''}`} onClick={() => setMethod('upi')}>
                <div className="gst-pay-method-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg></div>
                <div className="gst-pay-method-item__text"><span className="gst-pay-method-item__title">UPI</span><span className="gst-pay-method-item__desc">Google Pay, PhonePe, Paytm or any UPI app</span></div>
                <span className="gst-pay-method-item__radio" />
              </button>

              <button type="button" className={`gst-pay-method-item ${method === 'card' ? 'gst-pay-method-item--active' : ''}`} onClick={() => setMethod('card')}>
                <div className="gst-pay-method-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg></div>
                <div className="gst-pay-method-item__text"><span className="gst-pay-method-item__title">Debit card</span><span className="gst-pay-method-item__desc">Visa, Mastercard, RuPay</span></div>
                <span className="gst-pay-method-item__radio" />
              </button>

              <button type="button" className={`gst-pay-method-item ${method === 'credit' ? 'gst-pay-method-item--active' : ''}`} onClick={() => setMethod('credit')}>
                <div className="gst-pay-method-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg></div>
                <div className="gst-pay-method-item__text"><span className="gst-pay-method-item__title">Credit card</span><span className="gst-pay-method-item__desc">Visa, Mastercard, Amex · EMI available</span></div>
                <span className="gst-pay-method-item__radio" />
              </button>

              <button type="button" className={`gst-pay-method-item ${method === 'netbank' ? 'gst-pay-method-item--active' : ''}`} onClick={() => setMethod('netbank')}>
                <div className="gst-pay-method-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="21" x2="21" y2="21" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" /></svg></div>
                <div className="gst-pay-method-item__text"><span className="gst-pay-method-item__title">Net banking</span><span className="gst-pay-method-item__desc">All major Indian banks</span></div>
                <span className="gst-pay-method-item__radio" />
              </button>
            </div>

            {method === 'upi' && (
              <div className="gst-pay-details-block">
                <h4 className="gst-pay-subheading">Pay with UPI app</h4>
                <div className="gst-pay-upi-grid">
                  {UPI_APPS.map((app) => (
                    <button key={app.n} type="button" className="gst-pay-upi-btn" onClick={() => setUpiId(`anjali@ok${app.n.toLowerCase()}`)}>
                      <span className="gst-pay-upi-badge" style={{ background: app.c }}>{app.s}</span>
                      <span>{app.n}</span>
                    </button>
                  ))}
                </div>
                <div className="gst-pay-field" style={{ marginTop: '1rem' }}>
                  <label htmlFor="upi-id-inp" className="gst-pay-field-label">Or enter your UPI ID</label>
                  <input id="upi-id-inp" className="gst-pay-inp" placeholder="yourname@bank" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                </div>
              </div>
            )}

            {(method === 'card' || method === 'credit') && (
              <div className="gst-pay-details-block">
                <div className="gst-pay-fgrid">
                  <div className="gst-pay-field gst-pay-field--span">
                    <label className="gst-pay-field-label">Card number</label>
                    <input className="gst-pay-inp" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                  </div>
                  <div className="gst-pay-field">
                    <label className="gst-pay-field-label">Expiry</label>
                    <input className="gst-pay-inp" placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                  </div>
                  <div className="gst-pay-field">
                    <label className="gst-pay-field-label">CVV</label>
                    <input type="password" maxLength={4} className="gst-pay-inp" placeholder="•••" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                  </div>
                  <div className="gst-pay-field gst-pay-field--span">
                    <label className="gst-pay-field-label">Name on card</label>
                    <input className="gst-pay-inp" placeholder="As printed on the card" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {method === 'netbank' && (
              <div className="gst-pay-details-block">
                <div className="gst-pay-field">
                  <label className="gst-pay-field-label">Select your bank</label>
                  <select className="gst-pay-inp" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                    <option>Bank of Baroda</option>
                  </select>
                </div>
              </div>
            )}
          </section>

          <div className="gst-pay-actions-box">
            <button type="button" className="gst-pay-btn-cancel" onClick={onBack}>← Back</button>
            <button type="button" className="gst-pay-btn-submit" disabled={isProcessing} onClick={handlePay}>
              {isProcessing ? 'Processing…' : `Pay ${formatCurrency(totalPayable)} securely →`}
            </button>
          </div>
          <p className="gst-pay-footer-note">
            Payments are processed by a PCI-DSS compliant gateway. TaxEdge never stores your card details.
          </p>
        </main>

        <aside className="gst-pay-sidebar">
          <div className="gst-pay-order-card">
            <h3 className="gst-pay-order-card__title">Order summary</h3>
            <div className="gst-pay-order-card__table">
              <div className="gst-pay-order-card__row">
                <span className="gst-pay-order-card__label">{serviceTitle}</span>
                <span className="gst-pay-order-card__value">{formatCurrency(baseFee)}</span>
              </div>
              <div className="gst-pay-order-card__row">
                <span className="gst-pay-order-card__label">GST @ 18%</span>
                <span className="gst-pay-order-card__value">{formatCurrency(gstAmount)}</span>
              </div>
              {discount > 0 && (
                <div className="gst-pay-order-card__row gst-pay-order-card__row--discount">
                  <span className="gst-pay-order-card__label">Discount</span>
                  <span className="gst-pay-order-card__value">−{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="gst-pay-order-card__divider" />
              <div className="gst-pay-order-card__row gst-pay-order-card__row--total">
                <span className="gst-pay-order-card__total-label">Total payable</span>
                <span className="gst-pay-order-card__total-amount">{formatCurrency(totalPayable)}</span>
              </div>
            </div>

            <div className="gst-pay-promo-row">
              <input className="gst-pay-promo-inp" placeholder="Promo code (e.g. TAXEDGE50)" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
              <button type="button" className="gst-pay-promo-btn" onClick={handleApplyPromo}>Apply</button>
            </div>
          </div>

          <div className="gst-pay-note-card">
            <div className="gst-pay-note-card__icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <div className="gst-pay-note-card__content">
              <h4 className="gst-pay-note-card__title">What happens after payment</h4>
              <p className="gst-pay-note-card__desc">
                A GST-compliant receipt is generated instantly and your application moves to active. Your executive is notified the same minute.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default GSTFilingPayment
