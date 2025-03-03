import React, { Suspense, ComponentType } from 'react';

const LazyLoad = <P extends object>(Component: ComponentType<P>) => (props: P) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
    </Suspense>
);

export default LazyLoad;
