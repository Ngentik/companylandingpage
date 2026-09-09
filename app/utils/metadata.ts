interface LocalizedMetadata {
  title: string;
  description: string;
  locale: 'fi_FI' | 'en_US';
}

export function updateLocalizedMetadata(metadata: LocalizedMetadata) {
  document.title = metadata.title;
  setMetaContent('meta[name="description"]', metadata.description);
  setMetaContent('meta[property="og:title"]', metadata.title);
  setMetaContent('meta[property="og:description"]', metadata.description);
  setMetaContent('meta[property="og:locale"]', metadata.locale);
}

function setMetaContent(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content);
}
