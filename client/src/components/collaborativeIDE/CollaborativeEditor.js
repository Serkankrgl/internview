import React from 'react';
import { useSelector } from 'react-redux';
import IDE from 'components/shared/IDE';

export default function CollaborativeEditor() {
   const { IDEroomId, IDEidentity } = useSelector((state) => state.IdeStore);
   return (
      <div>
         {IDEroomId}
         <div>{IDEidentity}</div>
         <IDE />
      </div>
   );
}
