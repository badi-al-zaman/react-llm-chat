const RightSide = ({activeConv}) => {
  console.log(activeConv);
  
  return (
    <aside className="w-80 border-l border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b">
        <h4 className="text-md font-semibold">Reference Documents</h4>
        <div className="text-sm text-gray-500">
          Relevant to the active conversation
        </div>
      </div>
      <div className="overflow-auto p-4 flex-1">
        {activeConv?.docs?.length ? (
          <div className="space-y-3">
            {activeConv.docs.map((doc) => (
              <div
                key={doc.retrieved_doc_id}
                className="border rounded p-3 hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {doc.preview}
                    </div>
                  </div>
                  <div className="ml-3 text-xs text-indigo-600">
                    <a
                      href={doc.url}
                      onClick={(e) => e.preventDefault()}
                      className="underline"
                    >
                      Open
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            No reference documents found for this conversation.
          </div>
        )}
      </div>
      <div className="p-4 border-t text-sm text-gray-600">
        Tip: Attach documents to help the model respond with context.
      </div>
    </aside>
  );
};

export default RightSide;
