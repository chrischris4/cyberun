import { GroupLayout, LayoutProps, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { memo } from 'react';
import { JsonFormsDispatch } from '@jsonforms/react';

const ReadOnlyGroup = memo(({ uischema, schema, path, renderers }: LayoutProps) => {
  const group = uischema as GroupLayout;

  return (
    <div className="mb-6 p-4 pb-0 border border-gray-300 rounded-lg">
      {group.label && (
        <h2 className="text-xl font-bold text-gray-950 mb-4">{group.label}</h2>
      )}

      {group.elements.map((element, idx) => (
        <JsonFormsDispatch
          key={idx}
          uischema={element}
          schema={schema}
          path={path}
          renderers={renderers}
        />
      ))}
    </div>
  );
});

export const ReadOnlyGroupRenderer = {
  tester: rankWith(100, uiTypeIs('Group')),
  renderer: withJsonFormsLayoutProps(ReadOnlyGroup),
};
