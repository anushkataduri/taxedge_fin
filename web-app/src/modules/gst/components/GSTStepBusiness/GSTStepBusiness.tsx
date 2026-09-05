import type { FormEvent } from 'react'
import './GSTStepBusiness.css'

export interface BusinessFormData {
  legalName: string
  tradeName: string
  pan: string
  aadhaar: string
  mobile: string
  email: string
  constitution: string
  natureOfBusiness: string
  principalActivity: string
  turnover: string
  compositionScheme: string
}

interface GSTStepBusinessProps {
  data: BusinessFormData
  onChange: (field: keyof BusinessFormData, value: string) => void
  onNext: () => void
  onCancel: () => void
}

export const GSTStepBusiness = ({
  data,
  onChange,
  onNext,
  onCancel,
}: GSTStepBusinessProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div className="gst-step-business-card">
      <div className="gst-step-business-card__header">
        <h2 className="gst-step-business-card__title">Business details</h2>
        <p className="gst-step-business-card__subtitle">
          As they should appear on the GST certificate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="gst-step-business-form">
        {/* Row 1: Legal Name & Trade Name */}
        <div className="gst-form-row">
          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="legalName">
              Legal name of business <span className="gst-form-required">*</span>
            </label>
            <input
              id="legalName"
              type="text"
              className="gst-form-input"
              value={data.legalName}
              onChange={(e) => onChange('legalName', e.target.value)}
              placeholder="e.g. Shree Deshmukh Traders"
              required
            />
          </div>

          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="tradeName">
              Trade name
            </label>
            <input
              id="tradeName"
              type="text"
              className="gst-form-input"
              value={data.tradeName}
              onChange={(e) => onChange('tradeName', e.target.value)}
              placeholder="e.g. Deshmukh Traders"
            />
          </div>
        </div>

        {/* Row 2: PAN & Aadhaar */}
        <div className="gst-form-row">
          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="pan">
              PAN of business <span className="gst-form-required">*</span>
            </label>
            <input
              id="pan"
              type="text"
              className="gst-form-input"
              value={data.pan}
              onChange={(e) => onChange('pan', e.target.value.toUpperCase())}
              placeholder="e.g. AXTPD4419K"
              maxLength={10}
              required
            />
          </div>

          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="aadhaar">
              Aadhaar of proprietor <span className="gst-form-required">*</span>
            </label>
            <input
              id="aadhaar"
              type="text"
              className="gst-form-input"
              value={data.aadhaar}
              onChange={(e) => onChange('aadhaar', e.target.value)}
              placeholder="12-digit Aadhaar"
              maxLength={12}
              required
            />
          </div>
        </div>

        {/* Row 3: Mobile & Email */}
        <div className="gst-form-row">
          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="mobile">
              Mobile <span className="gst-form-required">*</span>
            </label>
            <input
              id="mobile"
              type="tel"
              className="gst-form-input"
              value={data.mobile}
              onChange={(e) => onChange('mobile', e.target.value)}
              placeholder="+91 98670 41255"
              required
            />
          </div>

          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="email">
              Email <span className="gst-form-required">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="gst-form-input"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="anjali@shreedeshmukh.in"
              required
            />
          </div>
        </div>

        {/* Row 4: Constitution & Nature of business */}
        <div className="gst-form-row">
          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="constitution">
              Constitution of business
            </label>
            <div className="gst-form-select-wrapper">
              <select
                id="constitution"
                className="gst-form-select"
                value={data.constitution}
                onChange={(e) => onChange('constitution', e.target.value)}
              >
                <option value="Proprietorship">Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="Limited Liability Partnership">LLP</option>
                <option value="Private Limited Company">Private Limited Company</option>
              </select>
            </div>
          </div>

          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="natureOfBusiness">
              Nature of business
            </label>
            <div className="gst-form-select-wrapper">
              <select
                id="natureOfBusiness"
                className="gst-form-select"
                value={data.natureOfBusiness}
                onChange={(e) => onChange('natureOfBusiness', e.target.value)}
              >
                <option value="Trading">Trading</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Services">Services</option>
                <option value="Export/Import">Export / Import</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 5: Principal business activity */}
        <div className="gst-form-group gst-form-group--full">
          <label className="gst-form-label" htmlFor="principalActivity">
            Principal business activity
          </label>
          <textarea
            id="principalActivity"
            className="gst-form-textarea"
            rows={3}
            value={data.principalActivity}
            onChange={(e) => onChange('principalActivity', e.target.value)}
            placeholder="Describe your primary goods or services..."
          />
        </div>

        {/* Row 6: Expected annual turnover & Composition scheme */}
        <div className="gst-form-row">
          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="turnover">
              Expected annual turnover
            </label>
            <div className="gst-form-select-wrapper">
              <select
                id="turnover"
                className="gst-form-select"
                value={data.turnover}
                onChange={(e) => onChange('turnover', e.target.value)}
              >
                <option value="₹40 lakh – ₹1 crore">₹40 lakh – ₹1 crore</option>
                <option value="Below ₹40 lakh">Below ₹40 lakh</option>
                <option value="₹1 crore – ₹5 crore">₹1 crore – ₹5 crore</option>
                <option value="Above ₹5 crore">Above ₹5 crore</option>
              </select>
            </div>
          </div>

          <div className="gst-form-group">
            <label className="gst-form-label" htmlFor="compositionScheme">
              Composition scheme
            </label>
            <div className="gst-form-select-wrapper">
              <select
                id="compositionScheme"
                className="gst-form-select"
                value={data.compositionScheme}
                onChange={(e) => onChange('compositionScheme', e.target.value)}
              >
                <option value="No — regular scheme">No — regular scheme</option>
                <option value="Yes — composition scheme">Yes — composition scheme</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="gst-step-actions">
          <button
            type="button"
            className="gst-btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="gst-btn-continue"
          >
            Continue
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gst-btn-arrow"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
