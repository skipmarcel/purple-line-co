import k from './Kiosk.module.css';

export default function DetailsScene({ frame }) {
  return (
    <div className={k.grid2}>
      {frame.fields.map((field) => (
        <div key={field.label} className={k.field}>
          <div className={k.fieldLabel}>{field.label}</div>
          <div className={`${k.fieldBox} ${field.active ? k.fieldBoxActive : ''}`}>
            {field.value}
            {field.active && frame.caretOn && <span className={k.caret} />}
          </div>
        </div>
      ))}
    </div>
  );
}
