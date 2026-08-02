import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="header-icon-button theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.toggleToLight') : t('theme.toggleToDark')}
      title={isDark ? t('theme.toggleToLight') : t('theme.toggleToDark')}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
