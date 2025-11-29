import { useState } from "react";

export default function CalculatedBlock() {

  // 最下層のブロックの時true
  const [flag, setflag] = useState(true);

  return (
    <>
      {flag ?
        <div>

        </div>
        :
        <div>
          <CalculatedBlock />

        </div>
      }
    </>
  )
}