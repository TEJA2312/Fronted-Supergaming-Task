import React from 'react';

const InputComponent = React.forwardRef(({ label, type, defaultValue, placeholder, className, ...rest }, ref) => {
  return (
    <div className="flex flex-col">
      <label className="text-white text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={ref}
        className={`px-4 py-2 text-sm rounded-md outline-none bg-black text-white border ${className}`}
        {...rest}
      />
    </div>
  );
});

export default InputComponent;
