// components/Button.tsx
import { format, isToday, isTomorrow } from "date-fns";
import React, { ReactNode } from "react";

interface Props {
  onClick: () => void;
}

const NewAppointmentCard: React.FC<Props> = ({onClick}) => {
  return (
    <button onClick={onClick} className="btn bg-[rgb(62,152,255)] hover:bg-[rgb(112,172,230)] flex flex-col justify-center items-center w-[6rem] h-[6rem] rounded-3xl shadow-xl p-2 overflow-hidden">
      <span className={`text-4xl font-extrabold  text-white`}>
        +
      </span>
    </button>
  );
};

export { NewAppointmentCard}
export default NewAppointmentCard;
