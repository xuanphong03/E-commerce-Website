import { useState } from 'react';

const MessageItem = ({ messageItem, name, userImgUrl, onEdit, onDelete, onConfirmEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(messageItem.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmClick = () => {
    onConfirmEdit(messageItem.id, editContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <li
      key={messageItem.id}
      className={`flex items-start ${
        messageItem.senderId === name ? 'ml-auto flex-row-reverse' : 'mr-auto'
      } max-w-[80%] rounded-lg text-sm`}
    >
      <div className="flex flex-col items-start">
        <img
          src={
            messageItem.senderId === name
              ? userImgUrl || 'https://i.pinimg.com/564x/de/0a/47/de0a470a4617bb6272ad32dea7c497ce.jpg'
              : messageItem.senderImage || 'https://i.pinimg.com/564x/de/0a/47/de0a470a4617bb6272ad32dea7c497ce.jpg'
          }
          className="h-[60px] w-[60px] rounded-full"
          alt="Sender"
        />
      </div>
      {isEditing ? (
        <div className="flex flex-col">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={`${
              messageItem.senderId === name
                ? 'mt-15 mr-4 bg-stone-700 text-right text-white'
                : 'mt-15 ml-4 bg-gray-200 text-left'
            } mt-2 max-w-[85%] whitespace-pre-wrap rounded-lg px-2 py-2 text-base`}
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleConfirmClick}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Xác nhận
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      ) : isImageUrl(messageItem.content) ? (
        <img
          src={messageItem.content}
          className={`max-w-[42%] ${
            messageItem.senderId === name
              ? 'mt-15 mr-2 bg-stone-700 text-right text-white'
              : 'mt-15 ml-2 bg-gray-200 text-left'
          } mt-2 rounded-lg`}
          alt="Message content"
        />
      ) : (
        <p
          className={`${
            messageItem.senderId === name
              ? 'mt-15 mr-4 bg-stone-700 text-right text-white'
              : 'mt-15 ml-4 bg-gray-200 text-left'
          } mt-2 max-w-[85%] whitespace-pre-wrap rounded-lg px-2 py-2 text-base`}
        >
          {messageItem.content}
        </p>
      )}
      {messageItem.senderId === name && !isEditing && (
        <div className="absolute top-0 right-0 flex space-x-2">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Chỉnh sửa
          </button>
          <button
            onClick={() => onDelete(messageItem.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Xóa
          </button>
        </div>
      )}
    </li>
  );
};
