import { useTranslation } from 'react-i18next';
import { getNextLanguage, LANGUAGE_LABELS } from '../i18n';
import FlagIcon from './FlagIcon';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;
  const next = getNextLanguage(current);

  return (
    <button
      type="button"
      className="header-icon-button language-switcher"
      onClick={() => i18n.changeLanguage(next)}
      aria-label={`${LANGUAGE_LABELS[current] || current.toUpperCase()} — switch language to ${LANGUAGE_LABELS[next]}`}
      title={LANGUAGE_LABELS[current] || current.toUpperCase()}
    >
      <FlagIcon lang={current} />
    </button>
  );
}
