import {React, forwardRef, useId, useRef, useState} from "react";

export const Input = forwardRef(function Input({
    label,
    type = "text",
    setValue,
    className = "",
    readOnly = false,
    required = false,
    iconRequired = false,
    ...props
}, ref) {
    const id = useId();
    const [icon, setIcon] = useState("👁");
    const inputRef = useRef(null);
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <input
            id={id}
            type={type}
            onChange={(event) => setValue(event.target.value)}
            className={`my-2 w-full text-2xl p-2 rounded-md outline-none font-light shadow ${className}`}
            ref={inputRef}
            readOnly={readOnly}
            required={required}
            {...props} />
            {iconRequired && <button
            className="self-end hover:bg-black hover:bg-opacity-30 rounded-full p-2"
            onClick={(event) => {
                event.preventDefault();
                if (inputRef.current.type == "text") {
                    inputRef.current.type = "password";
                    setIcon("👁");
                }
                else {
                    inputRef.current.type = "text";
                    setIcon("❌")
                }
            }}
            >{icon}</button>}
        </>
    )
})