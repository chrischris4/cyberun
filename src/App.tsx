import { JsonForms } from '@jsonforms/react';
import { vanillaRenderers } from '@jsonforms/vanilla-renderers';
import { useState } from 'react';
import schema from './schema/schema.json';
import uischema from './schema/uischema.json';
import { ReadOnlyControlRenderer } from './components/ReadOnlyControl';
import { ReadOnlyGroupRenderer } from './components/ReadOnlyGroup';

const data = {
  user: {
    a08: "Jean Dupont",
    a09: "Fullstack dev with React, Node and Python"
  },
  item: {
    s01: ["vendor", "subcontractor"],
    p02: "yes",
    i01: [
      { country: "Afghanistan", percent: 60 },
      { country: "Algeria", percent: 40 }
    ]
  }
};

const customRenderers = [
  ...vanillaRenderers,
  ReadOnlyControlRenderer,
  ReadOnlyGroupRenderer
];

function App() {
  const [formData] = useState(data);

  return (
    <div className='bg-white text-gray-800 rounded-md'>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={formData}
        renderers={customRenderers}
      />
    </div>
  );
}

export default App;
