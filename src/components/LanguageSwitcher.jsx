import { useTranslation } from 'react-i18next';
import { LANGUAGES, LANGUAGE_LABELS } from '../i18n';
import FlagIcon from './FlagIcon';

// Три окремі прапорці зліва направо (DE, UA, RU) — клік на прапорець одразу
// перемикає на ту мову, активна підсвічена рамкою (без циклічного перемикання).
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;

  return (
    <div className="language-switcher" role="group" aria-label="Language">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`language-switcher__flag${lang === current ? ' is-active' : ''}`}
          onClick={() => i18n.changeLanguage(lang)}
          aria-pressed={lang === current}
          aria-label={LANGUAGE_LABELS[lang]}
          title={LANGUAGE_LABELS[lang]}
        >
          <FlagIcon lang={lang} />
        </button>
      ))}
    </div>
  );
}
