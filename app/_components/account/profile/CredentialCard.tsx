import React from 'react';

interface InfoCardProps {
  titulo: string;
  valor: string;
  onClickEdit: () => void;
}

const CredentialCard: React.FC<InfoCardProps> = ({ titulo, valor, onClickEdit }) => {
  return (
    <div className="flex justify-between w-full p-4">
      <div className="flex-row items-center">
        <div className="font-bold text-xs">{titulo}</div>
        <div>{valor}</div>
      </div>
      {/* TODO: add a way to edit user credentials */}
    </div>
  );
};

export default CredentialCard;
