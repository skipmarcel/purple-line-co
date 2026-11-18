import CheckCircle from './CheckCircle';
import k from './Kiosk.module.css';

export default function AgreementScene({ frame }) {
  return (
    <>
      <div className={k.terms}>
        {frame.terms.map((text, i) => (
          <div key={text} className={k.term}><b>0{i + 1}</b><div>{text}</div></div>
        ))}
      </div>
      <div className={`${k.agree} ${frame.agreed ? k.agreeOn : ''}`}>
        <CheckCircle on={frame.agreed} size={24} />
        <div>I have read and understand this document and voluntarily consent to the tattoo procedure.</div>
      </div>
    </>
  );
}
