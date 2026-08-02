import { useTranslation } from 'react-i18next';
import { getNextLanguage, LANGUAGE_LABELS } from '../i18n';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;
  const next = getNextLanguage(current);

  return (
    <button
      type="button"
      className="language-switcher"
      onClick={() => i18n.changeLanguage(next)}
      aria-label={`Switch language to ${LANGUAGE_LABELS[next]}`}
    >
      {LANGUAGE_LABELS[current] || current.toUpperCase()}
    </button>
  );
}
