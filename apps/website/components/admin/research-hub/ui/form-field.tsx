"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  description?: string;
  className?: string;
}

// Text Input Field
export function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  className,
  ...props
}: FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(required && "text-red-600")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <Input
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={cn(error && "border-red-500 focus:border-red-500")}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}

// Textarea Field
export function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  rows = 4,
  className,
  ...props
}: FormFieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(required && "text-red-600")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={cn(error && "border-red-500 focus:border-red-500")}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}

// Select Field
export function SelectField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  options = [],
  className,
}: FormFieldProps & {
  options?: Array<{ value: string; label: string }>;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(required && "text-red-600")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <Select value={value} onValueChange={onChange} disabled={disabled} required={required}>
        <SelectTrigger className={cn(error && "border-red-500 focus:border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}

// Multi-Select Field
export function MultiSelectField({
  label,
  name,
  value = [],
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  options = [],
  className,
}: FormFieldProps & {
  options?: Array<{ value: string; label: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v: string) => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newValue);
  };

  const handleRemove = (optionValue: string) => {
    const newValue = value.filter((v: string) => v !== optionValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(required && "text-red-600")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <div className="relative">
        <div
          className={cn(
            "min-h-10 p-2 border rounded-md cursor-pointer",
            error && "border-red-500 focus:border-red-500",
            "flex flex-wrap gap-2 items-center"
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {value.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            value.map((val: string) => {
              const option = options.find(opt => opt.value === val);
              return (
                <Badge
                  key={val}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {option?.label || val}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(val);
                    }}
                  />
                </Badge>
              );
            })
          )}
        </div>
        
        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="p-2 border-b">
              <Input
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus:ring-0"
              />
            </div>
            <div className="p-2">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleToggle(option.value)}
                >
                  <Checkbox
                    checked={value.includes(option.value)}
                    className="mr-2"
                  />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}

// Checkbox Field
export function CheckboxField({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={name}
          checked={value}
          onCheckedChange={onChange}
          disabled={disabled}
          required={required}
        />
        <Label htmlFor={name} className={cn(required && "text-red-600")}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 ml-6">{description}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-600 ml-6">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-sm text-gray-500 ml-6">{hint}</p>
      )}
    </div>
  );
}

// Radio Group Field
export function RadioGroupField({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  options = [],
  className,
}: FormFieldProps & {
  options?: Array<{ value: string; label: string }>;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(required && "text-red-600")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <div className={cn("space-y-2", error && "border-red-500", className)}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              id={`${name}-${option.value}`}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              disabled={disabled}
              className="text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}

// Number Field
export function NumberField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  min,
  max,
  step,
  className,
  ...props
}: FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(required && "text-red-600")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <Input
        id={name}
        name={name}
        type="number"
        value={value}
        onChange={(e) => onChange?.(e.target.value ? Number(e.target.value) : undefined)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={cn(error && "border-red-500 focus:border-red-500")}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}

// Date Field
export function DateField({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  className,
  ...props
}: FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(required && "text-red-600")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <Input
        id={name}
        name={name}
        type="date"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        disabled={disabled}
        className={cn(error && "border-red-500 focus:border-red-500")}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}

// URL Field
export function UrlField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  className,
  ...props
}: FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(required && "text-red-600")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <Input
        id={name}
        name={name}
        type="url"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || "https://example.com"}
        required={required}
        disabled={disabled}
        className={cn(
          error && "border-red-500 focus:border-red-500",
          value && !validateUrl(value) && "border-orange-500 focus:border-orange-500"
        )}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {value && !validateUrl(value) && !error && (
        <p className="text-sm text-orange-600">Please enter a valid URL</p>
      )}
      
      {hint && !error && !value && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}

// Email Field
export function EmailField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  hint,
  description,
  className,
  ...props
}: FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(required && "text-red-600")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <Input
        id={name}
        name={name}
        type="email"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || "email@example.com"}
        required={required}
        disabled={disabled}
        className={cn(error && "border-red-500 focus:border-red-500")}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}
