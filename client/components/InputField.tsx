"use client";

import { forwardRef, useState } from "react";
import Text from "./Text";
import { Eye, EyeClosed, Loader2 } from "lucide-react";

export interface InputFieldProps {
  id: string;
  label?: string;
  errorText?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showError?: boolean;
  min?: string;
  max?: string;
  step?: string;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  prefixIcon?: React.ReactNode;
  isDisabled?: boolean;
  isPassword?: boolean;
  hasPrefix?: boolean;
  hasMt?: boolean;
  maxLength?: number;
  hasCounter?: boolean;
  isPhoneInput?: boolean;
  showProcessingIcon?: boolean;
  countryCode?: string;
  background?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      errorText,
      type = "text",
      value,
      onChange,
      placeholder,
      showError,
      min,
      max,
      step,
      onKeyUp,
      onKeyDown,
      onFocus,
      onBlur,
      prefixIcon,
      isDisabled = false,
      isPassword = false,
      hasPrefix = false,
      hasMt = true,
      maxLength,
      hasCounter = false,
      isPhoneInput = false,
      showProcessingIcon = false,
      countryCode,
      background = "bg-light-card dark:bg-dark-card",
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={hasMt ? "mt-6" : ""}>
        {label && (
          <label
            htmlFor={id}
            className="block leading-6 text-[#545454] dark:text-[#CBD5E1]"
          >
            {label}
          </label>
        )}

        <div className="mt-3 relative flex items-center space-x-3">
          {isPhoneInput && (
            <div className={`px-6 py-4 ${background} rounded-full`}>
              <Text text={countryCode} />
            </div>
          )}

          <input
            id={id}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={ref}
            maxLength={maxLength}
            required
            disabled={isDisabled}
            min={["date", "time"].includes(type) ? min : undefined}
            max={["date", "time"].includes(type) ? max : undefined}
            step={type === "time" ? step : undefined}
            className={`relative p-4 ${
              hasPrefix ? "pl-11" : ""
            } rounded-full w-full text-[14px] md:text-[15px] lg:text-[16px] text-[#545454] dark:text-[#CBD5E1] ${background} drop-shadow-xs transition-all duration-200 ease-in-out focus:drop-shadow-sm focus:border-primary-300 dark:focus:border-primary-50 placeholder:text-slate-300 dark:placeholder:text-slate-600 ${
              showError ? "border border-error dark:border-error-300" : ""
            } ${isDisabled ? "bg-light-bg dark:bg-dark-bg" : ""}`}
          />

          {hasPrefix && <span className="absolute left-4">{prefixIcon}</span>}

          {!showProcessingIcon && isPassword && (
            <span
              className="absolute right-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <Eye className="text-2xl" />
              ) : (
                <EyeClosed className="text-2xl" />
              )}
            </span>
          )}

          {showProcessingIcon && (
            <span className="absolute right-4">
              <Loader2 className="animate-spin-fast text-primary dark:text-primary-300 text-2xl" />
            </span>
          )}
        </div>

        {hasCounter && value && (
          <div className="mt-3">
            <p className="text-[12px] text-[#545454] dark:text-[#CBD5E1]">
              {value.length} / {maxLength} characters
            </p>
          </div>
        )}

        {showError && (
          <div className="text-error dark:text-error-300 mt-2 text-[12px]">
            {errorText}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
