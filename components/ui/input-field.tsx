'use client';

import { cn } from '@/utils/cn';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

export interface InputFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    textAlign?: 'left' | 'right';
    isError?: string;
    isDisabled?: boolean;
    isMultiple?: boolean;
    label?: string;
    asterisk?: boolean;
    labelOnChangeCallback?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    showChangeField?: boolean;
    labelLinkText?: string;
    groupIcon?: React.ReactNode;
    inputClassName?: string;
    requiredMessage?: string | boolean;
    requiredMessageLabel?: string;
    whiteSpace?: boolean;
    onchangeCallback?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            textAlign = 'left',
            isError = '',
            isDisabled = false,
            isMultiple = false,
            type = 'text',
            label,
            asterisk = false,
            labelOnChangeCallback,
            showChangeField = false,
            labelLinkText = 'Change',
            className = '',
            groupIcon,
            id,
            inputClassName = '',
            placeholder,
            accept,
            value,
            onchangeCallback,
            onBlur,
            name,
            maxLength = 50,
            disabled = false,
            onPaste,
            requiredMessage = false,
            requiredMessageLabel = '',
            whiteSpace = true,
            onKeyDown,
            onChange,
            ...props
        },
        ref
    ) => {
        const [inputType, setInputType] = React.useState<string>(type || '');

        // Handle both onChange and onchangeCallback (for backward compatibility)
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onchangeCallback) {
                onchangeCallback(e);
            }
            if (onChange) {
                onChange(e);
            }
        };

        const togglePasswordVisibility = () => {
            setInputType(inputType === 'password' ? 'text' : 'password');
        };

        // Prevent mousewheel from changing number input values
        const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
            if (type === 'number') {
                e.currentTarget.blur();
            }
        };

        return (
            <div className={cn('relative w-full mb-4', className)}>
                {label && (
                    <div className="flex justify-between items-center mb-2">
                        <label
                            htmlFor={id}
                            className="block text-sm font-medium text-gray-700 capitalize"
                        >
                            {label}{' '}
                            {asterisk && (
                                <span className="text-red-500 ml-0.5">*</span>
                            )}
                        </label>
                        {labelOnChangeCallback && !showChangeField && (
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    labelOnChangeCallback(e);
                                }}
                                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                {labelLinkText}
                            </a>
                        )}
                    </div>
                )}

                <div className="relative">
                    {groupIcon && (
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            {groupIcon}
                        </div>
                    )}

                    <input
                        id={id}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                            'placeholder:text-muted-foreground',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            textAlign === 'right' ? 'text-right' : 'text-left',
                            isError
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : '',
                            groupIcon ? 'pl-10' : '',
                            type === 'password' ? 'pr-10' : '',
                            inputClassName
                        )}
                        placeholder={placeholder}
                        accept={accept}
                        type={inputType}
                        value={value}
                        onChange={handleChange}
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                        multiple={isMultiple}
                        maxLength={maxLength}
                        disabled={disabled || isDisabled}
                        onPaste={onPaste}
                        onKeyDown={onKeyDown}
                        onWheel={handleWheel}
                        {...props}
                    />

                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                            tabIndex={-1}
                        >
                            {inputType === 'password' || !value ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    )}
                </div>

                {requiredMessage && requiredMessageLabel ? (
                    <p className="mt-1 text-sm text-red-500">
                        {requiredMessageLabel}
                    </p>
                ) : whiteSpace ? (
                    <div className="h-5"></div>
                ) : null}
            </div>
        );
    }
);

InputField.displayName = 'InputField';

export { InputField };
