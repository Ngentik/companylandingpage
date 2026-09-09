import { useEffect } from 'react';
import { Footer } from '~/components/layout/Footer/Footer';
import { Header } from '~/components/layout/Header/Header';
import { Container } from '~/components/ui/Container/Container';
import { privacyConfig, privacyExternalLinks } from '~/config/privacy';
import { privacyTranslations } from '~/config/privacyTranslations';
import { siteConfig } from '~/config/site';
import { translations } from '~/config/translations';
import { useLanguage } from '~/hooks/useLanguage';
import { updateLocalizedMetadata } from '~/utils/metadata';
import styles from './privacy.module.css';

export function links() {
  return [{ rel: 'canonical', href: `${siteConfig.url}privacy` }];
}

export function meta() {
  const defaultMetadata = privacyTranslations.fi;

  return [
    { title: defaultMetadata.metaTitle },
    { name: 'description', content: defaultMetadata.metaDescription },
    { property: 'og:title', content: defaultMetadata.metaTitle },
    { property: 'og:description', content: defaultMetadata.metaDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}privacy` },
    { property: 'og:locale', content: defaultMetadata.locale },
    { name: 'robots', content: 'index, follow' },
  ];
}

export default function Privacy() {
  const { language, changeLanguage } = useLanguage();
  const copy = privacyTranslations[language];
  const commonCopy = translations[language];

  useEffect(() => {
    updateLocalizedMetadata({
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: copy.locale,
    });
  }, [copy.locale, copy.metaDescription, copy.metaTitle]);

  return (
    <>
      <a className="skip-link" href="#privacy-content">
        {commonCopy.skip}
      </a>
      <Header
        language={language}
        onLanguageChange={changeLanguage}
        contactHref="/#contact"
      />
      <main className={styles.main} id="privacy-content">
        <Container>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>{copy.pageLabel}</p>
            <h1>{copy.title}</h1>
            <p className={styles.updated}>
              {copy.lastUpdatedLabel}: {privacyConfig.lastUpdated[language]}
            </p>
          </header>

          <article className={styles.article}>
            <section className={styles.section}>
              <SectionHeading
                number={copy.sections.controller.number}
                title={copy.sections.controller.title}
              />
              {copy.sections.controller.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <address className={styles.controller}>
                <strong>{privacyConfig.displayName}</strong>
                <span>{commonCopy.country}</span>
                <span>
                  {copy.sections.controller.emailLabel}:{' '}
                  <a href={`mailto:${privacyConfig.email}`}>
                    {privacyConfig.email}
                  </a>
                </span>
              </address>
            </section>

            <section className={styles.section}>
              <SectionHeading
                number={copy.sections.information.number}
                title={copy.sections.information.title}
              />
              <p>{copy.sections.information.intro}</p>
              <BulletList items={copy.sections.information.items} />
            </section>

            <section className={styles.section}>
              <SectionHeading
                number={copy.sections.purposes.number}
                title={copy.sections.purposes.title}
              />
              <div className={styles.tableWrapper}>
                <table>
                  <thead>
                    <tr>
                      {copy.sections.purposes.columns.map((column) => (
                        <th key={column} scope="col">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {copy.sections.purposes.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell) => (
                          <td key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>{copy.sections.purposes.acknowledgement}</p>
            </section>

            <TextSection section={copy.sections.contactForm} />

            <section className={styles.section}>
              <SectionHeading
                number={copy.sections.providers.number}
                title={copy.sections.providers.title}
              />
              <p>{copy.sections.providers.intro}</p>
              <div className={styles.providers}>
                {copy.sections.providers.providers.map((provider) => (
                  <div key={provider.name}>
                    <h3>{provider.name}</h3>
                    <p>{provider.description}</p>
                    <a
                      href={privacyExternalLinks[provider.linkKey]}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {provider.linkLabel} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <TextSection section={copy.sections.transfers} />
            <TextSection section={copy.sections.retention} />

            <section className={styles.section}>
              <SectionHeading
                number={copy.sections.rights.number}
                title={copy.sections.rights.title}
              />
              <p>{copy.sections.rights.intro}</p>
              <BulletList items={copy.sections.rights.items} />
              <p>{copy.sections.rights.closing}</p>
              <a
                href={privacyExternalLinks.dataProtectionAuthority}
                rel="noreferrer"
                target="_blank"
              >
                {copy.sections.rights.authorityLink}{' '}
                <span aria-hidden="true">↗</span>
              </a>
            </section>

            <TextSection section={copy.sections.technologies} />

            <section className={styles.section}>
              <SectionHeading
                number={copy.sections.other.number}
                title={copy.sections.other.title}
              />
              <div className={styles.subsections}>
                {copy.sections.other.subsections.map((subsection) => (
                  <div key={subsection.title}>
                    <h3>{subsection.title}</h3>
                    <p>{subsection.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <a className={styles.back} href="/">
              <span aria-hidden="true">←</span> {copy.backHome}
            </a>
          </article>
        </Container>
      </main>
      <Footer language={language} />
    </>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <header className={styles.sectionHeading}>
      <span aria-hidden="true">{number}</span>
      <h2>{title}</h2>
    </header>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function TextSection({
  section,
}: {
  section: {
    readonly number: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
  };
}) {
  return (
    <section className={styles.section}>
      <SectionHeading number={section.number} title={section.title} />
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
