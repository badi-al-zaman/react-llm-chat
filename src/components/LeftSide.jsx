// Helper to format timestamps
function timeAgo(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

const LeftSide = ({ conversations, activeConvId, onCreate, onSelect }) => {
  return (
    <aside className="w-72 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <button
          onClick={onCreate}
          className="ml-2 px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          New
        </button>
      </div>
      <div className="overflow-auto flex-1">
        {conversations.map((conv, index) => (
          <div
            key={conv.session_id}
            onClick={() => onSelect(conv.session_id)}
            className={`cursor-pointer px-4 py-3 border-b border-gray-100 hover:bg-gray-50 flex items-start justify-between ${
              conv.session_id === activeConvId ? "bg-gray-100" : ""
            }`}
          >
            <div>
              <div className="font-medium text-sm">
                {conversations.length - index}) {conv.title}
              </div>
              {/* <div className="text-xs text-gray-500 mt-1">
                {conv.messages && conv.messages.length != 0
                  ? conv.messages[
                      conv.messages.length - 1
                    ]?.data.blocks[0].text.slice(0, 60)
                  : "No messages yet"}
              </div> */}
            </div>
            <div className="text-xs text-gray-400 ml-3">
              {timeAgo(conv.last_active_at)}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSide;
