import React, { ChangeEvent, CSSProperties } from 'react';

interface ReasonOptionProps {
  value: string;
  label: string;
  imageUrl: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  style?: CSSProperties; // Agregamos la propiedad style aquí
}

const ReasonOption: React.FC<ReasonOptionProps> = ({ value, label, imageUrl, name, onChange, checked, style }) => {
  return (
    <div className="form-check" style={style}> {/* Aplicamos el estilo al div contenedor */}
      <input
        className="form-check-input"
        type="radio"
        name={name}
        value={value}
        id={value}
        onChange={onChange}
        checked={checked}
      />
      <label className="form-check-label" htmlFor={value}>
        <img src={imageUrl} alt={label} className="img-fluid" width="50" /><br />{label}
      </label>
    </div>
  );
};

export default ReasonOption;