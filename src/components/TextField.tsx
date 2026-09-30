import { createSignal, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import '../assets/styles/TextField.scss';

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onInput: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  class?: string;
};

// Outlined text field with a floating label, adapted from MUI's TextField.
function TextField(props: TextFieldProps) {
  const [focused, setFocused] = createSignal(false);
  const helperId = () => `${props.id}-helper-text`;
  // The label floats above the field once the field is focused or has a value.
  const shrink = () => focused() || props.value !== '';

  const labelText = () => (
    <>
      {props.label}
      <Show when={props.required}>
        <span aria-hidden="true" class="text-field-asterisk">&thinsp;*</span>
      </Show>
    </>
  );

  return (
    <div
      class={`text-field ${props.class ?? ''}`}
      classList={{ shrink: shrink(), focused: focused(), error: props.error }}
    >
      <label class="text-field-label" for={props.id}>{labelText()}</label>
      <div class="text-field-root" classList={{ multiline: props.multiline }}>
        <Dynamic
          component={props.multiline ? 'textarea' : 'input'}
          id={props.id}
          class="text-field-input"
          type={props.multiline ? undefined : 'text'}
          rows={props.multiline ? props.rows : undefined}
          value={props.value}
          placeholder={props.placeholder}
          required={props.required}
          maxLength={props.maxLength}
          aria-invalid={props.error}
          aria-describedby={props.helperText ? helperId() : undefined}
          onInput={(e: InputEvent) => props.onInput((e.currentTarget as HTMLInputElement).value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <div aria-hidden="true" class="text-field-outline" />
      </div>
      <Show when={props.helperText}>
        <p id={helperId()} class="text-field-helper">{props.helperText}</p>
      </Show>
    </div>
  );
}

export default TextField;
