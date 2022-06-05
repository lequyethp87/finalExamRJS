import Axios from "axios";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Modall from "../../Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Link } from "react-router-dom";
const MainContentGroup = () => {
  const baseUrl = "http://localhost:8888/api/groups/paging?pageNumber=";
  const [listData, setListData] = useState({
    listGroup: [],
    pages: {
      page: 1,
      totalPage: 0,
      elements: 0,
      numberElement: 0,
    },
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [searchForAPI, setSearchForAPI] = useState("");
  const [sortForAPI, setSortForAPI] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fillterType, setFillterType] = useState("");
  const [fillterMinDay, setFillterMinDay] = useState("");
  const [fillterMaxDay, setFillterMaxDay] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fillGroupForUpdateGroup, setFillGroupForUpdateGroup] = useState({});
  // const [url, setUrl] = useState(baseUrl);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const openModal = (id) => {
    setIsOpen(true);
    listData.listGroup.forEach((element) => {
      element.id === id && setFillGroupForUpdateGroup(element);
    });
  };
  // console.log("fill group");
  // console.log(fillGroup);
  function closeModal() {
    setIsOpen(false);
  }
  const _handleOnChange = (e) => {
    setFillGroupForUpdateGroup({
      ...fillGroupForUpdateGroup,
      [e.target.name]: e.target.value,
    });
  };
  const editGroup = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const result = await Axios.put(
        "http://localhost:8888/api/groups?id=" + fillGroupForUpdateGroup.id,
        fillGroupForUpdateGroup,
        {
          headers: {
            Authorization: "Bearer " + token,
            ContentType: "application/json",
          },
        }
      );
      console.log("result");
      console.log(result);
      getDataGroup();
    } catch (error) {}
    closeModal();
  };

  const deleteGroup = async (id) => {
    try {
      const token = localStorage.getItem("TOKEN");
      const result = await Axios.delete(
        "http://localhost:8888/api/groups/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
            ContentType: "application/json",
          },
        }
      );
      console.log(result);
      getDataGroup();
    } catch (error) {
      console.log(error);
    }
  };
  const contentTbody = listData.listGroup.map((value, index) => {
    return (
      <tr key={index}>
        <td>{value.name}</td>
        <td>{value.totalMember}</td>
        <td>{value.type}</td>
        <td>{value.createdAt}</td>
        <td>
          <i
            className="fa fa-pencil-square-o"
            aria-hidden="true"
            onClick={() => openModal(value.id)}
          ></i>{" "}
          <i
            className="fa fa-trash"
            aria-hidden="true"
            onClick={() => deleteGroup(value.id)}
          ></i>
        </td>
      </tr>
    );
  });
  const onChangeFillter = (e) => {
    setFillterType(e.target.value);
  };

  const getDataGroup = async () => {
    const token = localStorage.getItem("TOKEN");

    try {
      const result = await Axios.get(
        baseUrl +
          pageNumber +
          searchForAPI +
          fillterType +
          fillterMinDay +
          fillterMaxDay +
          "&sort=" +
          sortForAPI,
        {
          headers: {
            Authorization: "Bearer " + token,
            ContentType: "application/json",
          },
        }
      );

      console.log("Rerender getdata.....");
      setListData({
        ...listData,
        listGroup: result.data.content,
        pages: {
          page: result.data.number + 1,
          totalPage: result.data.totalPages,
          elements: result.data.totalElements,
          numberElement: result.data.numberOfElements,
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    getDataGroup();
    // getDataGroup();
  }, [fillterType, fillterMinDay, fillterMaxDay, searchForAPI, sortForAPI]);

  console.log("gia tri fill ter rerender");

  // console.log(listData.fillter.type);

  const receiveDataForCreateGroup = () => {
    getDataGroup();
  };
  const handleStartDateChange = (date) => {
    if (date === null) {
      setStartDate(null);
      console.log("set minday");
      setFillterMinDay("");
    } else {
      let dateTiemConvert =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      setStartDate(date);
      setFillterMinDay("&startDate=" + dateTiemConvert);
    }
  };

  const handleEndDateChange = (date) => {
    if (date === null) {
      setEndDate(null);
      setFillterMaxDay("");
    } else {
      let dateTiemConvert =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      setEndDate(date);
      setFillterMaxDay("&endDate=" + dateTiemConvert);
    }
  };
  const sendSearch = (e) => {
    setListData({
      ...listData,
      search: e.target.value,
    });
    if (e.target.value !== null && e.target.value.match(/^ *$/) === null) {
      // if (fillterType !== "" || fillterMinDay !== "" || fillterMaxDay !== ""){
      setSearchForAPI("&search=" + e.target.value);
      // }else setSearchForAPI("search=" + e.target.value);
    }

    // if ( e.target.value.match(/^ *$/) === null) {
    //   // setSearchForAPI("&search=" + e.target.value);
    //   console.log("toan dau cach ");
    // }
  };

  const sendSort = (e) => {
    console.log(sortForAPI.split("=")[sortForAPI.split("=").length - 1]);
    if (e === sortForAPI.split(",")[0]) {
      console.log(sortForAPI.split(",")[sortForAPI.split(",").length - 1]);
      if ("asc" === sortForAPI.split(",")[sortForAPI.split(",").length - 1]) {
        console.log("trung asc");
        setSortForAPI(sortForAPI.split(",")[0] + ",desc");
      } else setSortForAPI(sortForAPI.split(",")[0] + ",asc");
    } else setSortForAPI(e + ",asc");
  };
  const checkFunction = () => {
    setPageNumber((pageNumber) => {
      return pageNumber + 1;
    });
  };
  const nextPage = () => {
    if (pageNumber < listData.pages.totalPage) {
      // console.log("before");
      // console.log(pageNumber);
      checkFunction();
      console.log("Gia tri pageNumber");
      console.log(pageNumber);
      // getDataGroup();
    }
  };
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  // console.log(pa);
  return (
    <div className="homeMainContent">
      <ReactModal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        Group Name
        <input
          name="name"
          value={fillGroupForUpdateGroup.name}
          onChange={_handleOnChange}
        ></input>
        <br></br>
        Type
        <select
          name="type"
          onChange={_handleOnChange}
          defaultValue={fillGroupForUpdateGroup.type}
        >
          <option value={"FRONTEND"}>FRONTEND</option>
          <option value={"BACKEND"}>BACKEND</option>
          <option value={"FULLSTACK"}>FULLSTACK</option>
        </select>
        <br></br>
        Total Member
        <input
          name="totalMember"
          value={fillGroupForUpdateGroup.totalMember}
          onChange={_handleOnChange}
        ></input>
        <br></br>
        <button onClick={closeModal}>close</button>
        <button onClick={editGroup}>Save</button>
      </ReactModal>
      <div>
        <ul>
          <li>
            <input
              value={listData.search}
              onChange={sendSearch}
              placeholder="Search"
            ></input>
          </li>
          <li>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              name="startDate"
              dateFormat="dd/MM/yyyy"
              placeholderText="Start Date"
            />
          </li>

          <li>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              name="endDate"
              dateFormat="dd/MM/yyyy"
              placeholderText="End Date"
            />
          </li>
          <li>
            <Modall newGroup={receiveDataForCreateGroup} />
          </li>
          <li>Delete many Group</li>
        </ul>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => sendSort("name")}>
              Group Name{" "}
              <span>
                <i
                  className="fa fa-sort-asc"
                  aria-hidden="true"
                  style={{
                    visibility:
                      "asc" ===
                      sortForAPI.split(",")[sortForAPI.split(",").length - 1]
                        ? "visible"
                        : "hidden",
                  }}
                ></i>
                <i
                  className="fa fa-sort-desc"
                  aria-hidden="true"
                  style={{
                    visibility:
                      "desc" ===
                      sortForAPI.split(",")[sortForAPI.split(",").length - 1]
                        ? "visible"
                        : "hidden",
                  }}
                ></i>
              </span>
            </th>
            <th onClick={() => sendSort("totalMember")}>Total member</th>
            <th>
              <select onChange={onChangeFillter} defaultValue={""}>
                <option value={""}>Type</option>
                <option value={"&type=BACKEND"}>BACKEND</option>
                <option value={"&type=FRONTEND"}>FRONTEND</option>
                <option value={"&type=FULLSTACK"}>FULLSTACK</option>
              </select>
            </th>
            <th onClick={() => sendSort("createdAt")}>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{contentTbody}</tbody>
      </table>
      <p>
        <span>
          Number records {listData.pages.numberElement} of Total records :
          {listData.pages.elements}
        </span>
        <span onClick={nextPage}>Next</span>
        <span>List page</span> <span onClick={prevPage}>Prev</span>
        <span>Total pages: {listData.pages.totalPage}</span>
      </p>
      <h1>page Number : {pageNumber}</h1>
    </div>
  );
};

export default MainContentGroup;
