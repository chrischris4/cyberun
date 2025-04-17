import { ControlProps, rankWith, isControl } from '@jsonforms/core'; 
import { withJsonFormsControlProps } from '@jsonforms/react';
import { memo } from 'react';

const ReadOnlyControl = memo(({ data, label, description, schema, path }: ControlProps) => {
  console.log('Schema:', schema);

  const fullWidthFields = ['user.a08', 'user.a09'];
  const isFullWidth = fullWidthFields.includes(path);
  console.log(path)

  return (
    <div className={`w-full flex mb-4 bg-gray-100 rounded-md p-2 ${isFullWidth ? 'flex-col' : 'gap-4'}`}>
      <div className={`${isFullWidth ? 'w-full' : 'w-1/2'}`}>
        <strong>{schema?.title || label} :</strong>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      <div className={`${isFullWidth ? 'w-full mt-2' : 'w-1/2'}`}>
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.country ? (
                <>
                  <span className="font-bold border rounded-lg p-2 my-2 bg-white" style={{
    background: `linear-gradient(to right, #dbeafe ${item.percent}%, white ${item.percent}%)`,
  }}>{item.country}</span>
                  <span className="text-gray-600">{item.percent}%</span>
                </>
              ) : (
                <span className="font-bold border rounded-lg p-2 my-2 bg-white">{String(item)}</span>
              )}
            </div>
          ))
        ) : (
          <span>{String(data)}</span>
        )}
      </div>
    </div>
  );
});

export const ReadOnlyControlRenderer = {
  tester: rankWith(100, isControl),
  renderer: withJsonFormsControlProps(ReadOnlyControl)
};
