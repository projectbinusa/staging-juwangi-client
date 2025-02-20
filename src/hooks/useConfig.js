import { useState } from 'react';

const useConfig = () => {
  const [container, setContainer] = useState(false);

  return { container, setContainer };
};

export default useConfig;
