import  Axios  from "axios";
import React, { useState } from "react";
// import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // background-color:
    backgroundColor: "aquamarine",
    display: "table-cell",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)


function Modall(props) {
//   let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
const [createGroupForm, setCreateGroupForm] = useState({
  name: "",
  type: "FRONTEND",
  totalMember: 0
});
  function openModal() {
    setIsOpen(true);
  }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     subtitle.style.color = "#f00";
//   }

  function closeModal() {
    setIsOpen(false);
  }
  const sendDataForCreateGroup = () =>{
    props.newGroup();
    closeModal()
  }
const _handleOnChange =(e) =>{
setCreateGroupForm({
  ...createGroupForm,
  [e.target.name]: e.target.value
});
}
const createNewGroup = async () => {
    const token = localStorage.getItem("TOKEN")
  try {
    const result = await Axios.post(
      "http://localhost:8888/api/groups",
      {
        name: createGroupForm.name,
        type: createGroupForm.type,
        totalMember: createGroupForm.totalMember,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          ContentType: "application/json",
        },
      }
    );
    console.log(result);
    sendDataForCreateGroup();
    closeModal()
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div>
      <button onClick={openModal}>Add New Group</button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        Group Name
        <input name="name" onChange={_handleOnChange}></input>
        <br></br>
        Type
        <select name="type" onChange={_handleOnChange} defaultValue="FRONTEND">
          <option value={"FRONTEND"}>FRONTEND</option>
          <option value={"BACKEND"}>BACKEND</option>
          <option value={"FULLSTACK"}>FULLSTACK</option>
        </select>
        <br></br>
        Total Member
        <input name="totalMember" onChange={_handleOnChange}></input>
        <br></br>
        <button onClick={closeModal}>close</button>
        <button onClick={createNewGroup}>Create</button>
      </Modal>
    </div>
  );
}

export default Modall;
// ReactDOM.render(<Modall />, modallElement);
