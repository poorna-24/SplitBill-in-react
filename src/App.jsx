import React from "react";
import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Chandu",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Bhavya",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "CS",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const Button = ({ onclick, children }) => {
  return (
    <button onClick={onclick} className="button">
      {children}
    </button>
  );
};
const App = () => {
  const [formData, setFormData] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriend = () => {
    setShowAddFriend((show) => !show);
  };

  const handleFormData = (data) => {
    setFormData((formDatas) => [...formDatas, data]);
    setShowAddFriend(false);
  };

  const handleSelected = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    // console.log(friend);
    setShowAddFriend(false);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList formData={formData} onSelection={handleSelected} selectedFriend={selectedFriend} />

        {showAddFriend && <FormFriend handleFormData={handleFormData} />}

        <Button onclick={handleAddFriend}>{showAddFriend ? "Close" : "Add friend"}</Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
};

export default App;

const FormFriend = ({ handleFormData }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleForm = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newvalues = { id, name, image: `${image}?=${id}`, balance: 0 };
    handleFormData(newvalues);
    setName("");
    setImage("https://i.pravatar.cc/48");

    console.log(newvalues);
  };

  return (
    <form onSubmit={handleForm} className="form-add-friend">
      <label>Friend name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Image URL :</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      <Button>Add</Button>
    </form>
  );
};

const FriendsList = ({ formData, onSelection, selectedFriend }) => {
  const friends = formData;
  return (
    <ul>
      {friends.map((list) => (
        <List list={list} key={list.id} onSelection={onSelection} selectedFriend={selectedFriend} />
      ))}
    </ul>
  );
};
const List = ({ list, onSelection, selectedFriend }) => {
  const isSelected = selectedFriend?.id === list.id;
  // console.log(selectedFriend.id);
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={list.image} alt={list.name} />
      <h3>{list.name}</h3>
      {list.balance < 0 && (
        <p className="red">
          you owe {list.name} {Math.abs(list.balance)} Rs
        </p>
      )}
      {list.balance > 0 && (
        <p className="green">
          {list.name} owes you {Math.abs(list.balance)} Rs
        </p>
      )}
      {list.balance === 0 && <p>You and {list.name} are even</p>}
      {/* <Button onclick={() => handleSelected(list)}>Select</Button> */}
      <Button onclick={() => onSelection(list)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
};

const FormSplitBill = ({ selectedFriend }) => {
  console.log(selectedFriend);
  return (
    <form className="form-split-bill">
      <h2>Split bill {selectedFriend.name}</h2>
      <label>💰 Bill value:</label>
      <input type="text" />
      <label>🧑 Your expense</label>
      <input type="text" />
      <label>💰 {selectedFriend.name}'s expense</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
};
