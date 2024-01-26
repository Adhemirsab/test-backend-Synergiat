#!/bin/bash

COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
    echo "Error: Please specify a component name"
    exit 1
fi

mkdir -p "src/components/$COMPONENT_NAME"

COMP_PROP=$COMPONENT_NAME"Props"

# Create Comp.tsx
cat <<EOF >"src/components/$COMPONENT_NAME/$COMPONENT_NAME.tsx"
import type { FC } from 'react';

type $COMP_PROP = {};

export const $COMPONENT_NAME: FC<$COMP_PROP> = (props) => {
    return (
        <div>
            {/* Component content here */}
        </div>
    );
};

EOF

# Create Comp.test.tsx
# cat <<EOF >"src/components/$COMPONENT_NAME/$COMPONENT_NAME.test.tsx"
# import $COMPONENT_NAME from './$COMPONENT_NAME';

# describe('$COMPONENT_NAME', () => {
#     it('should render without crashing', () => {
#         render(<$COMPONENT_NAME />);
#     });
# });
# EOF

echo "Component $COMPONENT_NAME created successfully."