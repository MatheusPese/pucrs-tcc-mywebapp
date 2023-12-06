'use client'
import { useState } from 'react';


export default function Home() {
  const [menuVisible, setMenuVisible] = useState(false);

  const MenuClick = () => {
    setMenuVisible(!menuVisible);
  };

  const Top = (
    <div className='mx-auto text-2xl'>Negócios</div>
  );

  const Middle = (
    menuVisible && (
      <FloatingMenu />
    )
  );

  const Bottom = (
    <div className='mx-auto flex w-full justify-between'>
      <Button className='flex-2 m-2' onClick={MenuClick}>
        Menu
      </Button>
    </div>
  );

  return (
    <PageTemplate>
      {{
        Top: Top,
        Middle: Middle,
        Bottom: Bottom,
      }}
    </PageTemplate>
  );
}