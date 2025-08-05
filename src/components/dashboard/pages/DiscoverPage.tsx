import React from 'react';
import { Discover } from '../discover';

export function DiscoverPage() {
  return (
    <div className="min-h-full w-full" style={{ backgroundColor: '#000000' }}>
      <div className="p-[15px] lg:p-[20px] xl:p-[25px]">
        <Discover />
      </div>
    </div>
  );
}