import React, { createContext, useContext, useState } from "react";

interface RegisterContextType {
  isRegister: boolean;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <RegisterContext.Provider value={{ isRegister, setIsRegister }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};
