import React, { useState, useEffect, useRef } from "react";

function MaterialAssignment(props) {
  const [data, setData] = useState([]);

  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [newItem, setNewItem] = useState({
    name: "",
    level: "",
    unit: "",
    quantity: "",
  });

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (editing && currentItem.id === data.length) {
      nameInputRef.current.focus();
    }
  }, [editing, currentItem.id, data.length]);

  const handleEdit = (item) => {
    setEditing(true);
    setCurrentItem(item);
  };

  const handleUpdate = (id, updatedItem) => {
    setEditing(false);
    setData(data.map((item) => (item.id === id ? updatedItem : item)));
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const item = { ...newItem, id: newId };
    setData([...data, item]);
    setNewItem({ name: "", level: "", unit: "", quantity: "" });
    handleEdit(item);
  };
  const logData = () => {
    console.log(data);
  };
  return (
    <>
      <div className="my-16">
        <h2 className="font-bold text-xl text-mainColor border-b-2 my-2">
          NHỮNG DỤNG CỤ CẦN THIẾT MANG THEO TOUR
        </h2>
        <div className="overflow-x-auto my-10 rounded-md shadow-md">
          <table className="w-full table-fixed">
            <thead className="bg-mainColor text-white h-14">
              <tr>
                <th className="w-1/12"></th>
                <th className="w-3/12 text-center">Tên dụng cụ</th>
                <th className="w-2/12 text-center">Mức độ cần thiết</th>
                <th className="w-2/12 text-center">Đơn vị</th>
                <th className="w-2/12 text-center">Số lượng</th>
                <th className="w-2/12 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="text-center">
                    {editing && currentItem.id === item.id ? (
                      <input
                        className="w-full"
                        value={currentItem.name}
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            name: e.target.value,
                          })
                        }
                        ref={
                          editing && currentItem.id === data.length
                            ? nameInputRef
                            : null
                        }
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="text-center">
                    {editing && currentItem.id === item.id ? (
                      <input
                        className="w-full"
                        value={currentItem.level}
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            level: e.target.value,
                          })
                        }
                      />
                    ) : (
                      item.level
                    )}
                  </td>
                  <td className="text-center">
                    {editing && currentItem.id === item.id ? (
                      <input
                        className="w-full"
                        value={currentItem.unit}
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            unit: e.target.value,
                          })
                        }
                      />
                    ) : (
                      item.unit
                    )}
                  </td>
                  <td className="text-center">
                    {editing && currentItem.id === item.id ? (
                      <input
                        className="w-full"
                        value={currentItem.quantity}
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            quantity: e.target.value,
                          })
                        }
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td className="flex items-center justify-center">
                    {editing && currentItem.id === item.id ? (
                      <>
                        <button
                          className="mx-2"
                          onClick={() => handleUpdate(item.id, currentItem)}
                        >
                          <i className="fa-solid fa-check text-green-500"></i>
                        </button>
                        <button
                          className="mx-2"
                          onClick={() => setEditing(false)}
                        >
                          <i className="fa-solid fa-xmark text-red-600"></i>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <button
                            className="mx-2"
                            onClick={() => handleEdit(item)}
                          >
                            <i className="fa-solid fa-pen-to-square text-blue-800"></i>
                          </button>
                          <button
                            className="mx-2"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="fa-solid fa-trash text-red-500"></i>
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td>
                  <input
                    className="w-full"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    className="w-full"
                    value={newItem.level}
                    onChange={(e) =>
                      setNewItem({ ...newItem, level: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    className="w-full"
                    value={newItem.unit}
                    onChange={(e) =>
                      setNewItem({ ...newItem, unit: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    className="w-full"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({ ...newItem, quantity: e.target.value })
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <td>
            <button className="btn bg-mainColor text-white" onClick={handleAdd}>
              <i className="fa-solid fa-plus"></i>
              Thêm dòng
            </button>
          </td>
        </div>
        <button onClick={logData} className="btn">
          Log dữ liệu
        </button>
      </div>
    </>
  );
}

export default MaterialAssignment;
