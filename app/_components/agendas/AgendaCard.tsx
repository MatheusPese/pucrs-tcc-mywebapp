import React, { ReactNode } from 'react';
import { Trash2 } from 'react-feather';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string; // Add className prop
}

const AgendaCard: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => {
    return (
      <button className={`${className} flex-1 w-full justify-center bg-[rgba(0,0,0,0.3)] text-left p-10`} onClick={onClick}>
        <div>{children}</div>
        <Trash2 color='white' size={24}></Trash2>


      </button>
    );
};

export default AgendaCard;
