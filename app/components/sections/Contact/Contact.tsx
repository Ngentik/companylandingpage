import { useState, type FormEvent } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Container } from '~/components/ui/Container/Container';
import { translations, type Language } from '~/config/translations';
import styles from './Contact.module.css';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export function Contact({ language }: { language: Language }) {
  const copy = translations[language];
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);

    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const phone = data.get('phone');
    const company = data.get('company');
    const subject = data.get('subject');
    const message = data.get('message');
    const consent = data.get('consent');

    if (
      typeof firstName !== 'string' ||
      typeof email !== 'string' ||
      typeof company !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string'
    ) {
      return;
    }

    if (!turnstileToken) {
      setSubmissionState('error');
      return;
    }

    try {
      setSubmissionState('submitting');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: typeof lastName === 'string' ? lastName.trim() : '',
          email: email.trim(),
          phone: typeof phone === 'string' ? phone.trim() : '',
          company: company.trim(),
          subject: subject.trim(),
          message: message.trim(),
          consent: consent === 'on',
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error(`Contact submission failed: ${response.status}`);
      }

      setSubmissionState('success');
      setTurnstileToken(null);
      form.reset();
    } catch (error) {
      console.error('Contact form submission failed.', error);
      setSubmissionState('error');
    }
  }

  return (
    <section
      className={styles.section}
      id="contact"
      aria-labelledby="contact-title"
    >
      <Container className={styles.grid}>
        <div className={styles.intro}>
          <p className="eyebrow">{copy.contactLabel}</p>

          <h2 id="contact-title">{copy.contactTitle}</h2>

          <p>{copy.contactIntro}</p>
        </div>

        <form
          className={styles.form}
          onSubmit={(event) => void handleSubmit(event)}
        >
          <div className={styles.field}>
            <label htmlFor="firstName">{copy.firstName}</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              maxLength={100}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName">{copy.lastName}</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              maxLength={100}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">{copy.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">{copy.phone}</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={50}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="company">{copy.company}</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              required
              maxLength={200}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="subject">{copy.subject}</label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              maxLength={200}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="message">{copy.message}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={5000}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" required />
              <span>
                {copy.consentBefore} <a href="/privacy">{copy.consentLink}</a>.
              </span>
            </label>
          </div>

          <p className={styles.note} id="contact-note">
            {copy.formNote}
          </p>

          {submissionState === 'success' && <p role="status">{copy.success}</p>}

          {submissionState === 'error' && <p role="alert">{copy.error}</p>}

          <Turnstile
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
          />

          <button
            className={styles.submit}
            type="submit"
            aria-describedby="contact-note"
            disabled={submissionState === 'submitting' || !turnstileToken}
          >
            {submissionState === 'submitting' ? copy.sending : copy.send}{' '}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </form>
      </Container>
    </section>
  );
}
