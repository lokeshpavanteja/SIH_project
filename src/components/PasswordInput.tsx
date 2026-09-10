import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string | null;
  showCharCounter?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  onBlur?: () => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  value,
  onChange,
  label,
  placeholder = '••••••',
  required = true,
  error,
  showCharCounter = true,
  disabled = false,
  autoComplete = 'current-password',
  className = '',
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept up to 6 characters
    const val = e.target.value.slice(0, 6);
    onChange(val);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-xs font-semibold text-on-surface">
            {label} {required && <span className="text-error">*</span>}
          </label>
          {showCharCounter && (
            <span
              className={`text-[11px] font-medium transition-colors ${
                value.length === 6
                  ? 'text-success font-semibold flex items-center gap-0.5'
                  : value.length > 0
                  ? 'text-amber-600 dark:text-amber-400 font-medium'
                  : 'text-on-surface-variant'
              }`}
            >
              {value.length === 6 && (
                <span className="material-symbols-outlined text-[13px] text-success">check_circle</span>
              )}
              {value.length}/6 chars
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none flex items-center justify-center">
          <Lock className="w-4 h-4 text-on-surface-variant/80" />
        </div>

        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={6}
          autoComplete={autoComplete}
          className={`w-full pl-10 pr-11 py-2.5 bg-surface border rounded-xl text-sm text-on-surface font-medium placeholder:font-normal placeholder:text-on-surface-variant/50 focus:outline-none transition-all ${
            error
              ? 'border-error text-error focus:ring-2 focus:ring-error/20'
              : 'border-surface-variant text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-white'
          }`}
        />

        <button
          type="button"
          id={`btn-toggle-visibility-${id}`}
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 transition-colors focus:outline-none cursor-pointer"
          title={showPassword ? 'Hide password' : 'Show password'}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 text-white" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-[11px] text-error font-medium flex items-center gap-1 mt-1">
          <span className="material-symbols-outlined text-[14px]">error</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
