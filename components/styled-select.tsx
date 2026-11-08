"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export type StyledOption = { value: string; label: string; disabled?: boolean };

export function StyledSelect({ value, options, onChange, ariaLabel, className = "", name, placeholder }: {
  value: string;
  options: StyledOption[];
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
  name?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  function focusOption(index: number) {
    requestAnimationFrame(() => root.current?.querySelectorAll<HTMLButtonElement>("[role=option]:not(:disabled)")[index]?.focus());
  }

  function openAt(index: number) {
    setOpen(true);
    focusOption(index);
  }

  function handleTriggerKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const selectedIndex = Math.max(options.findIndex((option) => option.value === value), 0);
      openAt(event.key === "ArrowUp" ? options.length - 1 : selectedIndex);
    }
  }

  function handleOptionKey(event: KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(root.current?.querySelectorAll<HTMLButtonElement>("[role=option]:not(:disabled)") || []);
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      items[(current + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      (event.key === "Home" ? items[0] : items.at(-1))?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      trigger.current?.focus();
    } else if (event.key === "Tab") setOpen(false);
  }

  return <div ref={root} className={`styled-select ${className}`}>
    {name && <input type="hidden" name={name} value={value} />}
    <button ref={trigger} id={`${id}-trigger`} type="button" className="styled-select-trigger" aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-listbox`} onClick={() => setOpen((current) => !current)} onKeyDown={handleTriggerKey}>
      <span>{selected?.label || placeholder || "Select an option"}</span><svg className="styled-select-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>
    </button>
    <div id={`${id}-listbox`} className="styled-select-menu" role="listbox" aria-labelledby={`${id}-trigger`} onKeyDown={handleOptionKey} hidden={!open}>
      {options.map((option) => <button key={option.value} type="button" role="option" aria-selected={value === option.value} disabled={option.disabled} className="styled-select-option" onClick={() => { onChange(option.value); setOpen(false); trigger.current?.focus(); }}>
        <span>{option.label}</span>{value === option.value && <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7"/></svg>}
      </button>)}
    </div>
  </div>;
}
